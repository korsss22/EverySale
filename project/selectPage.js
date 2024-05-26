// selectPage.js 파일 수정

function selectPage(data, page, currentPath) {
  const itemsPerPage = 12;
  const productNum = data.length;
  let html = '<div class="numberContainer">';
  html += '<ul class="number">';

  let maxPage = Math.ceil(productNum / itemsPerPage);
  let startIndex = Math.max(1, page - 2);
  let endIndex = Math.min(maxPage, startIndex + 4);

  // 이전 페이지 링크 생성
  if (page > 1) {
    html += `<a href="&page=${page - 1}"><</a>`;
  }

  // 페이지 링크 생성
  for (let i = startIndex; i <= endIndex; i++) {
    html += `<a href="&page=${i}" ${
      i === page ? 'style="background-color:red;"' : ""
    }>${i}</a>`;
  }

  // 다음 페이지 링크 생성
  if (page < maxPage) {
    html += `<a href="&page=${page + 1}">></a>`;
  }

  // HTML 마무리
  html += "</ul>";
  html += "</div>";

  // 반환
  return html;
}

module.exports = selectPage;
