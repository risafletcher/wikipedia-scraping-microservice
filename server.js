const express = require('express');
const axios = require('axios');
const app = express();

const { parseText } = require('./parser');

app.get('/', (req, res) =>
    res.send('Hello from App Engine!'));

app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const scrapedResult = await axios.get(`https://en.wikipedia.org/wiki/${searchQuery}`);
    if (scrapedResult.status === 200) {
        res.send(parseText(scrapedResult.data));
    } else {
        //  fallback to wikimedia API
        const wikimediaResult = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/html/${searchQuery}`);
        if (wikimediaResult.status === 200) {
            res.send(parseText(wikimediaResult.data));
        }
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
    console.log(`Server listening on port ${PORT}...`));