const {
  isValidPath,
  isValidOption,
  isAbsolutePath,
  resolvePath,
  readDirRecursive,
  readMdFile
} = require('../src/utils.js');

const validMDPath = './files-to-read/achicando.md';
const validDirPath = './files-to-read';
const invalidPath = 'achicando';
const absolutePath = '/home/user/app.js';
const relativePath = './app.js';
const myCurrentWorkingDirectory = '/home/user';
const validOption1 = { validate: true };
const validOption2 = { validate: false };
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
];
// test para validacion de path
describe('Test to isValidPath()', () => {
  test('Returns true for a valid path', () => {
    expect(isValidPath(validMDPath)).toBe(true)
  });
  test('Returns true for a valid diretory path', () => {
    expect(isValidPath(validDirPath)).toBe(true)
  });
  test('Returns false for an invalid path', () => {
    expect(() => isValidPath(invalidPath)).toBe(false)
  });
});

// test para validación de option
describe('Test to isValidOption()', () => {
  test('Returns true for a valid option', () => {
    expect(isValidOption(validOption1)).toBe(true)
  });
  test('Returns true for a valid option', () => {
    expect(isValidOption(validOption2)).toBe(true)
  });
  test('Returns false for an invalid option', () => {
    expect(() => isValidOption(invalidOption1)).toBe(false)
  });
  test('Returns false for an invalid option', () => {
    expect(() => isValidOption(invalidOption2)).toBe(false)
  });
});

// test para validación de path absoluta o relativa
describe('Test to isAbsolutePath()', () => {
  test('Returns true for an absolute path', () => {
    return expect(isAbsolutePath(absolutePath)).toBe(true)
  });
  test('Returns false for a relative path', () => {
    return expect(isAbsolutePath(relativePath)).toBe(false)
  });
});

// test para resolver ruta relativa a absoluta
describe('Test to resolvePath()', () => {
  test('Resolves a relative path into an absolute path', () => {
    return expect(resolvePath(myCurrentWorkingDirectory, relativePath)).toBe('C:\\home\\user\\app.js')
  });
});

// test para lectura recursiva de dir y extraccion de md
describe('Test to readDirRecursive()', () => {
  test('Returns false for a file path that is not md', () => {
    return expect(() => readDirRecursive('./files-to-read/OAs.txt')).toBe(false)
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

// test para lectura de archivo md 
describe('Test to readMdFile()', () => {
  test('Throws error for an invalid path', () => {
    return expect(() => readMdFile(invalidPath)).toThrow()
  });
  test('Returns an array of urls for a file path', () => {
    return expect(readMdFile(validMDPath)).toEqual([
      ['(https://www.youtube.com/watch?v=Lub5qOmY4JQ)']
    ])
  });
});

//------------------------------------
/* describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */