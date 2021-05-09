const axios = require('axios');

const WIKIPEDIA_API_BASE_URL = 'http://en.wikipedia.org/w/api.php?';

const getReferences = async ({ title, pageid }, limit = 5) => {
    const wikiResponse = await axios.get(WIKIPEDIA_API_BASE_URL, {
        params: {
            action: 'query',
            prop: 'extlinks',
            ellimit: limit,
            titles: title,
            format: 'json',
        },
    });
    const extLinks = wikiResponse.data.query.pages[pageid].extlinks;
    return Array.isArray(extLinks) ? extLinks.map((link) => link['*']) : null;
};

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
        references: await getReferences(page),
        url: page.fullurl,
    }
};

module.exports = {
    generateReferencesResult,
    generateSummaryResult,
    generateSearchResult
};

