const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const hasIndexLink = content.includes('href="index.html"');
  const brandHref = content.match(/class="brand-logo"[^>]*href="([^"]+)"/)?.[1];
  const navHomeHref = content.match(/<a[^>]*class="nav-link[^"]*"[^>]*>Home/)?.[0];
  console.log(`${file}: brandHref=${brandHref}, navHome=${navHomeHref}`);
});
