/* ==========================================================================
   SOVEREIGN & CO. - Interactive Booking Engine & Chair Reservation Flow
   Includes 4-Step Flow: Primary Treatment -> Date & Time Slot -> Artisan -> Details
   ========================================================================== */

const SovereignBooking = {
  currentStep: 1,
  data: {
    service: { id: 'scissor-silhouette', name: 'Executive Scissor Silhouette', price: 80, duration: '55 Mins' },
    barber: { id: 'julian', name: 'Julian Vance', title: 'Senior Master Barber' },
    date: '2026-10-15',
    time: '11:00 AM',
    addons: [],
    client: { name: '', email: '', phone: '', notes: '' }
  },

  servicesList: {
    'scissor-silhouette': { name: 'Executive Scissor Silhouette', price: 80, duration: '55 Mins' },
    'beard-trim': { name: 'Architectural Beard Trim', price: 50, duration: '40 Mins' },
    'beard-styling': { name: 'Grand Beard Styling', price: 55, duration: '40 Mins' },
    'hair-styling': { name: 'Modern Hair Styling', price: 45, duration: '30 Mins' },
    'royal-shave': { name: 'Premium Royal Shaving', price: 55, duration: '40 Mins' },
    'thermal-facial': { name: 'Thermal Stone Hydration Facial', price: 65, duration: '40 Mins' },
    'executive-combo': { name: 'Complete Sovereign Grooming Package', price: 120, duration: '85 Mins' },
    'scalp-therapy': { name: 'Japanese Scalp Detox', price: 75, duration: '50 Mins' }
  },

  barbersList: {
    'julian': { name: 'Julian Vance', title: 'Senior Master Barber' },
    'marcus': { name: 'Marcus Sterling', title: 'Beard Architect' },
    'david': { name: 'David Thorne', title: 'Razor Specialist' },
    'alexander': { name: 'Alexander Cross', title: 'Creative Director & Founder' }
  },

  init() {
    this.checkQueryParams();
    this.bindEvents();
    this.updateSummary();
  },

  checkQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    const barberParam = params.get('barber');
    const dateParam = params.get('date');

    // Backward compatibility for service param aliases
    let mappedService = serviceParam;
    if (serviceParam === 'haircut') mappedService = 'scissor-silhouette';
    if (serviceParam === 'beard-sculpt') mappedService = 'beard-trim';

    if (mappedService && this.servicesList[mappedService]) {
      this.data.service = { id: mappedService, ...this.servicesList[mappedService] };
      this.selectCard('service', mappedService);
    }
    if (barberParam && this.barbersList[barberParam]) {
      this.data.barber = { id: barberParam, ...this.barbersList[barberParam] };
      this.selectCard('barber', barberParam);
    }
    if (dateParam) {
      this.data.date = dateParam;
      const dateInput = document.getElementById('bookingDateInput');
      if (dateInput) dateInput.value = dateParam;
    }
  },

  selectCard(type, value) {
    const cards = document.querySelectorAll(`[data-${type}]`);
    cards.forEach(card => {
      if (card.dataset[type] === value) {
        card.classList.add('selected');
        card.setAttribute('aria-checked', 'true');
      } else {
        card.classList.remove('selected');
        card.setAttribute('aria-checked', 'false');
      }
    });
  },

  bindEvents() {
    // 1. Step Navigation Buttons
    document.querySelectorAll('.btn-next-step').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.goToStep(this.currentStep + 1);
      });
    });

    document.querySelectorAll('.btn-prev-step').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.goToStep(this.currentStep - 1);
      });
    });

    // 2. Step Indicators
    document.querySelectorAll('.step-indicator').forEach(ind => {
      ind.addEventListener('click', () => {
        const stepNum = parseInt(ind.dataset.step);
        if (stepNum <= this.currentStep || this.validateCurrentStep()) {
          this.goToStep(stepNum);
        }
      });
      ind.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          ind.click();
        }
      });
    });

    // 3. Treatment Selection (Step 1)
    document.querySelectorAll('[data-service]').forEach(card => {
      const handleSelect = () => {
        document.querySelectorAll('[data-service]').forEach(c => {
          c.classList.remove('selected');
          c.setAttribute('aria-checked', 'false');
        });
        card.classList.add('selected');
        card.setAttribute('aria-checked', 'true');
        const key = card.dataset.service;
        this.data.service = { id: key, ...(this.servicesList[key] || { name: 'Master Treatment', price: 65, duration: '45 Mins' }) };
        this.updateSummary();
      };

      card.addEventListener('click', handleSelect);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect();
        }
      });
    });

    // 4. Date and Time Slot Selection (Step 2)
    const dateInput = document.getElementById('bookingDateInput');
    if (dateInput) {
      dateInput.addEventListener('change', (e) => {
        this.data.date = e.target.value;
        this.updateSummary();
      });
    }

    document.querySelectorAll('.time-slot-btn').forEach(btn => {
      const handleTimeSelect = () => {
        document.querySelectorAll('.time-slot-btn').forEach(b => {
          b.classList.remove('selected');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('selected');
        btn.setAttribute('aria-pressed', 'true');
        this.data.time = btn.textContent.trim();
        this.updateSummary();
      };

      btn.addEventListener('click', handleTimeSelect);
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTimeSelect();
        }
      });
    });

    // 5. Artisan Selection (Step 3)
    document.querySelectorAll('[data-barber]').forEach(card => {
      const handleBarberSelect = () => {
        document.querySelectorAll('[data-barber]').forEach(c => {
          c.classList.remove('selected');
          c.setAttribute('aria-checked', 'false');
        });
        card.classList.add('selected');
        card.setAttribute('aria-checked', 'true');
        const key = card.dataset.barber;
        this.data.barber = { id: key, ...(this.barbersList[key] || { name: 'Any Master Barber', title: 'Next Available' }) };
        this.updateSummary();
      };

      card.addEventListener('click', handleBarberSelect);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleBarberSelect();
        }
      });
    });

    // 6. Curated Add-ons Checkboxes
    document.querySelectorAll('.addon-checkbox').forEach(chk => {
      chk.addEventListener('change', () => {
        this.data.addons = [];
        document.querySelectorAll('.addon-checkbox:checked').forEach(c => {
          this.data.addons.push({
            name: c.dataset.addonName,
            price: parseFloat(c.dataset.addonPrice)
          });
        });
        this.updateSummary();
      });
    });

    // 7. Final Form Submit (Step 4)
    const finalForm = document.getElementById('bookingFinalForm');
    if (finalForm) {
      finalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('clientName');
        const emailInput = document.getElementById('clientEmail');
        const phoneInput = document.getElementById('clientPhone');

        let hasError = false;
        if (nameInput) {
          const nameVal = nameInput.value.trim();
          if (!nameVal || !/^[A-Za-z\s]+$/.test(nameVal)) {
            if (window.FormValidator) {
              window.FormValidator.showError(nameInput, window.FormValidator.nameErrorMsg);
            }
            nameInput.focus();
            hasError = true;
          }
        }
        if (emailInput && !hasError) {
          if (window.FormValidator) {
            if (!window.FormValidator.validateEmail(emailInput)) {
              emailInput.focus();
              hasError = true;
            }
          } else {
            const emailVal = emailInput.value.trim();
            if (/[A-Z]/.test(emailVal)) {
              hasError = true;
              emailInput.focus();
            } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(emailVal)) {
              hasError = true;
              emailInput.focus();
            }
          }
        }
        if (phoneInput && !hasError) {
          const phoneVal = phoneInput.value.trim();
          if (!phoneVal || !/^[0-9]+$/.test(phoneVal)) {
            if (window.FormValidator) {
              window.FormValidator.showError(phoneInput, window.FormValidator.phoneErrorMsg);
            }
            phoneInput.focus();
            hasError = true;
          }
        }

        if (hasError) return;

        this.data.client.name = nameInput?.value || 'Valued Gentleman';
        this.data.client.email = document.getElementById('clientEmail')?.value || '';
        this.data.client.phone = phoneInput?.value || '';
        this.data.client.notes = document.getElementById('clientNotes')?.value || '';

        this.showConfirmationModal();
      });
    }
  },

  validateCurrentStep() {
    if (this.currentStep === 1) {
      return !!this.data.service.name;
    }
    if (this.currentStep === 2) {
      return !!this.data.date && !!this.data.time;
    }
    if (this.currentStep === 3) {
      return !!this.data.barber.name;
    }
    return true;
  },

  goToStep(step) {
    if (step < 1 || step > 4) return;
    
    // Update step visibility
    document.querySelectorAll('.booking-step-content').forEach(content => {
      content.classList.remove('active');
    });
    const nextContent = document.getElementById(`bookingStep${step}`);
    if (nextContent) nextContent.classList.add('active');

    // Update step indicators
    document.querySelectorAll('.step-indicator').forEach(ind => {
      const indStep = parseInt(ind.dataset.step);
      ind.classList.remove('active', 'completed');
      if (indStep === step) {
        ind.classList.add('active');
      } else if (indStep < step) {
        ind.classList.add('completed');
      }
    });

    this.currentStep = step;
    // Do NOT invoke disruptive window.scrollTo jumps
  },

  updateSummary() {
    const sumService = document.getElementById('summaryService');
    const sumBarber = document.getElementById('summaryBarber');
    const sumDateTime = document.getElementById('summaryDateTime');
    const sumAddons = document.getElementById('summaryAddons');
    const sumTotal = document.getElementById('summaryTotalPrice');

    if (sumService) sumService.textContent = `${this.data.service.name} (${this.data.service.duration})`;
    if (sumBarber) sumBarber.textContent = `${this.data.barber.name} (${this.data.barber.title})`;
    if (sumDateTime) sumDateTime.textContent = `${this.data.date} @ ${this.data.time}`;
    
    let total = this.data.service.price;
    if (this.data.addons.length > 0) {
      const addonNames = this.data.addons.map(a => `${a.name} (+$${a.price})`).join(', ');
      if (sumAddons) sumAddons.textContent = addonNames;
      total += this.data.addons.reduce((acc, a) => acc + a.price, 0);
    } else {
      if (sumAddons) sumAddons.textContent = 'None selected';
    }

    if (sumTotal) sumTotal.textContent = `$${total.toFixed(2)}`;
  },

  showConfirmationModal() {
    const modal = document.getElementById('appointmentSuccessModal');
    const refEl = document.getElementById('confirmBookingRef');
    const detailsEl = document.getElementById('confirmDetailsBox');

    const bookingRef = 'SOV-' + Math.floor(100000 + Math.random() * 900000);
    if (refEl) refEl.textContent = bookingRef;

    let total = this.data.service.price + this.data.addons.reduce((acc, a) => acc + a.price, 0);

    if (detailsEl) {
      detailsEl.innerHTML = `
        <div style="background: var(--bg-dark); border: 1px solid var(--border-gold); padding: 20px; border-radius: 8px; margin: 20px 0; text-align: left; font-size: 0.9rem;">
          <p style="margin-bottom: 8px;"><strong style="color:var(--gold-primary);">Client:</strong> ${this.data.client.name}</p>
          <p style="margin-bottom: 8px;"><strong style="color:var(--gold-primary);">Primary Treatment:</strong> ${this.data.service.name}</p>
          <p style="margin-bottom: 8px;"><strong style="color:var(--gold-primary);">Master Artisan:</strong> ${this.data.barber.name}</p>
          <p style="margin-bottom: 8px;"><strong style="color:var(--gold-primary);">Date & Time:</strong> ${this.data.date} @ ${this.data.time}</p>
          ${this.data.addons.length > 0 ? `<p style="margin-bottom: 8px;"><strong style="color:var(--gold-primary);">Add-ons:</strong> ${this.data.addons.map(a=>a.name).join(', ')}</p>` : ''}
          <p style="margin-bottom: 8px;"><strong style="color:var(--gold-primary);">Total Investment:</strong> $${total.toFixed(2)}</p>
          <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 10px;">A formal calendar invitation and confirmation voucher have been emailed to <strong>${this.data.client.email}</strong>.</p>
        </div>
      `;
    }

    if (modal) modal.style.display = 'flex';
  }
};

window.SovereignBooking = SovereignBooking;

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('bookingStep1')) {
    SovereignBooking.init();
  }
});
