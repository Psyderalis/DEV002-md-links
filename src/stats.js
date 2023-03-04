
// ---- Para las estadísticas --stats

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

