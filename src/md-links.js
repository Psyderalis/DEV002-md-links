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
    getStatus

} = require('./utils.js');

const validDirPath = './files-to-read';
const absolutePath = 'C:\\Users\\melan\\Desktop\\Proyectos Laboratoria\\DEV002-md-links\\files-to-read';
const validateFalseOp = { validate: false }
const validateTrueOp = { validate: true }

const mdLinks = (path, option) => {
    const mdLinksPromise = new Promise((resolve, reject) => {
        if (!isValidPath(path)) {
            reject('Invalid path')
        };
        if (!isValidOption(option)) {
            reject('Invalid option')
        };
        if (!isAbsolutePath(path)) {
            const resolvedPath = resolvePath(currentWorkingDir, path);
            path = resolvedPath;
        };
        const mdFiles = readDirRecursive(path);
        if (!mdFiles) {
            reject('Invalid type of file')
        }
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
        });
        // RETORNO POR DEFECTO
        //const result = Promise.all(linksPromisesArr)
        const defaultResults = Promise.all(analisedLinksPromisesArr).then((res) => {
            return res.flat();
        })
        if (!option.validate) {
            resolve(defaultResults)
            //RETORNO CON VALIDACION
        } else {
            const validatedResults = defaultResults.then((arr) => {
                return getStatus(arr)
            })
            resolve(validatedResults)
        }
    });
    return mdLinksPromise
}
mdLinks(validDirPath, validateTrueOp)
    .then(console.log)

/* mdLinks(absolutePath, validateFalseOp)
    .then(console.log) */



module.exports = { mdLinks }