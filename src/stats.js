
// ---- Para las estadísticas --stats

const getStats = (linksArr) => {
    const links = linksArr.map(linkObj => linkObj.href);
    const uniqueLinks = new Set(links);
    return {
        Total: links.length,
        Unique: uniqueLinks.size
    };
};

const getValidationStats = (linksArr) => {
    const links = linksArr.map(linkObj => linkObj.href);
    const uniqueLinks = new Set(links);
    const broken = linksArr.map(linkObj => linkObj.ok !== ok)
    return {
        Total: links.length,
        Unique: uniqueLinks.size,
        Broken: broken
    };
}

