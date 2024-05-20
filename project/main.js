//main.js
const run = require('./data');
const express = require('express');
const printData = require('./printData');
const selectPage = require('./selectPage');
const path = require('path');
const app = express();
const PORT = 3000;
let page = 1;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/page', async (req, res) => {
    try {
        const data = await run();
        const page = parseInt(req.query.page) || 1;
        const html = printData(data, page);
        const numNav = selectPage(data, page);
        res.render('footer', { html, numNav });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
