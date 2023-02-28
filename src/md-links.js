const {
    isValidPath,
    isValidOption,
    isAbsolutePath,
    currentWorkingDir,
    resolvePath,
    readDirRecursive,
    readMdFile,
    getUrlLinks,
    analiseUrls,

} = require('./utils.js');

const validDirPath = './files-to-read';
const absolutePath = 'C:\\Users\\melan\\Desktop\\Proyectos Laboratoria\\DEV002-md-links\\files-to-read';
const validateFalseOp = { validate: false }


const mdLinks = (path, option) => {
    const mdLinksPromise = new Promise((res, rej) => {
        if (!isValidPath(path)) {
            rej('Invalid path')
        };
        if (!isValidOption(option)) {
            rej('Invalid option')
        };
        if (!isAbsolutePath(path)) {
            const resolvedPath = resolvePath(currentWorkingDir, path);
            path = resolvedPath;
        };
        const mdFiles = readDirRecursive(path);
        // array de promesas que resuelven en la data de cada archivo)
        const dataPromisesArr = mdFiles.map(file => {
            const dataPromise = readMdFile(file);
            return dataPromise
            // en el catch rechazar promesa principal               
        });
        // array de promesas que resuelven en los links
        const linksPromisesArr = dataPromisesArr.map((myDataPromise) => {
            const linksPromise = myDataPromise.then((data) => {
                const links = getUrlLinks(data)
                return links
            });
            return linksPromise
        });
        // array de promesas que resuelven en los links deglosados
        const analisedLinksPromisesArr = linksPromisesArr.map((myLinkPromise) => {
            const analisedLinksPromise = myLinkPromise.then((link) => {
                const analisedLink = analiseUrls(link)
                return analisedLink
            });
            return analisedLinksPromise
        })
        // retorno array de resultados de cada archivo
        const result = Promise.all(analisedLinksPromisesArr)
        //const result = Promise.all(analisedLinksPromisesArr)
        res(result)
    });
    return mdLinksPromise

}
mdLinks(validDirPath, validateFalseOp)
    .then(console.log)

// console.log(mdLinks(validDirPath, validateFalseOp));
//console.log(mdLinks(absolutePath, validateFalseOp))


module.exports = { mdLinks }