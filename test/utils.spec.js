const {
  isValidPath,
  isValidOption,
  isAbsolutePath,
  resolvePath,
  readDirRecursive,
  readMdFile,
  getUrlLinks,
  analiseUrls,
  getStatus,
  axios
} = require('../src/utils.js');

const validMDPath = './files-to-read/achicando.md';
const validDirPath = './files-to-read';
const invalidPath = 'achicando';
const absolutePath = '/home/user/app.js';
const relativePath = './app.js';
const myCurrentWorkingDirectory = '/home/user';

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

// mock para módulo axios ARREGLAAAAR
jest.mock('axios', () => ({
  isAbsolute: jest.fn(),
  resolve: jest.fn(),
  extname: jest.fn(),
  join: jest.fn(),
}));


/* ---------------------------------------------------------------
------------           TEST                         */

// test para validacion de path
describe('Test to isValidPath()', () => {
  test('Returns true for a valid path', () => {
    const result = isValidPath(validMDPath);
    expect(result).toBe(true);
  });
  test('Returns true for a valid diretory path', () => {
    const result = isValidPath(validDirPath);
    expect(result).toBe(true);
  });
  test('Returns false for an invalid path', () => {
    const result = isValidPath(invalidPath);
    expect(result).toBe(false);
  });
});

// test para validación de option
describe('Test to isValidOption()', () => {
  test('Returns true for a valid option', () => {
    const validOption1 = { validate: true };
    const result = isValidOption(validOption1)
    expect(result).toBe(true)
  });
  test('Returns true for a valid option', () => {
    const validOption2 = { validate: false };
    const result = isValidOption(validOption2)
    expect(result).toBe(true)
  });
  test('Returns false for an invalid option', () => {
    const invalidOption1 = 'invalid-option';
    const result = isValidOption(invalidOption1)
    expect(result).toBe(false)
  });
  test('Returns false for an invalid option', () => {
    const invalidOption2 = { validate: 'invalid-option' };
    const result = isValidOption(invalidOption2)
    expect(result).toBe(false)
  });
});

// test para validación de path absoluta o relativa
describe('Test to isAbsolutePath()', () => {
  test('Returns true for an absolute path', () => {
    expect(isAbsolutePath(absolutePath)).toBe(true)
  });
  test('Returns false for a relative path', () => {
    expect(isAbsolutePath(relativePath)).toBe(false)
  });
});

// test para resolver ruta relativa a absoluta
describe('Test to resolvePath()', () => {
  test('Resolves a relative path into an absolute path', () => {
    const result = resolvePath(myCurrentWorkingDirectory, relativePath);
    expect(result).toBe('C:\\home\\user\\app.js')
  });
});

// test para lectura recursiva de dir y extraccion de md
describe('Test to readDirRecursive()', () => {
  test('Returns false for a file path that is not md', () => {
    const notMdPath = './files-to-read/subdirectory/check.txt';
    const result = readDirRecursive(notMdPath);
    expect(result).toBe(false)
  });
  test('Returns an array with an md file path for a md file path', () => {
    const result = readDirRecursive(validMDPath);
    expect(result).toEqual([validMDPath])
  });
  test('Returns an array of md files paths for a directory path', () => {
    const mdFilesArr = [
      "files-to-read\\achicando.md",
      "files-to-read\\criterios.md",
      "files-to-read\\entreg-hackeredit.md",
      "files-to-read\\indice-preambulo.md",
      "files-to-read\\OAs.md",
      "files-to-read\\tips.md",
      "files-to-read\\subdirectory\\resumen.md",
      "files-to-read\\subdirectory\\texto-corto.md",
    ]
    const result = readDirRecursive(validDirPath);
    expect(result).toEqual(mdFilesArr)
  });
});

/* // test para lectura de archivo md
describe('Test to readMdFile() promise', () => {
  test('resolves to an object containing the filename and its data', () => {
    return expect(validatePath(validPath)).resolves.toEqual(true)
  });
  test('Throw error for an invalid path', () => {
    return expect(validatePath(invalidPath)).rejects.toThrow()
  });
}); */

// test para promesa de lectura de archivo
describe('Test to readMdFile promise', () => {
  test('returns an object with file and data properties on successful file read', () => {
    const shortTextFile = "files-to-read\\subdirectory\\texto-corto.md"
    const fileObj = {
      file: shortTextFile,
      data: 'hello world!'
    }
    return readMdFile(shortTextFile).then(res => {
      expect(res).toEqual(fileObj)
    });
  });

  /* test('should catch error on file read', () => {
    const file = 'non-existent-file.md';
    const expectedError = new Error('ENOENT: no such file or directory');
    return readMdFile(file).catch(error => {
      expect(typeof error).toBe(object);
    });
  }); */

});




//------------------------------------
/* describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */