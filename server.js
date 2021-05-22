const express = require('express');
const cors = require('cors');
const wiki = require('wikipedia');
const app = express();
app.use(cors());
const {
    generateReferencesResult,
    generateSummaryResult,
    generateSearchResult,
} = require('./formatters');

app.get('/', (req, res) =>
    res.send('Hello, world!'));

app.get('/search/:searchQuery/summary', async (req, res, next) => {
    const { searchQuery } = req.params;
    try {
        const page = await wiki.page(searchQuery, { redirect: true });
        const summaryResult = await generateSummaryResult(page);
        res.send(summaryResult);
    } catch (error) {
        next(error);
    }
});

app.get('/search/:searchQuery/references', async (req, res, next) => {
    const { searchQuery } = req.params;
    const { limit = 5 } = req.query;
    try {
        const page = await wiki.page(searchQuery, { redirect: true });
        const referencesResult = await generateReferencesResult(page, limit);
        res.send(referencesResult);
    } catch (error) {
        next(error);
    }
});
    
app.get('/search/:searchQuery', async (req, res, next) => {
    const { searchQuery } = req.params;
    try {
        const page = await wiki.page(searchQuery, { redirect: true });
        const searchResult = await generateSearchResult(page);
        res.send(searchResult);
    } catch (error) {
        next(error);
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
    console.log(`Server listening on port ${PORT}...`));