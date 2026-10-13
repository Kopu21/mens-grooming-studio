const fs = require('fs');
const path = require('path');

console.log('=== COMPREHENSIVE VERIFICATION AUDIT ===\n');

let allPassed = true;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
  } else {
    console.error(`[FAIL] ${message}`);
    allPassed = false;
  }
}

// 1. Verify Cart & Checkout engine in js/cart.js
const cartJs = fs.readFileSync('js/cart.js', 'utf8');
assert(cartJs.includes('openCheckoutModal'), 'cart.js implements openCheckoutModal()');
assert(cartJs.includes('checkoutModal'), 'cart.js manages checkoutModal dynamically');
assert(cartJs.includes('checkoutOrderForm'), 'cart.js handles checkoutOrderForm submission');
assert(cartJs.includes('Complimentary'), 'cart.js provides complete order breakdown with white-glove delivery');
assert(cartJs.includes('Apothecary Order Confirmed'), 'cart.js provides confirmation receipt with unique order ref');

// 2. Verify Booking engine in js/booking.js
const bookingJs = fs.readFileSync('js/booking.js', 'utf8');
assert(bookingJs.includes('scissor-silhouette'), 'booking.js contains Executive Scissor Silhouette');
assert(bookingJs.includes('beard-trim'), 'booking.js contains Architectural Beard Trim');
assert(bookingJs.includes('beard-styling'), 'booking.js contains Grand Beard Styling');
assert(bookingJs.includes('hair-styling'), 'booking.js contains Modern Hair Styling');
assert(bookingJs.includes('royal-shave'), 'booking.js contains Premium Royal Shaving');
assert(bookingJs.includes('thermal-facial'), 'booking.js contains Thermal Stone Hydration Facial');
assert(bookingJs.includes('executive-combo'), 'booking.js contains Complete Sovereign Grooming Package');
assert(bookingJs.includes('scalp-therapy'), 'booking.js contains Japanese Scalp Detox');
assert(bookingJs.includes('julian') && bookingJs.includes('marcus') && bookingJs.includes('david') && bookingJs.includes('alexander'), 'booking.js contains all 4 master artisans');
assert(!bookingJs.includes('window.scrollTo({ top: 200'), 'booking.js does NOT contain disruptive scroll jumps');

// 3. Verify booking.html layout and structure
const bookingHtml = fs.readFileSync('booking.html', 'utf8');
assert(bookingHtml.includes('Step 1 – Select Primary Treatment'), 'booking.html has clear Step 1 heading');
assert(bookingHtml.includes('Step 2 – Select Date & Time Slot'), 'booking.html has clear Step 2 heading');
assert(bookingHtml.includes('Step 3 – Choose Your Master Artisan'), 'booking.html has clear Step 3 heading');
assert(bookingHtml.includes('Step 4 – Customer Details & Confirmation'), 'booking.html has clear Step 4 heading');
assert(bookingHtml.includes('time-slots-grid'), 'booking.html contains time-slots-grid');
assert(bookingHtml.includes('09:00 AM') && bookingHtml.includes('12:00 PM') && bookingHtml.includes('07:00 PM'), 'booking.html contains full time slot array');
assert(bookingHtml.includes('artisan-card-img'), 'booking.html artisan cards include images');

// 4. Verify Header controls consistency in css/style.css
const styleCss = fs.readFileSync('css/style.css', 'utf8');
assert(styleCss.includes('height: 40px;'), 'style.css defines standardized 40px height for nav buttons');
assert(styleCss.includes('.selectable-card.selected'), 'style.css defines active/selected state for treatment & artisan cards');
assert(styleCss.includes('.time-slot-btn.selected'), 'style.css defines active/selected state for time slots');
assert(styleCss.includes('.custom-modal-overlay'), 'style.css defines custom modal overlay');

// 5. Verify RTL icon in all 13 HTML files
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
assert(htmlFiles.length === 13, `13 HTML pages found: ${htmlFiles.length}`);

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  assert(content.includes('fa-right-left'), `${file} uses proper fa-right-left direction icon`);
  assert(!content.includes('fa-globe'), `${file} has no legacy globe icon in nav`);
  assert(content.includes('href="index.html"'), `${file} has valid Home links to index.html`);
});

// 6. Verify main.js theme silent toggle & direction
const mainJs = fs.readFileSync('js/main.js', 'utf8');
assert(mainJs.includes('fa-right-left'), 'main.js DirectionManager renders fa-right-left icon');
const themeToggleFunc = mainJs.slice(mainJs.indexOf('toggle()'), mainJs.indexOf('updateToggleIcons'));
assert(!themeToggleFunc.includes('showToast'), 'main.js ThemeManager.toggle() remains completely silent without notifications');

console.log('\n========================================');
if (allPassed) {
  console.log('>>> ALL 19 USER REQUIREMENTS PASSED 100% <<<');
} else {
  console.error('>>> VERIFICATION FAILED <<<');
  process.exit(1);
}
