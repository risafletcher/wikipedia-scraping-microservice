const jsdom = require('jsdom');
const { JSDOM } = jsdom;

function parseText(data) {
    const { window: { document } } = new JSDOM(data);
    const paragraphs = [];
    document.querySelectorAll('p').forEach((paragraph) => paragraphs.push(paragraph.textContent));
    return { paragraphs };
}

module.exports = {
    parseText
};

