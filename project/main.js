//main.js
const express = require("express");
const path = require("path");
const { connectDB, disconnectDB } = require("./connectDB");
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

//main(); //main함수 데이터 읽어와서 DB에 데이터 저장까지 약 287초 걸림

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

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
