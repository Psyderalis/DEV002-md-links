const fs = require('fs');
const path = require('path');

// Validación de ruta: Check if the file exists in the current directory and is readeble.
const isValidPath = (myPath) => {
    if (fs.existsSync(myPath)) {
        return true;
    } else {
        throw new Error('Invalid or unreadable path');
    }
};

// validación de option 
const isValidOption = (option) => {
    if (typeof option === 'object' && (option.validate === true || option.validate === false)) {
        return true
    } else {
        throw new Error('Invalid option');
    }
};

// validación de path absoluta o relativa
const isAbsolutePath = myPath => path.isAbsolute(myPath);

// resolver ruta relativa a absoluta
const currentWorkingDir = process.cwd();
const resolvePath = (myCurrentWorkingDir, relativePath) => path.resolve(myCurrentWorkingDir, relativePath);

//-------------Bloque de funciones para lectura recursiva de directorio----------
// validacion de directorio
const isDir = myPath => fs.statSync(myPath).isDirectory();

// validacion de archivo md
const isMdFile = file => path.extname(file) === ".md"; //retorna boolean

// lectura de directorio 
const readDir = myPath => { 
    const files = fs.readdirSync(myPath);
    const filesPaths = files.map(file => path.join(myPath, file));
    return filesPaths
};
/* const subDirsAndFiles = readDir('./files-to-read');
console.log(subDirsAndFiles) */

// extraer archivos md
const getMdFiles = arr => arr.filter((file) => isMdFile(file));

// extraer subdirectorios
const getSubDirs = (arr) => arr.filter((file) =>  isDir(file)); // .statSync, devuelve objeto de estadisticas del archivo, .isDirectory es un metodo dentro del objeto que devuelve un booleano. Si da true, se agraga a subDirs, else se omite.

//------------------------------------------------------------------

// lectura recursiva: revisa directorio y retorna array con archivos md, 
const readDirRecursive = (myPath) => { //entra ruta 
    // caso base: la ruta corresponde a un archivo
    if (!isDir(myPath) && !isMdFile(myPath)) {
        throw new Error('Invalid type of file'); // lanzar una excepción
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
        return mdFiles; //devuelve array de archivos md
    } 
};
// console.log(readDirRecursive('./files-to-read'))

// obteniendo links url de data
const getUrlLinks = data => {
    const urls = []
    // const urlRegEx = /\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
    const urlRegEx = /\[([^\[\]]*?)\]\((https?:\/\/[^\s$.?#].[^\s]*)\)/gi; //regex andre
    const matches = data.match(urlRegEx)
    if (matches) {
        urls.push(...matches)
        return urls;
    } else {
        return 'No links found';
    };
};

// leyendo archivo md y extrayendo links
const readMdFile = file => {
    return new Promise((res, rej) => {
        fs.readFile(file, 'utf-8', (error, data) => {
            if (error) {
                rej(error)
            } else {
                res(getUrlLinks(data))
            }
        })
    })
};

/* readMdFile(ruta)
    .then(links => {
        // console.log(links);
    })
    .catch(error => {
        console.error(error);
    }); */

// analizar links y retornar objeto
const analiseUrlLinks = (links, path, option) => {
    let analisedLinks = [];
    links.forEach(link => {
        let linkObject = new Object();
        const hrefRegEx = /\(([^)]+)\)/g;
        const textRegEx = /\[([^\[\]]*?)\]/g;
        const href = link.match(hrefRegEx).toString().replace(/\(|\)/g, '');
        const text = link.match(textRegEx).toString().replace(/[\[\]]/g, '');
        linkObject.href = href;
        linkObject.text = text;
        linkObject.file = path;
        if (option.validate) {
            linkObject.status = 'holi';
            linkObject.ok = 'holi2';
        }
        analisedLinks.push(linkObject);
    })
    return analisedLinks
};
/* const linksarray = [
    '[Markdown](https://es.wikipedia.org/wiki/Markdown)',
    '[Node.js](https://nodejs.org/)',
    '[md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)'
];
const option = { validate : true}
const ruta = './files-to-read/indice-preambulo.md';

console.log(analiseUrlLinks(linksarray, ruta, option
)); */

module.exports = {
    isValidPath,
    isValidOption,
    isAbsolutePath,
    currentWorkingDir,
    resolvePath,
    readDirRecursive,
    readMdFile,
    analiseUrlLinks
}
