//connectDB.js
const oracledb = require("oracledb");

async function connectDB() {
  let connection;
  try {
    // OracleDB에 연결
    connection = await oracledb.getConnection({
      user: "sys",
      password: "1234",
      connectString: "localhost:1521/xe",
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
