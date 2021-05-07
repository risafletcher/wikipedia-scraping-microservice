const getReferences = require('./getReferences');

const generateReferencesResult = async (page = {}, limit) => ({
    id: page.pageid,
    title: page.title,
    references: await getReferences(page, limit),
    language: page.pagelanguage,
});

const generateSummaryResult = async (page = {}) => {
    const summary = await page.summary();
    return {
        id: page.pageid,
        title: page.title,
        summary: summary.extract,
        language: page.pagelanguage,
    }
};

const generateSearchResult = async (page = {}) => {
    const summary = await page.summary();
    return {
        id: page.pageid,
        title: page.title,
        intro: await page.intro(),
        summary: summary.extract,
        content: await page.content(),
        language: page.pagelanguage,
        languageDir: page.pagelanguagedir,
        references: await getReferences(page, limit),
        url: page.fullurl,
    }
};

module.exports = {
    generateReferencesResult,
    generateSummaryResult,
    generateSearchResult
};

