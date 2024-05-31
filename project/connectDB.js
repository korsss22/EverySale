//connectDB.js
const oracledb = require("oracledb");

async function connectDB() {
  let connection;
  try {
    // OracleDB에 연결
    connection = await oracledb.getConnection({
      user: "sys", //오라클 DB ID
      password: "1234", //오라클 설치할때 PASSWORD
      connectString: "localhost:1521/xe", //포트 : 1521 SID : xe
      privilege: oracledb.SYSDBA,
    });

    console.log("Successfully connected to Oracle Database");
    return connection;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function disconnectDB(connection) {
  if (connection) {
    try {
      await connection.close();
      console.log("Successfully disconnected from Oracle Database");
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = { connectDB, disconnectDB };
