const fs = require('fs');
const prod = fs.readFileSync('products.html', 'utf8');

function showContext(term) {
  let idx = 0;
  console.log(`\n================== TERM: "${term}" ==================`);
  while ((idx = prod.indexOf(term, idx)) !== -1) {
    const start = Math.max(0, idx - 200);
    const end = Math.min(prod.length, idx + 400);
    console.log('--- AT INDEX ' + idx + ' ---');
    console.log(prod.substring(start, end));
    idx += term.length;
  }
}

showContext('Signature Elixir');
showContext('Tea Tree');
showContext('Texturizing Mineral Clay');
showContext('Icelandic');
