//handleRequest.js
const printData = require("./printData");
const selectPage = require("./selectPage");
const { connectDB, disconnectDB } = require("./connectDB");

    async function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    /**
     * 
     * @param {*} req 요청
     * @param {*} res 응답
     * @param {*} func 실행할 함수
     */
    async function handleRequest(req, res, func) {
        let connection;
        try {
        connection = await connectDB(); // 연결 생성
        console.log("DB 연결 성공");
        const data = await func(connection, req); // 매개변수로 받은 getData 함수 호출
        console.log("가져온 데이터:", data);
        let page = parseInt(req.query.page) || 1;
        const html = printData(data, page);
        const category1 = req.query.category1;
        const category2 = req.query.category2;
        const category3 = req.query.category3;
        const product = req.query.product;
        const sort = req.query.sort;
        const numNav = selectPage(data, page, req, category1, category2, category3, product, sort);
        res.render("footer", { html, numNav });
        } catch (error) {
        console.error("요청 처리 중 오류 발생:", error);
        res.status(500).send("Internal Server Error");
        } finally {
        await disconnectDB(connection); // 요청 처리 후 연결 종료
        console.log("DB 연결 종료");
        }
    }

module.exports = {sleep, handleRequest};