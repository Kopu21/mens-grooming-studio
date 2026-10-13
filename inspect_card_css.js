const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');

function findCss(selector) {
  let idx = 0;
  console.log(`\n=== CSS FOR: ${selector} ===`);
  while ((idx = css.indexOf(selector, idx)) !== -1) {
    console.log(css.substring(idx, idx + 400));
    console.log('-------------------------------');
    idx += selector.length;
  }
}

findCss('.product-card');
findCss('.product-body');
findCss('.product-price-row');
findCss('.product-footer');
