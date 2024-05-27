//selectPage.js


/**
 * 
 * @param {*} data DB 데이터
 * @param {*} page 페이지 값
 * @param {*} req 요청
 * @param {*} category1 카테고리1
 * @param {*} category2 카테고리2
 * @param {*} category3 카테고리3
 * @param {*} product 검색어
 * @param {*} sort 정렬방식
 * @returns 
 */
function selectPage(data, page, req, category1, category2, category3, product, sort) {
    const itemsPerPage = 12;
    const productNum = data.length;
    let html = '<div class="numberContainer">';
    html += '<ul class="number">';

    let maxPage = Math.ceil(productNum / itemsPerPage);
    let startIndex = Math.max(1, page - 2);
    let endIndex = Math.min(maxPage, startIndex + 4);

    // URL 파라미터 생성
    let urlParams = '';
    if (category1) urlParams += `&category1=${category1}`;
    if (category2) urlParams += `&category2=${category2}`;
    if (category3) urlParams += `&category3=${category3}`;
    if (product) urlParams += `&product=${product}`;
    if (sort) urlParams += `&sort=${sort}`;
    
    // 이전 페이지 링크 생성
    if (page > 1) {
        html += `<a href="?page=${page - 1}${urlParams}"><</a>`;
    }

    // 페이지 링크 생성
    for (let i = startIndex; i <= endIndex; i++) {
        html += `<a href="?page=${i}${urlParams}" ${
            i === page ? 'style="background-color:red;"' : ""
        }>${i}</a>`;
    }

    // 다음 페이지 링크 생성
    if (page < maxPage) {
        html += `<a href="?page=${page + 1}${urlParams}">></a>`;
    }

    // HTML 마무리
    html += "</ul>";
    html += "</div>";

    // 반환
    return html;
}

module.exports = selectPage;
