const fs = require('fs');
const path = require('path');


const mdLinks = (path, option) => {
    console.log('fix me')
};

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
const validateDirOrMD = (myPath) => {
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
};

// lectura de directorio
const readDir = path => fs.readdirSync(path);
//const dirArray = readDir();

// extraer archivos md del directorio


// lectura de archivo md
// extraer links dentro de archivo md

module.exports = {
    mdLinks,
    validatePath,
    validateOption,
    validateAbsolutePath,
    resolvePath,
    validateDirOrMD,
    readDir
}
