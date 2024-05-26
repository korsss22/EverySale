//database.js

const axios = require("axios");

async function fetchDataAndSaveToDB(connection, query) {
  try {
    // 네이버 API 요청
    const response = await axios.get(
      "https://openapi.naver.com/v1/search/shop",
      {
        headers: {
          "X-Naver-Client-Id": "3BScfGDn5DZgS5ac84Wq",
          "X-Naver-Client-Secret": "CXgIgZlFqa",
        },
        params: {
          query: `${query}`,
          display: 100,
          sort: "sim",
        },
      }
    );
    console.log(query + " data is collected...");

    // 받은 데이터
    const data = response.data.items;

    // OracleDB에 데이터 삽입
    for (let i = 0; i < data.length; i++) {
      await connection.execute(
        `INSERT INTO productInfo (productId, productName, productPrice, imageLink, dataLink, category1, category2, category3, category4, hprice) VALUES (:productId, :productName, :productPrice, :imageLink, :dataLink, :category1, :category2, :category3, :category4, :hprice)`,
        {
          productId: data[i].productId,
          productName: data[i].title,
          productPrice: data[i].lprice,
          imageLink: data[i].image,
          dataLink: data[i].link,
          category1: data[i].category1,
          category2: data[i].category2,
          category3: data[i].category3,
          category4: data[i].category4,
          hprice: data[i].hprice,
        },
        { autoCommit: true }
      );
    }

    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = fetchDataAndSaveToDB;
