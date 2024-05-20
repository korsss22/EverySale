function selectPage(data, page) {
    const itemsPerPage = 12;
    let maxPage = 5; // 한 페이지 네비에 표시될 최대 페이지 수
    let startIndex = (Math.floor((page - 1) / maxPage) * maxPage) + 1; // 시작 페이지 번호
    let endIndex = startIndex + maxPage - 1; // 끝 페이지 번호
    const productNum = data.length;
    let html = '<div class="numberContainer">';
    html += '<ul class="number">';
    
    //이전 페이지 링크 생성
        

    // 페이지 링크 생성
    
    for (let i = startIndex; i <= endIndex; i++) {
        if (i === startIndex && i !== 1) {
            html += `<a href="?page=${startIndex-maxPage}"><</a>`;
        }
        html += `<a href="?page=${i}" ${i === page ? 'style="background-color:red;"' : ''}>${i}</a>`;
        if (i === Math.ceil(productNum / itemsPerPage)) break;
        if (i === endIndex) {
            html += `<a href="?page=${i + 1}">></a>`;
        }
    }
    

    // 다음 페이지 링크 생성
    
    
    // HTML 마무리
    html += '</ul>';
    html += '</div>';

    // 반환
    return html;
}
module.exports = selectPage;

/*
<div class="numberContainer">
        <ul class="number">
          <a href="/page"><</a>
          <a href="/page">1</a>
          <a href="/page1">2</a>
          <a href="/page1">3</a>
          <a href="/page1">4</a>
          <a href="/page1">5</a>
          <a href="/page1">></a>
        </ul>
      </div>
    </div>
*/