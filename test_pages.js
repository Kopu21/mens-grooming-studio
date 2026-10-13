const fs = require('fs');
const path = require('path');

const pages = [
  'index.html',
  'home-1.html',
  'home-2.html',
  'about.html',
  'services.html',
  'products.html',
  'contact.html',
  'beard-care.html',
  'gallery.html',
  'booking.html',
  'packages.html',
  'journal.html',
  'faq.html'
];

function testPage(page) {
  const filePath = path.join(__dirname, page);
  if (!fs.existsSync(filePath)) {
    console.log(`[FAIL] ${page.padEnd(16)} File not found!`);
    return false;
  }

  const data = fs.readFileSync(filePath, 'utf8');

  // 1. Left side brand logo with link to index.html
  const hasBrandLogo = data.includes('class="brand-logo"') && data.includes('href="index.html"');
  const hasBrandCrest = data.includes('brand-crest-svg');

  // 2. Center nav items & dropdowns
  const hasHomeDropdown = data.includes('href="home-1.html"') && data.includes('href="home-2.html"');
  const hasAbout = data.includes('href="about.html"');
  const hasServicesDropdown = data.includes('href="services.html#haircuts"') && 
                              data.includes('href="services.html#beard-trims"') &&
                              data.includes('href="services.html#shaving"') &&
                              data.includes('href="services.html#grooming-packages"');
  const hasProducts = data.includes('href="products.html"');
  const hasContact = data.includes('href="contact.html"');

  // 3. Right side controls
  const hasRtlToggle = data.includes('dir-toggle-btn');
  const hasThemeToggle = data.includes('theme-toggle-btn');

  // 4. Footer brand link
  const hasFooterBrandLink = data.includes('class="footer-brand-link"') && data.includes('href="index.html"');

  let passed = hasBrandLogo &&
               hasBrandCrest &&
               hasHomeDropdown &&
               hasAbout &&
               hasServicesDropdown &&
               hasProducts &&
               hasContact &&
               hasRtlToggle &&
               hasThemeToggle &&
               hasFooterBrandLink;

  // Specific check for services.html anchors
  if (page === 'services.html') {
    const hasHaircutsAnchor = data.includes('id="haircuts"');
    const hasHairStylingAnchor = data.includes('id="hair-styling"');
    const hasBeardTrimsAnchor = data.includes('id="beard-trims"');
    const hasBeardStylingAnchor = data.includes('id="beard-styling"');
    const hasShavingAnchor = data.includes('id="shaving"');
    const hasGroomingPackagesAnchor = data.includes('id="grooming-packages"');
    if (!hasHaircutsAnchor || !hasHairStylingAnchor || !hasBeardTrimsAnchor || !hasBeardStylingAnchor || !hasShavingAnchor || !hasGroomingPackagesAnchor) {
      passed = false;
      console.log(`[ERR] Missing anchor targets in services.html!`);
    }
  }

  console.log(`[${passed ? 'PASS' : 'FAIL'}] ${page.padEnd(16)} | Brand: ${hasBrandLogo} | Crest: ${hasBrandCrest} | NavCenter: ${hasHomeDropdown && hasServicesDropdown} | RTL/Theme: ${hasRtlToggle && hasThemeToggle} | FooterLink: ${hasFooterBrandLink}`);
  return passed;
}

function run() {
  console.log('--- STARTING VERIFICATION AUDIT OF ALL 13 STUDIO PAGES ---');
  let allPass = true;
  for (const p of pages) {
    const ok = testPage(p);
    if (!ok) allPass = false;
  }
  console.log(`--- AUDIT RESULT: ${allPass ? 'ALL TESTS PASSED 100%' : 'SOME TESTS FAILED'} ---`);
  process.exit(allPass ? 0 : 1);
}

run();
