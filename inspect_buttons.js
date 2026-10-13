const fs = require('fs');

function inspectButtons(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  console.log(`\n================ ${filename} Buttons ================`);
  const cards = content.split(/class="product-card/);
  cards.slice(1).forEach((c, idx) => {
    const titleMatch = c.match(/<h3[^>]*>([^<]+)<\/h3>/);
    const title = titleMatch ? titleMatch[1].trim() : 'Unknown';
    // find footer or button
    const footerMatch = c.match(/<(div class="product-price-row|div class="product-footer)[\s\S]*?<\/div>\s*<\/div>/);
    console.log(`Card ${idx+1} [${title}]:\n` + (footerMatch ? footerMatch[0] : 'No footer match'));
  });
}

inspectButtons('index.html');
inspectButtons('home-1.html');
inspectButtons('home-2.html');
inspectButtons('products.html');
