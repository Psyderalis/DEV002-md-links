#!/usr/bin/env node
const { mdLinks } = require('./md-links');

const validDirPath = './files-to-read';
const validateFalseOp = { validate: false }

// console.log(mdLinks)

mdLinks(validDirPath, validateFalseOp).then(() => {})
.catch((error) => {
    console.log(error)
})