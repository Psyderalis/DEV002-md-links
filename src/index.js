const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it')();

//const glob = require('glob')

// Validación de ruta: Check if the file exists in the current directory and is readeble.
const validatePath = (myPath) => {
    return new Promise((resolve, reject) => {
        fs.access(myPath, fs.constants.F_OK | fs.constants.R_OK, (err) => {
            if (!err) {
                resolve(true)
            } else {
                reject(new Error('Invalid or unreadeble path'))
            }
        })
    })
};

// validación de option | 'validate', {validate : true}, {validate : false}
const validateOption = (option) => {
    return new Promise((resolve, reject) => {
        if (option === 'validate' || (typeof option === 'object' && (option.validate === true || option.validate === false))) {
            resolve(true)
        } else {
            reject(new Error('Invalid option'))
        }
    })
};

// validación de path absoluta o relativa
const validateAbsolutePath = myPath => path.isAbsolute(myPath);

// resolver ruta relativa a absoluta
const myCurrentWorkingDir = process.cwd();
// const relativePath = './src/index.js';
const resolvePath = (currentWorkingDir, relativePath) => {
    return path.resolve(currentWorkingDir, relativePath);
}
//const resolvedPath = resolvePath();

/* resolvePath(myCurrentWorkingDirectory, relativePath);
console.log(`Current directory: ${currentWorkingDirectory}`)
console.log(`Resolved Path: ${resolvedPath}`)

validatePath(resolvedPath)
    .then(res => console.log(res))
    .catch(err => console.error(err)) */

// validación de directorio o archivo md
/* const validateDirOrMD = (myPath) => {
    const extensionFile = path.extname(myPath);
    return new Promise((resolve, reject) => {
        if (extensionFile == '') {
            resolve('dir')
        } if (extensionFile == '.md') {
            resolve('md file')
        } else {
            reject(new Error('Invalid type of file'))
        }
    })
}; */

// validacion de directorio
const isDir = myPath => {
    return fs.statSync(myPath).isDirectory()
}

// validacion de archivo md
const isMdFile = file => path.extname(file) === ".md"; //retorna boolean

// lectura de directorio 
const readDir = path => fs.readdirSync(path);
/* const subDirsAndFiles = readDir('./files-to-read');
console.log(subDirsAndFiles) */

// extraer archivos md
const getMDfiles = arr => arr.filter((file) => isMdFile(file));

// extraer subdirectorios
const getSubDirs = (arr, dirPath) => arr.filter((file) => {
    const subDirPath = path.join(dirPath, file); // se obtiene ruta completa del subdir
    return isDir(subDirPath); // .statSync, devuelve objeto de estadisticas del archivo, .isDirectory es un metodo dentro del objeto que devuelve un booleano. Si da true, se agraga a subDirs, else se omite.
});

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
        let mdFiles = getMDfiles(files) // se guardan archivos md en variable mdFiles
        const subDirs = getSubDirs(files, myPath);
        subDirs.forEach((subdir) => { // la fn se llama a si misma para leer subdirs
            const subFiles = readDirRecursive(path.join(myPath, subdir)); // se guardan los archivos en subFiles
            mdFiles = [...mdFiles, ...subFiles]; // se agregan a let mdFiles, concatenando ambos arrays (operador spread '...')
        });
        return mdFiles; //devuelve archivos md
    }
};

//const mdFiles = readDirRecursive("/path/to/directory");

const readMdFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (error, data) => {
            if (error) {
                reject(error)
            } else {
                const links = [];
                const tokens = markdownIt.parse(data, {}) //array de tokens
                tokens.forEach(token => {
                    // console.log(token)
                    if (token.type === 'link_open') {
                        const link = token.attrGet('href') // Obtenemos el valor del atributo href (dentro del array de atributos ('attrs'))
                        links.push(link); // Lo agregamos al array de links
                    }
                });
                resolve (links)
            }
        });
    });
};

readMdFile('./files-to-read/achicando.md')
  .then(links => {
    console.log(links);
  })
  .catch(error => {
    console.error(error);
  });


// lectura de archivo md y extraccion de links

//recorre el array y por cada uno:
//busca links
// si no hay links tira error
// si hay links retorna array de links


// extraer links dentro de archivo md

// funcion que crea objeto sin validacion de links

// funcion que crea objeto con validacion de links

//------------------------------------------------------------
/* const mdLinks = (path, option) => {
    console.log('fix me')
}; */
//-------------------------------------------------------------

module.exports = {
    // mdLinks,
    validatePath,
    validateOption,
    validateAbsolutePath,
    resolvePath,
    // validateDirOrMD,
    readDir,
    readDirRecursive,
    getMDfiles,
    readMdFile
}
