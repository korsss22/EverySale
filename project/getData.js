/**
 * 
 * @param {*} connection DB 연결
 * @param {*} category1 카테고리1
 * @param {*} category2 카테고리2
 * @param {*} category3 카테고리3
 * @param {*} product 검색어
 * @param {*} sort 정렬방식
 * @returns DB 데이터
 */
async function getData(connection, category1, category2, category3, product, sort) {
    let query = "SELECT * FROM productInfo WHERE 1=1";
    const params = {};

    if (category1) {
        query += " AND category1 = :category1";
        params.category1 = category1;
        console.log("쿼리 추가1");
    }
    if (category2) {
        query += " AND category2 = :category2";
        params.category2 = category2;
        console.log("쿼리 추가2");
    }
    if (category3) {
        query += " AND category3 = :category3";
        params.category3 = category3;
        console.log("쿼리 추가3");
    }
    if (product) {
        query += " AND productName LIKE :product";
        params.product = `%${product}%`;
        console.log("쿼리 추가4" , query);
    }
    if (sort) {
        query += ` ORDER BY productPrice ${sort}`;
        console.log("쿼리 추가5:", query);
    }
    
    try {
        const result = await connection.execute(query, params);
        console.log("쿼리 결과:", result.rows);
        return result.rows;
    } catch (err) {
        console.error("쿼리 실행 중 오류 발생:", err);
        throw err;
    }
}

module.exports = getData;
