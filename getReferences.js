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

module.exports = getReferences;