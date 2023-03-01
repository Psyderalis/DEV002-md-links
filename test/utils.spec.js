const {
  isValidPath,
  isValidOption,
  isAbsolutePath,
  resolvePath,
  readDirRecursive,
  readMdFile,
  isDir,
  isMdFile,
  readDir,
  getMdFiles,
  getSubDirs,
  fs,
  path,
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

/* // mock para módulo fs
jest.mock('fs', () => ({
  existsSync: jest.fn(),
  statSync: jest.fn(() => ({
    isDirectory: jest.fn()
  })),
  readdirSync: jest.fn(),
  readFile: jest.fn(),
}));
*/
/* // mock para módulo path
jest.mock('path', () => ({
  isAbsolute: jest.fn(),
  resolve: jest.fn(),
  extname: jest.fn(),
  join: jest.fn(),
}));  */

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
    isValidPath(validMDPath);
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
/* // test para validacion de path
describe('Test to isValidPath()', () => {
  test('Returns true for a valid path', () => {
    // Configurando el mock para que devuelva true
    fs.existsSync.mockReturnValue(true);
    const result = isValidPath(validMDPath);
    expect(result).toBe(true);
  });
  test('Returns true for a valid diretory path', () => {
    fs.existsSync.mockReturnValue(true);
    const result = isValidPath(validDirPath);
    expect(result).toBe(true);
  });
  test('Returns false for an invalid path', () => {
    fs.existsSync.mockReturnValue(false);
    const result = isValidPath(invalidPath);
    expect(result).toBe(false);
  });
}); */

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
  test('path.isAbsolute() should be called with the correct arguments ', () => {
    isAbsolutePath(absolutePath)
    expect(path.isAbsolute).toHaveBeenCalledWith(absolutePath)
  });
  test('path.isAbsolute() should be called with the correct arguments ', () => {
    isAbsolutePath(relativePath)
    expect(path.isAbsolute).toHaveBeenCalledWith(relativePath)
  });
});

// test para resolver ruta relativa a absoluta
describe('Test to resolvePath()', () => {
  test('path.resolve() should be called with the correct arguments ', () => {
    resolvePath(myCurrentWorkingDirectory, relativePath)
    expect(path.resolve).toHaveBeenCalledWith(myCurrentWorkingDirectory, relativePath)
  });
});
/* // test para validación de path absoluta o relativa
describe('Test to isAbsolutePath()', () => {
  test('path.isAbsolute() should be called with the correct arguments ', () => {
    isAbsolutePath(absolutePath)
    expect(path.isAbsolute).toHaveBeenCalledWith(absolutePath)
  });
  test('path.isAbsolute() should be called with the correct arguments ', () => {
    isAbsolutePath(relativePath)
    expect(path.isAbsolute).toHaveBeenCalledWith(relativePath)
  });
});

// test para resolver ruta relativa a absoluta
describe('Test to resolvePath()', () => {
  test('path.resolve() should be called with the correct arguments ', () => {
    resolvePath(myCurrentWorkingDirectory, relativePath)
    expect(path.resolve).toHaveBeenCalledWith(myCurrentWorkingDirectory, relativePath)
  });
}); */

// test para validacion de directorio
/* describe('Test to isDir()', () => {
  test('isDirectory() should be called', () => {
    isDir(validDirPath)
    expect(fs.statSync).toHaveBeenCalledWith(validDirPath);
    //expect(fs.statSync().isDirectory).toHaveBeenCalled();
  });
}); */

// test para lectura recursiva de dir y extraccion de md
describe('Test to readDirRecursive()', () => {
  test('Returns false for a file path that is not md', () => {
    const notMdPath = './files-to-read/OAs.txt';
    const result = readDirRecursive(notMdPath);
    expect(result).toBe(false)
  });
  test('Returns an array with an md file path for a md file path', () => {
    const result = readDirRecursive(validMDPath);
    expect(result).toEqual([validMDPath])
  });
  test('Returns an array of md files for a directory path', () => {
    const mdFilesArr = [
      'achicando.md',
      'criterios.md',
      'entreg-hackeredit.md',
      'indice-preambulo.md',
      'tips.md',
      'resumen.md',
    ]
    const result = readDirRecursive(validDirPath);
    expect(result).toEqual(mdFilesArr)
  });
});
/*
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
}); */


//------------------------------------
/* describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */