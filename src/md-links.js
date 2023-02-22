const {
    isValidPath,
    isValidOption,
    isAbsolutePath,
    currentWorkingDir,
    resolvePath,
    readDirRecursive,
} = require('./md-links-utils.js');

const validDirPath = './files-to-read';
const validateFalseOp = { validate : false }

const mdLinks = (path, option) => {
    isValidPath(path);
    isValidOption(option);
    if (!isAbsolutePath(path)) {
        const resolvedPath = resolvePath(currentWorkingDir, path);
        path = resolvedPath;
    };
    const mdFiles = readDirRecursive(path);
    return console.log(mdFiles) //hasta ahora solo retorna array de archivos md
};

mdLinks(validDirPath, validateFalseOp)

module.exports = { mdLinks }