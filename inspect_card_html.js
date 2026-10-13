const fs = require('fs');

function inspectCards(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  console.log(`\n================ ${filename} ================`);
  const cards = content.split(/class="product-card/);
  console.log(`Found ${cards.length - 1} product cards.`);
  if (cards.length > 1) {
    console.log('Sample card structure:');
    console.log('<div class="product-card' + cards[1].substring(0, 600));
  }
}

inspectCards('index.html');
inspectCards('home-1.html');
inspectCards('home-2.html');
inspectCards('products.html');
