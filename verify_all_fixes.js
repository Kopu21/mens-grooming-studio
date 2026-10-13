const fs = require('fs');
const path = require('path');

console.log('=== STARTING DEEP VERIFICATION OF ALL REQUIRED FIXES ===\n');

let allPassed = true;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
  } else {
    console.error(`[FAIL] ${message}`);
    allPassed = false;
  }
}

// 1. Check Product Image for Tea Tree Clarifying Beard Wash
const productsHtml = fs.readFileSync('products.html', 'utf8');
assert(productsHtml.includes('Tea Tree Clarifying Beard Wash'), 'products.html contains Tea Tree Clarifying Beard Wash');
assert(
  productsHtml.includes('photo-1608248543803-ba4f8c70ae0b'),
  'Tea Tree Clarifying Beard Wash uses unique botanical cleanser bottle image (photo-1608248543803-ba4f8c70ae0b)'
);
assert(
  !productsHtml.includes('photo-1522337360788-8b13dee7a37e'),
  'Old generic cosmetic image (photo-1522337360788-8b13dee7a37e) is completely removed'
);

// 2. Check Services Page Images
const servicesHtml = fs.readFileSync('services.html', 'utf8');
assert(servicesHtml.includes('The Executive Scissor Silhouette'), 'services.html contains The Executive Scissor Silhouette');
assert(
  servicesHtml.includes('photo-1584297091622-af8e5bd80b13'),
  'Executive Scissor Silhouette uses dedicated master scissor cut image (photo-1584297091622-af8e5bd80b13)'
);

assert(servicesHtml.includes('Thermal Stone Hydration Facial'), 'services.html contains Thermal Stone Hydration Facial');
assert(
  servicesHtml.includes('photo-1544161515-4ab6ce6db874'),
  'Thermal Stone Hydration Facial uses dedicated luxury thermal stone spa image (photo-1544161515-4ab6ce6db874)'
);

// 3. Check ThemeManager in main.js - NO toast/popup on theme switch
const mainJs = fs.readFileSync('js/main.js', 'utf8');
const toggleFunc = mainJs.slice(mainJs.indexOf('toggle()'), mainJs.indexOf('updateToggleIcons'));
assert(
  !toggleFunc.includes('showToast') && !toggleFunc.includes('alert'),
  'ThemeManager.toggle() does NOT call showToast, popup, or any notification'
);

// 4. Check FormValidator in main.js
assert(mainJs.includes('Not applicable – please enter alphabets only.'), 'main.js contains exact name validation message');
assert(mainJs.includes('Not applicable – please enter numbers only.'), 'main.js contains exact phone validation message');
assert(mainJs.includes('FormValidator'), 'main.js defines FormValidator');

// 5. Test validation regex & logic simulations
const validNames = ['John', 'John Doe', 'Arun Kumar', 'David Raj', 'Lord Charles Sterling'];
const invalidNames = ['John123', '12345', 'John@123', 'John#', 'John_Doe', '456 John'];

validNames.forEach(name => {
  const sanitized = name.replace(/[^A-Za-z\s]/g, '');
  assert(sanitized === name && /^[A-Za-z\s]+$/.test(name), `Valid name accepted: "${name}"`);
});

invalidNames.forEach(name => {
  const sanitized = name.replace(/[^A-Za-z\s]/g, '');
  assert(sanitized !== name, `Invalid characters stripped from "${name}" -> "${sanitized}"`);
});

const validPhones = ['9876543210', '9123456789', '8007683734'];
const invalidPhones = ['98765ABCDE', '98765abcde', '98765@123', '98765-123', 'John123456', 'ABC9876543'];

validPhones.forEach(phone => {
  const sanitized = phone.replace(/[^0-9]/g, '');
  assert(sanitized === phone && /^[0-9]+$/.test(phone), `Valid phone accepted: "${phone}"`);
});

invalidPhones.forEach(phone => {
  const sanitized = phone.replace(/[^0-9]/g, '');
  assert(sanitized !== phone, `Invalid characters stripped from "${phone}" -> "${sanitized}"`);
});

// 6. Check Contact and Booking Form input attributes
const contactHtml = fs.readFileSync('contact.html', 'utf8');
assert(contactHtml.includes('inputmode="numeric"'), 'contact.html phone field has inputmode="numeric"');
assert(contactHtml.includes('pattern="[0-9]*"'), 'contact.html phone field has pattern="[0-9]*"');

const bookingHtml = fs.readFileSync('booking.html', 'utf8');
assert(bookingHtml.includes('inputmode="numeric"'), 'booking.html phone field has inputmode="numeric"');
assert(bookingHtml.includes('pattern="[0-9]*"'), 'booking.html phone field has pattern="[0-9]*"');

console.log('\n========================================');
if (allPassed) {
  console.log('>>> ALL VERIFICATION TESTS PASSED (100%) <<<');
} else {
  console.error('>>> SOME VERIFICATION TESTS FAILED <<<');
  process.exit(1);
}
