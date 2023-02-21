const {
 // mdLinks,
  validatePath,
  validateOption,
  validateAbsolutePath,
  resolvePath,
 // validateDirOrMD,
  // readDir,
  readDirRecursive,
  // getMdFiles,
 readMdFile
} = require('../src/index.js');

const validMDPath = './files-to-read/achicando.md';
const validDirPath = './files-to-read';
const invalidPath = 'achicando';
const absolutePath = '/home/user/app.js';
const relativePath = './app.js';
const myCurrentWorkingDirectory = '/home/user';
const validOption1 = { validate: true };
const validOption2 = { validate: false };
const validOption3 = 'validate';
const invalidOption1 = 'option';
const invalidOption2 = { validate: 33 };
const invalidFile = 'check.txt';
const subDirsAndFiles = [
  'achicando.md',
  'criterios.md',
  'entreg-hackeredit.md',
  'indice-preambulo.md',
  'OAs.txt',
  'subdirectory',
  'tips.md'
]

//test para mdLinks
/* describe('Test to mdLinks()', () => {
  it('mdLinks debería ser una función', () => {
    expect(typeof mdLinks).toBe('function')
  })
}); */

// test para validacion de path
describe('Test to validatePath()', () => {
  test('Returns true for a valid path', () => {
    return expect(validatePath(validMDPath)).resolves.toBe(true)
  });
  test('Returns true for a valid path', () => {
    return expect(validatePath(validDirPath)).resolves.toBe(true)
  });
  test('Throws error for an invalid path', () => {
    return expect(validatePath(invalidPath)).rejects.toThrow()
  });
});

// test para validación de option
describe('Test to validateOption()', () => {
  test('Returns true for a valid option', () => {
    return expect(validateOption(validOption1)).resolves.toBe(true)
  });
  test('Returns true for a valid option', () => {
    return expect(validateOption(validOption2)).resolves.toBe(true)
  });
  test('Returns true for a valid option', () => {
    return expect(validateOption(validOption3)).resolves.toBe(true)
  });
  test('Throws error for an invalid option', () => {
    return expect(validateOption(invalidOption1)).rejects.toThrow()
  });
  test('Throws error for an invalid option', () => {
    return expect(validateOption(invalidOption2)).rejects.toThrow()
  });
});

// test para validación de path absoluta o relativa
describe('Test to validateAbsolutePath()', () => {
  test('Returns true for an absolute path', () => {
    return expect(validateAbsolutePath(absolutePath)).toBe(true)
  });
  test('Returns false for a relative path', () => {
    return expect(validateAbsolutePath(relativePath)).toBe(false)
  });
});

// test para resolver ruta relativa a absoluta
describe('Test to resolvePath()', () => {
  test('Resolves a relative path into an absolute path', () => {
    return expect(resolvePath(myCurrentWorkingDirectory, relativePath)).toBe('C:\\home\\user\\app.js')
  });
});

/* // test para validación de directorio o archivo md
describe('Test to validateDirOrMD()', () => {
  test('Returns \'dir\' for a dir path', () => {
    return expect(validateDirOrMD(myCurrentWorkingDirectory)).resolves.toBe('dir')
  });
  test('Returns \'md file\' for a md file path', () => {
    return expect(validateDirOrMD(validMDPath)).resolves.toBe('md file')
  });
  test('Throws error for an invalid file', () => {
    return expect(validateDirOrMD(invalidFile)).rejects.toThrow()
  });
}); */

// test para validacion de directorio
// ---------------------------

// test para validacion de archivo md
// ---------------------------

// test para lectura de directorio
/* describe('Test to readDir()', () => {
  test('Returns an array of files and folders', () => {
    return expect(readDir(validDirPath)).toEqual(subDirsAndFiles)
  });
}); */

// test para extraer archivos md del directorio
/* describe('Test to getMdFiles()', () => {
  test('Returns an array of md files', () => {
    return expect(getMdFiles(subDirsAndFiles)).toEqual([
      'achicando.md',
      'criterios.md',
      'entreg-hackeredit.md',
      'indice-preambulo.md',
      'tips.md'
    ])
  });
}); */

// test para lectura recursiva de dir y extraccion de md
describe('Test to readDirRecursive()', () => {
  test('Throws error for a file path that is not md', () => {
    return expect( ()=>readDirRecursive('./files-to-read/OAs.txt')).toThrow()
  });
  test('Returns an array with an md file path for a md file path', () => {
    return expect(readDirRecursive(validMDPath)).toEqual([validMDPath])
  });
  test('Returns an array of md files for a directory path', () => {
    return expect(readDirRecursive(validDirPath)).toEqual([
      'achicando.md',
      'criterios.md',
      'entreg-hackeredit.md',
      'indice-preambulo.md',
      'tips.md',
      'resumen.md',
    ])
  });
});

// test para lectura de archivo md y extraccion de links
describe('Test to readMdFile()', () => {
  test('Throws error for an invalid path', () => {
    return expect( ()=>readMdFile(invalidPath) ).toThrow()
  });
  test('Returns an array of urls for a file path', () => {
    return expect(readMdFile(validMDPath)).toEqual([
      [ '(https://www.youtube.com/watch?v=Lub5qOmY4JQ)' ]
    ])
  });
});

//------------------------------------
/* describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */