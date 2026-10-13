/* ==========================================================================
   SOVEREIGN & CO. - Main Interactive JavaScript
   Includes Left RTL/LTR Toggle, Silent Theme Manager, Form Validation, Mobile Nav & Fallbacks
   ========================================================================== */

// 1. Theme Manager (Dark / Light) - Silent switching with NO notifications/popups
const ThemeManager = {
  themeKey: 'sovereign_theme',
  
  init() {
    const savedTheme = localStorage.getItem(this.themeKey) || 'dark';
    this.setTheme(savedTheme);
    this.bindEvents();
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.themeKey, theme);
    this.updateToggleIcons(theme);
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    // Theme switches silently - NO toast, NO popup, NO alert
  },

  updateToggleIcons(theme) {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.innerHTML = theme === 'dark' 
        ? '<i class="fas fa-sun text-gold"></i>' 
        : '<i class="fas fa-moon text-gold"></i>';
      btn.setAttribute('title', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
    });
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.theme-toggle-btn')) {
        this.toggle();
      }
    });
  }
};

// 2. RTL / LTR Direction Manager (Positioned on the Left Side of Navbar)
const DirectionManager = {
  dirKey: 'sovereign_direction',

  init() {
    const savedDir = localStorage.getItem(this.dirKey) || 'ltr';
    this.setDirection(savedDir);
    this.bindEvents();
  },

  setDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(this.dirKey, dir);
    this.updateToggleText(dir);
  },

  toggle() {
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    const next = current === 'ltr' ? 'rtl' : 'ltr';
    this.setDirection(next);
  },

  updateToggleText(dir) {
    const toggleBtns = document.querySelectorAll('.dir-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.innerHTML = dir === 'ltr' 
        ? '<i class="fas fa-right-left"></i> <span>RTL</span>' 
        : '<i class="fas fa-right-left"></i> <span>LTR</span>';
      btn.setAttribute('title', `Switch to ${dir === 'ltr' ? 'RTL' : 'LTR'} layout`);
      btn.setAttribute('aria-label', `Switch to ${dir === 'ltr' ? 'RTL' : 'LTR'} layout`);
    });
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.dir-toggle-btn')) {
        this.toggle();
      }
    });
  }
};

// 3. Fallback Image Handler (Guarantees zero broken images)
const ImageFallbackHandler = {
  placeholderSvg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23161a22"/><text x="50%" y="46%" dominant-baseline="middle" text-anchor="middle" font-family="Cinzel, serif" font-size="28" fill="%23d4af37">SOVEREIGN &amp; CO.</text><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%239ba3af">Bespoke Men\'s Grooming</text></svg>',

  init() {
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', () => {
        img.src = this.placeholderSvg;
      });
    });
  }
};

