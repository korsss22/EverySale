//main.js
const express = require("express");
const path = require("path");
const { connectDB, disconnectDB } = require("./connectDB");
//const getMainPageData = require("./getMainPageData");
//const getSearchedData = require("./getSearchedData");
const { sleep, handleRequest } = require("./handleRequest");
const getData = require("./getData");
const { updateTable } = require("./database");
const app = express();
const PORT = 3000;

async function main() {
  let connection;
  connection = await connectDB();

  updateTable(connection);
}

//main(); //main함수!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const defaultUrl = "localhost:3000/";

// 미들웨어: 도메인에 접속하면 기본 URL로 리다이렉트
// app.use((req, res, next) => {
//     const host = req.get('host');
//     if (host !== defaultUrl) {
//         // 현재 도메인이 기본 URL과 다를 때 리다이렉트
//         return res.redirect(defaultUrl + req.originalUrl);
//     }
//     next();
// });

app.use(express.static(path.join(__dirname, "public")));

// /search 경로 핸들러
app.get("/", async (req, res) => {
  console.log("검색 요청 수신:", req.query.product);
  await handleRequest(req, res, async (connection, req) => {
    const category1 = req.query.category1;
    const category2 = req.query.category2;
    const category3 = req.query.category3;
    const product = req.query.product;
    const sort = req.query.sort;
    const data = await getData(
      connection,
      category1,
      category2,
      category3,
      product,
      sort
    );
    console.log("검색된 데이터:", data);
    return data;
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
