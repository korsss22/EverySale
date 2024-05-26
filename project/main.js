//main.js

const express = require("express");
const path = require("path");
const { connectDB, disconnectDB } = require("./connectDB");
const getMainPageData = require("./getMainPageData");
const fetchDataAndSaveToDB = require("./database");
const getSearchedData = require("./getSearchedData");
const printData = require("./printData");
const selectPage = require("./selectPage");
const app = express();
const PORT = 3000;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function handleRequest(req, res, func) {
  let connection;
  try {
    connection = await connectDB(); // 연결 생성
    console.log("DB 연결 성공");
    const data = await func(connection, req); // 매개변수로 받은 getData 함수 호출
    console.log("가져온 데이터:", data);
    const page = parseInt(req.query.page) || 1;
    const html = printData(data, page);
    const numNav = selectPage(data, page, res.locals.currentPath);
    res.render("footer", { html, numNav });
  } catch (error) {
    console.error("요청 처리 중 오류 발생:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await disconnectDB(connection); // 요청 처리 후 연결 종료
    console.log("DB 연결 종료");
  }
}

const queryList = [
  "스포츠",
  "모바일/태블릿",
  "명품",
  "패션의류",
  "뷰티",
  "유아용",
  "가전제품",
  "가구 인테리어",
  "문구",
  "도서",
  "공구 산업용품",
  "자동차 용품",
  "게이밍",
  "음악",
  "취미",
  "장식",
];

async function main() {
  let connection;
  try {
    connection = await connectDB();
    for (const query of queryList) {
      await fetchDataAndSaveToDB(connection, query);
      await sleep(3000); // 3초 대기 API 요청 속도 규정에 따르기 위함.
    }
  } catch (error) {
    console.error(error);
  } finally {
    await disconnectDB(connection);
  }
}
//main(); //main함수!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  await handleRequest(req, res, getMainPageData); // 매개변수에 함수 전달
});

// /search 경로 핸들러
app.get("/search", async (req, res) => {
  console.log("검색 요청 수신:", req.query.search);
  await handleRequest(req, res, async (connection, req) => {
    const searchString = req.query.search;
    const data = await getSearchedData(connection, searchString);
    console.log("검색된 데이터:", data);
    return data;
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
