const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');

let idx = 0;
while ((idx = css.indexOf('[data-theme="light"]', idx)) !== -1) {
  console.log(css.substring(idx, idx + 350));
  console.log('-------------------------------------------');
  idx += 20;
}
