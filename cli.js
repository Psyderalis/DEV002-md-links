#!/usr/bin/env node
const process = require('process');
const { mdLinks } = require('./src/md-links');
const {
    getSimpleStats,
    getBrokenLinks,
    getCompleteStats
} = require('./src/stats.js')

const validDirPath = './files-to-read';
const absolutePath = 'C:\\Users\\melan\\Desktop\\Proyectos Laboratoria\\DEV002-md-links\\files-to-read';
const validateFalseOp = { validate: false }
const validateTrueOp = { validate: true }

const entryPath = process.argv[2]
//console.log(entryPath)
const firstOption = process.argv[3]
//console.log(firstOption)
const secondOption = process.argv[4]
//console.log(secondOption)

if (entryPath) {
    if (!firstOption && !secondOption) {
        mdLinks(entryPath, validateFalseOp)
            .then(console.log)
            .catch(console.error)
    } else if (firstOption === '--validate' && !secondOption) {
        mdLinks(entryPath, { validate: true, stats: false })
            .then(result => result)
    } else if (firstOption === '--stats' && secondOption === undefined) {
        mdLinks(entryPath, { validate: false, stats: true })
            .then(result => result)
    } else if ((firstOption === '--validate' && secondOption === '--stats') || (firstOption === '--stats' && secondOption === '--validate')) {
        mdLinks(entryPath, { validate: true, stats: true })
            .then(result => result)
    } else {
        console.log('revisa las parametros')
    }
}
//--------------------------------
if (entryPath) {
    if (firstOption === undefined && secondOption === undefined) {
        mdLinks(entryPath, { validate: false, stats: false })
            .then(result => result)
    } else if (firstOption === '--validate' && secondOption === undefined) {
        mdLinks(entryPath, { validate: true, stats: false })
            .then(result => result)
    } else if (firstOption === '--stats' && secondOption === undefined) {
        mdLinks(entryPath, { validate: false, stats: true })
            .then(result => result)
    } else if ((firstOption === '--validate' && secondOption === '--stats') || (firstOption === '--stats' && secondOption === '--validate')) {
        mdLinks(entryPath, { validate: true, stats: true })
            .then(result => result)
    } else {
        console.log('revisa las parametros')
    }
}
// console.log(mdLinks)

/* mdLinks(validDirPath, validateTrueOp)
    .then(console.log)
 */
/* mdLinks(absolutePath, validateFalseOp)
    .then(console.log) */
