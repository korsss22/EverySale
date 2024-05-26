//getSearchedData.js

async function getSearchedData(connection, product) {
  try {
    console.log("검색어:", product);
    const result = await connection.execute(
      `SELECT * FROM productInfo WHERE category1 = ${product}`
    );
    console.log("쿼리 결과:", result.rows);
    return result.rows;
  } catch (err) {
    console.error("쿼리 실행 중 오류 발생:", err);
    throw err;
  }
}

module.exports = getSearchedData;
