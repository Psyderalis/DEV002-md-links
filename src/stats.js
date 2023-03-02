
// ---- Para las estadísticas --stats
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
const getSimpleStats = (linksArr) => {
    const onlyLinks = linksArr.filter(linkObj => linkObj.href)
    const links = onlyLinks.map(linkObj => linkObj.href);
    const uniqueLinks = new Set(links);
    return {
        Total: links.length,
        Unique: uniqueLinks.size
    };
};

const getBrokenLinks = (validatedLinksArr) => {
    const broken = validatedLinksArr.filter(linkObj => linkObj.ok === 'FAIL')
    return broken
};

const getCompleteStats = (stats, brokenLinks) => {
    const obj1 = stats;
    const obj2 = { Broken: brokenLinks.length }
    return Object.assign({}, obj1, obj2)
};

module.exports = { 
    getSimpleStats,
    getBrokenLinks,
    getCompleteStats
 }

