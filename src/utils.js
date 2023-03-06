const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Validación de ruta: Check if the file exists in the current directory and is readeble. Devuelve true or false
const isValidPath = (myPath) => (fs.existsSync(myPath));

// validación de option. Devuelve true or false
const isValidOption = (option) => (typeof option === 'object' && (option.validate === true || option.validate === false));

// validación de path absoluta o relativa. Devuelve true or false
const isAbsolutePath = (myPath) => path.isAbsolute(myPath);

// resolver ruta relativa a absoluta
const currentWorkingDir = process.cwd();
const resolvePath = (myCurrentWorkingDir, relativePath) => path.resolve(myCurrentWorkingDir, relativePath);

//-------------Bloque de funciones para lectura recursiva de directorio----------
// validacion de directorio
const isDir = (myPath) => fs.statSync(myPath).isDirectory();

// validacion de archivo md
const isMdFile = (file) => path.extname(file) === ".md"; //retorna boolean

// lectura de directorio 
const readDir = (myPath) => {
    const files = fs.readdirSync(myPath);
    const filesPaths = files.map(file => path.join(myPath, file));
    return filesPaths
};
/* const subDirsAndFiles = readDir('./files-to-read');
console.log(subDirsAndFiles) */

// extraer archivos md
const getMdFiles = (arr) => arr.filter((file) => isMdFile(file));

// extraer subdirectorios
const getSubDirs = (arr) => arr.filter((file) => isDir(file)); // .statSync, devuelve objeto de estadisticas del archivo, .isDirectory es un metodo dentro del objeto que devuelve un booleano. Si da true, se agraga a subDirs, else se omite.

//------------------------------------------------------------------

// lectura recursiva: revisa directorio y retorna array con archivos md, 
const readDirRecursive = (myPath) => { //entra ruta 
    // caso base: la ruta corresponde a un archivo
    if (!isDir(myPath) && !isMdFile(myPath)) {
        return false; // lanzar una excepción
    }
    if (!isDir(myPath) && isMdFile(myPath)) {
        return [myPath]
    } else {
        const files = readDir(myPath); // se guardan archivos y subdirs en const files 
        let mdFiles = getMdFiles(files) // se guardan archivos md en variable mdFiles
        const subDirs = getSubDirs(files, myPath);
        subDirs.forEach((subdir) => { // la fn se llama a si misma para leer subdirs
            const subFiles = readDirRecursive(subdir); // se guardan los archivos en subFiles
            mdFiles = [...mdFiles, ...subFiles]; // se agregan a let mdFiles, concatenando ambos arrays (operador spread '...')
        });
        return mdFiles; //devuelve array de archivos md (rutas)
    }
};

// leyendo archivo md. Retorna objeto con path y data
const readMdFile = file => {
    return new Promise((res, rej) => {
        fs.readFile(file, 'utf-8', (error, data) => {
            if (error) {
                rej(error)
            } else {
                const fileDataObj = {
                    file,
                    data
                }
                res(fileDataObj)
            }
        })
    })
};

// obteninedo links de data. Retorna objeto con path y links
const getUrlLinks = (dataObj) => {
    const data = dataObj.data;
    let urls = [];
    const urlRegEx = /\[([^\[\]]*?)\]\((https?:\/\/[^\s$.?#].[^\s]*)\)/gi;
    const matches = data.match(urlRegEx);
    const urlsObj = {
        file: dataObj.file,
        links: urls
    };
    if (matches) {
        urls.push(...matches)
    } else {
        urls.push('No links found')
    };
    return urlsObj
};

// analizar links y retornar objeto (para { validate : false })
const analiseUrls = (linksObj) => {
    //entra un objeto con un path de archivo y un array de links
    const links = linksObj.links;
    const file = linksObj.file;
    if (links.length === 1 && links[0] === 'No links found') {
        return linksObj;
    } else {
        //array con objetos de links analizados (1 link = 1 linkObject)
        const analisedLinks = links.map((link) => {
            const hrefRegEx = /\https?:([^)]+)\)/gi;
            const textRegEx = /\[([^\[\]]*?)\]/gi;
            const hrefMatch = link.match(hrefRegEx);
            const href = hrefMatch ? hrefMatch.toString().replace(/\(|\)/g, '') : null;
            const textMatch = link.match(textRegEx)
            const text = textMatch ? textMatch.toString().replace(/[\[\]]/g, '') : null;
            const linkObject = {
                href,
                text,
                file
            };
            return linkObject
        })
        return analisedLinks
    };
};

// tomar links analizados y validar (para { validate : true })
const validateUrl = (link) => axios.get(link);

// tomar links analizados y validar (para { validate : true })
const getStatus = (parsedLinksArr) => {
    const validatedLinks = parsedLinksArr.map((parsedLink) => {
        if (!parsedLink.href) {
            return parsedLink
        } else {
            const href = parsedLink.href;
            const linkObj = parsedLink;
            return validateUrl(href)
                .then((res) => {
                    linkObj.status = res.status;
                    linkObj.ok = res.statusText
                    return linkObj
                })
                .catch((err) => {
                    linkObj.status = err.response ? err.response.status : 'ERROR';
                    linkObj.ok = 'FAIL'
                    return linkObj
                })
        }
    })
    return Promise.all(validatedLinks)
};

module.exports = {
    isValidPath,
    isValidOption,
    isAbsolutePath,
    currentWorkingDir,
    resolvePath,
    readDirRecursive,
    readMdFile,
    getUrlLinks,
    analiseUrls,
    validateUrl,
    getStatus,
}
