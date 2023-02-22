const {
    isValidPath,
    isValidOption,
    isAbsolutePath,
    currentWorkingDir,
    resolvePath,
    readDirRecursive,
    readMdFile,
    analiseUrlLinks,

} = require('./md-links-utils.js');

const validDirPath = './files-to-read';
const validateFalseOp = { validate: false }

const mdLinks = (path, option) => {
    isValidPath(path);
    isValidOption(option);
    if (!isAbsolutePath(path)) {
        const resolvedPath = resolvePath(currentWorkingDir, path);
        path = resolvedPath;
    };
    const mdFiles = readDirRecursive(path);
    mdFiles.forEach(file => {
        readMdFile(file)
            .then(links => {
                analiseUrlLinks(links, file, option)
            })
            .catch(error => {
                console.error(error);
            });
    });
    return new Promise ((res, rej) => {
        
    })
};

mdLinks(validDirPath, validateFalseOp)

module.exports = { mdLinks }