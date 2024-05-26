//getMainPageData.js

async function getMainPageData(connection) {
  try {
    const result = await connection.execute(`SELECT * FROM productInfo`);
    return result.rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = getMainPageData;
