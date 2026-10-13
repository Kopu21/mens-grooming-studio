const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(__dirname, file), 'utf8');
  let updated = false;
  if (content.includes('fa-globe')) {
    content = content.replace(/<i class="fas fa-globe"><\/i>\s*<span>RTL<\/span>/g, '<i class="fas fa-right-left"></i> <span>RTL</span>');
    content = content.replace(/<i class="fas fa-globe"><\/i>\s*<span>LTR<\/span>/g, '<i class="fas fa-right-left"></i> <span>LTR</span>');
    fs.writeFileSync(path.join(__dirname, file), content, 'utf8');
    updated = true;
    console.log(`Updated RTL icon in ${file}`);
  }
});
