const axios = require('axios');
const oracledb = require('oracledb');

async function fetchDataAndSaveToDB(query) {
    try {
        // 네이버 API 요청
        const response = await axios.get('https://openapi.naver.com/v1/search/shop', {
            headers: {
                'X-Naver-Client-Id': '3BScfGDn5DZgS5ac84Wq',
                'X-Naver-Client-Secret': 'CXgIgZlFqa'
            },
            params: {
                query: `${query}`,
                display: 100,
                sort: 'sim',
            }
        });

        const connection = await oracledb.getConnection({
            user: "sys",
        password: "1234",
        connectString: "localhost:1521/xe",
        privilege: oracledb.SYSDBA
        });
        // 받은 데이터
        const data = response.data.items;

        // OracleDB 연결
        
        for (let i = 0; i < 100; i++) {
            await connection.execute(`INSERT INTO productInfo (productId, productName, productPrice, imageLink, dataLink, category1, category2, category3, category4, hprice) VALUES ('${data[i].productId}', '${data[i].title}', '${data[i].lprice}', '${data[i].image}', '${data[i].link}', '${data[i].category1}', '${data[i].category2}', '${data[i].category3}', '${data[i].category4}', '${data[i].hprice}')`);
        }
        await connection.execute('COMMIT');
        // 연결 종료
        await connection.close();

        console.log('Data inserted successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}

// 함수 호출
module.exports = fetchDataAndSaveToDB;
