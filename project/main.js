//main.js
const run = require('./data');
const express = require('express');
const printData = require('./printData');
const selectPage = require('./selectPage');
const fetchDataAndSaveToDB = require('./database');
const path = require('path');
const app = express();
const PORT = 3000;
let page = 1;

function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }

let queryList = ['스포츠', '모바일/태블릿', '명품', '패션의류', '뷰티', '유아용', '가전제품', '가구 인테리어', '문구', '도서', '공구 산업용품', '자동차 용품', '게이밍', '음악', '취미', '장식' ];

queryList.forEach(query=> {
    fetchDataAndSaveToDB(query);
    sleep(200);
});


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
