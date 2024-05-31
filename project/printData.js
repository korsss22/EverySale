//printData.js
function printData(data, page) {
  const maxPrintRow = 3;
  const maxPrintCol = 4;
  const itemsPerPage = 12;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  let html = '<div class="section">';
  let row = 0;
  let col = 0;

  for (let i = startIndex; i < endIndex; i++) {
    const productData = data[i];

    if (!productData) break;

    const productId = productData[0];
    const productName = productData[1];
    const productPrice = productData[2];
    const productPriceFormatted = productPrice.toLocaleString();

    const imageLink = productData[3];
    const dataLink = productData[4];

    if (col % maxPrintCol === 0) {
      if (col !== 0) {
        html += "</div>";
      }
      html += '<div class="imageContainer">';
      row++;
      col = 0;
    }

    html += `
            <a href="https://search.shopping.naver.com/catalog/${productId}">
                <div class="item" style="background-image: url(${imageLink}");">
                    <div class="itemInfo"><b>${productName}</b></div>
                    <div class="itemPrice"><b>최저</b>
                        <div class="Price">
                        ${productPriceFormatted}
                        </div>
                        <b>원</b>
                    </div>
                </div>
            </a>
        `;
    col++;
  }

  html += "</div>"; 
  return html;
}
module.exports = printData;
