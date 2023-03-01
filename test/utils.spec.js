const {
  isValidPath,
  isValidOption,
  isAbsolutePath,
  resolvePath,
  readDirRecursive,
  readMdFile,
  fs
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

// mock para el caso en que la promesa readMdFile resuelve correctamente
jest.mock('fs', () => ({
  readFile: (file, encoding, callback) => {
    const data = 'Contenido del archivo';
    callback(null, data); //null para error
  },
}));

// mock para el caso en que la promesa readMdFile es rechazada
jest.mock('fs', () => ({
  readFile: (file, encoding, callback) => {
    const error = new Error('Error leyendo archivo');
    callback(error, null); //null para data
  },
}));

/* ---------------------------------------------------------------
------------ TEST                        ----------------------- */

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
describe('Test to readMdFile() promise', () => {
  test('resolves to an object containing the filename and its data', () => {
    return expect(validatePath(validPath)).resolves.toEqual(true)
  });
  test('Throw error for an invalid path', () => {
    return expect(validatePath(invalidPath)).rejects.toThrow()
  });
});

describe('readMdFile', () => {
  test('returns an object with file and data properties on successful file read', () => {
    const file = 'test-file.md';
    return readMdFile(file).then(data => {
      expect(data).toHaveProperty('file', file);
      expect(data).toHaveProperty('data', 'Contenido del archivo');
    });
  });

  test('throws an error on failed file read', () => {
    const file = 'non-existent-file.md';
    return readMdFile(file).catch(error => {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message', `ENOENT: no such file or directory, open '${file}'`);
    });
  });
});


//------------------------------------
/* describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */