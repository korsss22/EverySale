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

    let urlParams = '';
    if (category1) urlParams += `&category1=${category1}`;
    if (category2) urlParams += `&category2=${category2}`;
    if (category3) urlParams += `&category3=${category3}`;
    if (product) urlParams += `&product=${product}`;
    if (sort) urlParams += `&sort=${sort}`;
    
    if (page > 1) {
        html += `<a href="?page=${page - 1}${urlParams}"><</a>`;
    }

    for (let i = startIndex; i <= endIndex; i++) {
        html += `<a href="?page=${i}${urlParams}" ${
            i === page ? 'style="background-color:red;"' : ""
        }>${i}</a>`;
    }

    if (page < maxPage) {
        html += `<a href="?page=${page + 1}${urlParams}">></a>`;
    }

    html += "</ul>";
    html += "</div>";

    return html;
}

module.exports = selectPage;
