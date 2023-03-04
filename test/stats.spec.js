const {
    getSimpleStats,
    getBrokenLinks,
    getCompleteStats
} = require('../src/stats.js')

const simpleLinksArr = [
    {
        href: 'https://www.youtube.com/watch?v=Lub5qOmY4JQ',
        text: 'recurso',
        file: 'C:\\Users\\melan\\Desktop\\Proyectos Laboratoria\\DEV002-md-links\\files-to-read\\achicando.md'
    },
    {
        file: 'C:\\Users\\melan\\Desktop\\Proyectos Laboratoria\\DEV002-md-links\\files-to-read\\criterios.md',
        links: ['No links found']
    },
    {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\melan\\Desktop\\Proyectos Laboratoria\\DEV002-md-links\\files-to-read\\indice-preambulo.md'
    },
    {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\melan\\Desktop\\Proyectos Laboratoria\\DEV002-md-links\\files-to-read\\indice-preambulo.md'
    },
];
const validatedLinksArr = [
    {
        href: 'https://www.ibm.com/developerworks/ssa/opensource/library/os-nodejs/index.html',
        text: '¿Simplemente qué es Node.js? - IBM Developer Works, 2011',
        file: 'C:\\Users\\melan\\Desktop\\Proyectos Laboratoria\\DEV002-md-links\\files-to-read\\tips.md',
        status: 200,
        ok: 'OK'
    },
    {
        file: 'C:\\Users\\melan\\Desktop\\Proyectos Laboratoria\\DEV002-md-links\\files-to-read\\criterios.md',
        links: ['No links found']
    },
    {
        href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
        text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
        file: 'C:\\Users\\melan\\Desktop\\Proyectos Laboratoria\\DEV002-md-links\\files-to-read\\tips.md',
        status: 'ERROR',
        ok: 'FAIL'
    },
    {
        href: 'http://community.laboratoria',
        text: 'Módulos, librerías',
        file: 'C:\\Users\\melan\\Desktop\\Proyectos Laboratoria\\DEV002-md-links\\files-to-read\\tips.md',
        status: 'ERROR',
        ok: 'FAIL'
    },
];
const statsObject = {
    Total: 3,
    Unique: 2
};

// para getSimpleStats
describe('Test to getSimpleStats()', () => {
    it('Should return an object with total links and unique links', () => {
        const result = getSimpleStats(simpleLinksArr)
        expect(result).toEqual(statsObject)
    })
});

// para getBrokenLinks
describe('Test to getBrokenLinks()', () => {
    it('Should return an array with broken links', () => {
        const result = getBrokenLinks(validatedLinksArr)
        expect(result).toHaveLength(2)
    })
});

// para getCompleteStats
describe('Test to getCompleteStats()', () => {
    it('Should return an object with total links, unique links and broken links', () => {
        const brokenArr = [{ }, { }, { }]
        console.log(brokenArr.length)
        const completeOb = Object.assign({}, statsObject, { Broken: 3 })
        const result = getCompleteStats(statsObject, brokenArr)
        expect(result).toEqual(completeOb)
    })
});