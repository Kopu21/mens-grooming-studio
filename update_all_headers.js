const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = [
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

function getHeaderMarkup(activePage) {
  return `  <!-- Main Navigation Bar -->
  <header class="navbar-main">
    <div class="container nav-container">
      <!-- LEFT SIDE: New Professional Logo & Brand Name (Clickable to Home) -->
      <a href="index.html" class="brand-logo" aria-label="Sovereign & Co. Home">
        <div class="brand-crest-svg">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
            <path d="M24 3L42 10V22C42 33 24 45 24 45C24 45 6 33 6 22V10L24 3Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
            <path d="M15 17L33 31M33 17L15 31" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
            <circle cx="24" cy="24" r="3.5" fill="currentColor"/>
            <path d="M24 9V14M24 34V39" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="brand-text">
          <span class="brand-title">SOVEREIGN &amp; CO.</span>
          <span class="brand-subtitle">BARBERS &amp; BEARD ATELIER</span>
        </div>
      </a>

      <!-- CENTER NAVIGATION (Exact Order: Home [Home 1, Home 2], About Us, Services [Haircuts, Beard Trims, Beard Styling, Hair Styling, Shaving, Grooming Packages], Products, Contact) -->
      <nav class="nav-links-wrapper">
        <ul class="nav-menu">
          <li class="nav-item-dropdown">
            <a href="index.html" class="nav-link ${activePage === 'index.html' || activePage === 'home-1.html' || activePage === 'home-2.html' ? 'active' : ''}">Home <i class="fas fa-chevron-down nav-caret"></i></a>
            <ul class="dropdown-menu">
              <li><a href="index.html">Home</a></li>
              <li><a href="home-1.html">Home 1</a></li>
              <li><a href="home-2.html">Home 2</a></li>
            </ul>
          </li>
          <li><a href="about.html" class="nav-link ${activePage === 'about.html' ? 'active' : ''}">About Us</a></li>
          <li class="nav-item-dropdown">
            <a href="services.html" class="nav-link ${activePage === 'services.html' ? 'active' : ''}">Services <i class="fas fa-chevron-down nav-caret"></i></a>
            <ul class="dropdown-menu">
              <li><a href="services.html#haircuts">Haircuts</a></li>
              <li><a href="services.html#beard-trims">Beard Trims</a></li>
              <li><a href="services.html#beard-styling">Beard Styling</a></li>
              <li><a href="services.html#hair-styling">Hair Styling</a></li>
              <li><a href="services.html#shaving">Shaving</a></li>
              <li><a href="services.html#grooming-packages">Grooming Packages</a></li>
            </ul>
          </li>
          <li><a href="products.html" class="nav-link ${activePage === 'products.html' ? 'active' : ''}">Products</a></li>
          <li><a href="contact.html" class="nav-link ${activePage === 'contact.html' ? 'active' : ''}">Contact</a></li>
        </ul>
      </nav>

      <!-- RIGHT SIDE: RTL / LTR toggle -> Dark Theme / Light Theme toggle -> Cart -> Book Chair -> Hamburger -->
      <div class="nav-actions">
        <button class="nav-control-btn dir-toggle-btn" title="Toggle RTL/LTR Direction" aria-label="Toggle Direction">
          <i class="fas fa-globe"></i> <span>RTL</span>
        </button>
        <button class="nav-control-btn theme-toggle-btn" title="Toggle Theme" aria-label="Toggle Dark/Light Theme">
          <i class="fas fa-sun text-gold"></i>
        </button>
        <button class="nav-control-btn cart-toggle-btn" aria-label="Open Shopping Satchel">
          <i class="fas fa-shopping-bag"></i>
          <span class="cart-badge-count">1</span>
        </button>
        <a href="booking.html" class="btn btn-primary btn-sm book-chair-nav-btn">Book Chair</a>
        <button class="mobile-menu-toggle" aria-label="Toggle Navigation Menu">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>
  </header>`;
}

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace <header class="navbar-main"> ... </header>
  const headerRegex = /<!-- Main Navigation Bar[\s\S]*?<\/header>/i;
  if (headerRegex.test(content)) {
    content = content.replace(headerRegex, getHeaderMarkup(file));
  } else {
    // try replacing generic <header class="navbar-main"> ... </header>
    const genericHeaderRegex = /<header class="navbar-main">[\s\S]*?<\/header>/i;
    if (genericHeaderRegex.test(content)) {
      content = content.replace(genericHeaderRegex, getHeaderMarkup(file));
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated header in ${file}`);
});