// 4. Form Validator (Real-time Alphabet-only Name and Digits-only Mobile)
const FormValidator = {
  nameErrorMsg: 'Not applicable – please enter alphabets only.',
  phoneErrorMsg: 'Not applicable – please enter numbers only.',

  init() {
    this.bindNameInputs();
    this.bindPhoneInputs();
  },

  showError(input, msg) {
    if (!input) return;
    input.classList.add('is-invalid');
    const container = input.closest('.form-group') || input.parentElement;
    let errorEl = container.querySelector('.form-field-error');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'form-field-error';
      container.appendChild(errorEl);
    }
    errorEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${msg}`;
    errorEl.style.display = 'flex';
  },

  clearError(input) {
    if (!input) return;
    input.classList.remove('is-invalid');
    const container = input.closest('.form-group') || input.parentElement;
    const errorEl = container ? container.querySelector('.form-field-error') : null;
    if (errorEl) {
      errorEl.style.display = 'none';
      errorEl.innerHTML = '';
    }
  },

  bindNameInputs() {
    const selector = 'input[name="fullName"], input[name="name"], #contactFullName, #clientName, input[data-validate="name"]';
    const inputs = document.querySelectorAll(selector);
    
    inputs.forEach(input => {
      // Keydown to intercept invalid characters immediately
      input.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.altKey || e.metaKey || e.key.length > 1) {
          return;
        }
        if (!/^[A-Za-z\s]$/.test(e.key)) {
          e.preventDefault();
          this.showError(input, this.nameErrorMsg);
        }
      });

      // Beforeinput for mobile keyboards
      input.addEventListener('beforeinput', (e) => {
        if (e.data && !/^[A-Za-z\s]+$/.test(e.data)) {
          e.preventDefault();
          this.showError(input, this.nameErrorMsg);
        }
      });

      // Real-time input sanitization (typing, autofill, etc.)
      input.addEventListener('input', () => {
        const val = input.value;
        const sanitized = val.replace(/[^A-Za-z\s]/g, '');
        if (val !== sanitized) {
          input.value = sanitized;
          this.showError(input, this.nameErrorMsg);
        } else {
          this.clearError(input);
        }
      });

      // Paste handling
      input.addEventListener('paste', (e) => {
        const pasteData = (e.clipboardData || window.clipboardData)?.getData('text') || '';
        if (pasteData && !/^[A-Za-z\s]+$/.test(pasteData)) {
          e.preventDefault();
          const sanitized = pasteData.replace(/[^A-Za-z\s]/g, '');
          const start = input.selectionStart || 0;
          const end = input.selectionEnd || 0;
          const currentVal = input.value;
          input.value = currentVal.substring(0, start) + sanitized + currentVal.substring(end);
          input.setSelectionRange(start + sanitized.length, start + sanitized.length);
          this.showError(input, this.nameErrorMsg);
        } else {
          this.clearError(input);
        }
      });
    });
  },

  bindPhoneInputs() {
    const selector = 'input[type="tel"], input[name="phone"], input[name="mobile"], #contactPhone, #clientPhone, input[data-validate="phone"]';
    const inputs = document.querySelectorAll(selector);
    
    inputs.forEach(input => {
      input.setAttribute('inputmode', 'numeric');
      input.setAttribute('pattern', '[0-9]*');

      // Keydown to intercept non-digits immediately
      input.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.altKey || e.metaKey || e.key.length > 1) {
          return;
        }
        if (!/^[0-9]$/.test(e.key)) {
          e.preventDefault();
          this.showError(input, this.phoneErrorMsg);
        }
      });

      // Beforeinput for mobile keyboards
      input.addEventListener('beforeinput', (e) => {
        if (e.data && !/^[0-9]+$/.test(e.data)) {
          e.preventDefault();
          this.showError(input, this.phoneErrorMsg);
        }
      });

      // Real-time input sanitization
      input.addEventListener('input', () => {
        const val = input.value;
        const sanitized = val.replace(/[^0-9]/g, '');
        if (val !== sanitized) {
          input.value = sanitized;
          this.showError(input, this.phoneErrorMsg);
        } else {
          this.clearError(input);
        }
      });

      // Paste handling
      input.addEventListener('paste', (e) => {
        const pasteData = (e.clipboardData || window.clipboardData)?.getData('text') || '';
        if (pasteData && !/^[0-9]+$/.test(pasteData)) {
          e.preventDefault();
          const sanitized = pasteData.replace(/[^0-9]/g, '');
          const start = input.selectionStart || 0;
          const end = input.selectionEnd || 0;
          const currentVal = input.value;
          input.value = currentVal.substring(0, start) + sanitized + currentVal.substring(end);
          input.setSelectionRange(start + sanitized.length, start + sanitized.length);
          this.showError(input, this.phoneErrorMsg);
        } else {
          this.clearError(input);
        }
      });
    });
  }
};

window.FormValidator = FormValidator;

// 5. Main Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  DirectionManager.init();
  ImageFallbackHandler.init();
  FormValidator.init();

  // Sticky Navbar Scroll (High performance, jitter-free with requestAnimationFrame)
  const navbar = document.querySelector('.navbar-main');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 20) {
          navbar?.classList.add('scrolled');
        } else {
          navbar?.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navWrapper = document.querySelector('.nav-links-wrapper');
  if (mobileToggle && navWrapper) {
    mobileToggle.addEventListener('click', () => {
      navWrapper.classList.toggle('active');
      mobileToggle.innerHTML = navWrapper.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navWrapper.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // Quick Booking Strip Form
  const quickBookingForm = document.getElementById('quickBookingForm');
  if (quickBookingForm) {
    quickBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const service = document.getElementById('qb-service')?.value || '';
      const barber = document.getElementById('qb-barber')?.value || '';
      const date = document.getElementById('qb-date')?.value || '';
      
      const queryParams = new URLSearchParams({ service, barber, date });
      window.location.href = `booking.html?${queryParams.toString()}`;
    });
  }

  // Toast Notification System
  window.showToast = function(message, title = 'Notification') {
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    
    toast.innerHTML = `
      <div style="font-size: 1.3rem; color: var(--gold-primary);"><i class="fas fa-check-circle"></i></div>
      <div>
        <div style="font-weight: 700; font-size: 0.82rem; text-transform: uppercase; color: var(--gold-primary);">${title}</div>
        <div style="font-size: 0.88rem; color: var(--text-white);">${message}</div>
      </div>
    `;
    
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  };

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showToast('Welcome to the Sovereign Circle. Your exclusive pass is dispatched.', 'Membership Confirmed');
        emailInput.value = '';
      }
    });
  }

  // Contact / Booking Form
  const contactForm = document.getElementById('contactStudioForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = contactForm.querySelector('input[name="fullName"], #contactFullName, input[type="text"]');
      const phoneInput = contactForm.querySelector('input[name="phone"], #contactPhone, input[type="tel"]');
      
      let hasError = false;
      if (nameInput) {
        const nameVal = nameInput.value.trim();
        if (!nameVal || !/^[A-Za-z\s]+$/.test(nameVal)) {
          FormValidator.showError(nameInput, FormValidator.nameErrorMsg);
          nameInput.focus();
          hasError = true;
        }
      }
      if (phoneInput && !hasError) {
        const phoneVal = phoneInput.value.trim();
        if (!phoneVal || !/^[0-9]+$/.test(phoneVal)) {
          FormValidator.showError(phoneInput, FormValidator.phoneErrorMsg);
          phoneInput.focus();
          hasError = true;
        }
      }

      if (hasError) return;

      showToast('Thank you. Your appointment booking inquiry has been dispatched to our Mayfair concierge.', 'Booking Request Sent');
      contactForm.reset();
      if (nameInput) FormValidator.clearError(nameInput);
      if (phoneInput) FormValidator.clearError(phoneInput);
    });
  }
});
