const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasCartDrawer = content.includes('cartDrawer');
  const hasCheckoutModal = content.includes('checkoutModal');
  const hasCartScript = content.includes('js/cart.js');
  console.log(`${f}: cartDrawer=${hasCartDrawer}, checkoutModal=${hasCheckoutModal}, cartScript=${hasCartScript}`);
});
