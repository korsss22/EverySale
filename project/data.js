//data.js
const oracledb = require('oracledb');

let connection;

async function run() {
    try {
      // OracleDB에 연결
      connection = await oracledb.getConnection({
        user: "sys",
        password: "1234",
        connectString: "localhost:1521/xe",
        privilege: oracledb.SYSDBA
      });
  
      console.log('Successfully connected to Oracle Database');
  
      // SQL 쿼리 실행 예제
      const result = await connection.execute(
        `SELECT * FROM productInfo WHERE ROWNUM <= 12`
      );
    return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

module.exports = run;
