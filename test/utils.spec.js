const {
  isValidPath,
  isValidOption,
  isAbsolutePath,
  resolvePath,
  readDirRecursive,
  readMdFile,
  getUrlLinks,
  analiseUrls,
  validateUrl,
  getStatus,
 // axios
} = require('../src/utils.js');
 const axios = require( 'axios')

const validMDPath = './files-to-read/achicando.md';
const validDirPath = './files-to-read';
const invalidPath = 'achicando';
const absolutePath = '/home/user/app.js';
const relativePath = './app.js';
const myCurrentWorkingDirectory = '/home/user';
const linksData = {
  file: 'path',
  links: ['[recurso](https://www.youtube.com/watch?v=Lub5qOmY4JQ)']
};
const noLinksObject = {
  file: 'rutafalsa',
  links: ['No links found']
};
const parsedLink = [{
  href: 'https://www.youtube.com/watch?v=Lub5qOmY4JQ',
  text: 'recurso',
  file: 'path',
}];

// mock para módulo 
jest.mock('axios');


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

// test para promesa de lectura de archivo
describe('Test to readMdFile promise', () => {
  test('resolves to an object with file and data properties on successful file read', () => {
    const shortTextFile = "files-to-read\\subdirectory\\texto-corto.md"
    const fileObj = {
      file: shortTextFile,
      data: 'hello world!'
    }
    return readMdFile(shortTextFile).then(res => {
      expect(res).toEqual(fileObj)
    });
  });
  test('Reject on error', () => {
    return expect(readMdFile(invalidPath)).rejects.toThrow()
  });
});

// test para obtener links
describe('Test to getUrlLinks()', () => {
  test('Returns an object with links and the path', () => {
    const data = {
      file: 'path',
      data: 'Si nunca has hecho un diagrama de flujo revisa este [recurso](https://www.youtube.com/watch?v=Lub5qOmY4JQ).'
    }
    const result = getUrlLinks(data);
    expect(result).toEqual(linksData)
  });
  test('Returns an object with the path and \'No links found\' response when there are no links', () => {
    const noLinksData = {
      file: 'rutafalsa',
      data: 'nopasanaconloslinksss'
    };

    const result = getUrlLinks(noLinksData);
    expect(result).toEqual(noLinksObject)
  })
});

// test para analizar links
describe('test to analiseUrls()', () => {
  test('Returns an array with objecs representing parsed links', () => {
    const result = analiseUrls(linksData);
    expect(result).toEqual(parsedLink)
  });
  test('Returns the input object when there are no links', () => {
    const result = analiseUrls(noLinksObject);
    expect(result).toEqual(noLinksObject)
  })
});

/* //test para obtener el status de un link
describe('test to getStatus()', () => {
  test('Returns an array of promises with objects representin validated links', () => {
    axios.get.mockResolvedValue({status: 200, statusText: 'OK'})
    const linkStatusArr = [
      {
        href: 'https://www.youtube.com/watch?v=Lub5qOmY4JQ',
        text: 'recurso',
        file: 'path',
        status: 200,
        ok: 'OK'
      }
    ];
    const result = getStatus(parsedLink);
   return expect(result).toEqual(linkStatusArr);
  });
}); */
