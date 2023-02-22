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
const readDir = path => fs.readdirSync(path);
/* const subDirsAndFiles = readDir('./files-to-read');
console.log(subDirsAndFiles) */

// extraer archivos md
const getMdFiles = arr => arr.filter((file) => isMdFile(file));

// extraer subdirectorios
const getSubDirs = (arr, dirPath) => arr.filter((file) => {
    const subDirPath = path.join(dirPath, file); // se obtiene ruta completa del subdir
    return isDir(subDirPath); // .statSync, devuelve objeto de estadisticas del archivo, .isDirectory es un metodo dentro del objeto que devuelve un booleano. Si da true, se agraga a subDirs, else se omite.
});
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
            const subFiles = readDirRecursive(path.join(myPath, subdir)); // se guardan los archivos en subFiles
            mdFiles = [...mdFiles, ...subFiles]; // se agregan a let mdFiles, concatenando ambos arrays (operador spread '...')
        });
        return mdFiles; //devuelve archivos md
    }
};


// obteniendo links url de data
const getUrlLinks = data => {
    const urls = []
    const urlRegEx = /\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
    const matches = data.match(urlRegEx)
    if (matches) {
        urls.push(...matches)
        return urls;
    } else {
        return 'No links found';
    };
};

// funcion que crea objeto sin validacion de links
const validateFalseOp = (myPath, myLinks) => {
    const links = [];
    myLinks.forEach(link => {
        const urlRegEx = /\((https?:\/\/[^\s)]+)\)/i;
        const href = link.match(urlRegEx);
        const textRegEx = />(.*?)<\/a>/i;
        const textMatch = link.match(textRegEx);
        const text = textMatch ? textMatch[1] : '';
        const linkObj = {
            href: href[1],
            text,
            file: myPath
        }
        links.push(linkObj)
    })
    return links
};

// console.log(validateFalseOp('ruta', ['(https://es.wikipedia.org/wiki/Markdown)']))

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

/* readMdFile()
    .then(file => {
        console.log(file)
    })
    .catch(error => {
        console.error(error);
    });
 */



// funcion que crea objeto con validacion de links



module.exports = {
    isValidPath,
    isValidOption,
    isAbsolutePath,
    currentWorkingDir,
    resolvePath,
    readDirRecursive,
}
