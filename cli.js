#!/usr/bin/env node
const process = require('process');
const { mdLinks } = require('./src/md-links');
const {
    getSimpleStats,
    getBrokenLinks,
    getCompleteStats
} = require('./src/stats.js')

//console.log(process)

const validateFalse = { validate: false }
const validateTrue = { validate: true }

// const ejecutable = process.argv[1]
// console.log(ejecutable)

const entryPath = process.argv[2]
//console.log(entryPath)
const firstOption = process.argv[3]
//console.log(firstOption)
const secondOption = process.argv[4]
//console.log(secondOption)

if (entryPath) {
    // comportamiento por defecto
    if (!firstOption && !secondOption) {
        mdLinks(entryPath, validateFalse)
            .then(console.log
                /* (arr) => {
                const info = arr.forEach(e => {
                    const resultsStr = `${e.file} ${e.href} ${e.text}`;
                    console.log(resultsStr)
                });
                return info
            } */
                )
            .catch(console.error)
    }
    // opción validate
    else if (firstOption === '--validate' && !secondOption) {
        mdLinks(entryPath, validateTrue)
            .then(console.log)
            .catch(console.error)
    }
    // opción stats
    else if (firstOption === '--stats' && !secondOption) {
        mdLinks(entryPath, validateFalse)
            .then((arr) => {
                const simpleStats = getSimpleStats(arr)
                return console.log(simpleStats)
            })
            .catch(console.error)
    }
    // opciones combinadas
    else if ((firstOption === '--validate' && secondOption === '--stats') || (firstOption === '--stats' && secondOption === '--validate')) {
        mdLinks(entryPath, validateTrue)
            .then((arr) => {
                const simpleStats = getSimpleStats(arr);
                const brokenLinks = getBrokenLinks(arr);
                const completeStats = getCompleteStats(simpleStats, brokenLinks);
                return console.log(completeStats)
            })
            .catch(console.error)
    } 
    // error
    else {
        console.log('revisa las parametros')
    }
}

