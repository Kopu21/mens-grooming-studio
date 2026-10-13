/* ==========================================================================
   SOVEREIGN & CO. - Apothecary & Shopping Cart System
   Includes Cart Drawer, Dynamic Totals, Promo Code, and Complete Checkout Engine
   ========================================================================== */

const SovereignCart = {
  items: JSON.parse(localStorage.getItem('sovereign_cart')) || [
    {
      id: 'p1',
      name: 'Black Amber & Cedar Beard Oil',
      price: 48,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      quantity: 1
    }
  ],
  discount: 0,

  init() {
    this.ensureCheckoutModalExists();
    this.bindEvents();
    this.renderCart();
  },

  bindEvents() {
    // Open & Close cart drawer
    const cartToggles = document.querySelectorAll('.cart-toggle-btn, .open-cart-btn');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCartBtn = document.getElementById('closeCartBtn');

    cartToggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        cartDrawer?.classList.add('active');
        cartOverlay?.classList.add('active');
      });
    });

    closeCartBtn?.addEventListener('click', () => {
      cartDrawer?.classList.remove('active');
      cartOverlay?.classList.remove('active');
    });

    cartOverlay?.addEventListener('click', () => {
      cartDrawer?.classList.remove('active');
      cartOverlay?.classList.remove('active');
    });

    // Add to cart buttons
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.add-to-cart-btn');
      if (addBtn) {
        e.preventDefault();
        const id = addBtn.dataset.id || 'p' + Math.floor(Math.random()*100);
        const name = addBtn.dataset.name || 'Sovereign Product';
        const price = parseFloat(addBtn.dataset.price) || 45;
        const image = addBtn.dataset.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80';

        this.addItem({ id, name, price, image });
        cartDrawer?.classList.add('active');
        cartOverlay?.classList.add('active');
        if (window.showToast) {
          window.showToast(`${name} added to your satchel.`, 'Item Added');
        }
      }
    });

    // Apply Promo Code
    const promoBtn = document.getElementById('applyPromoBtn');
    if (promoBtn) {
      promoBtn.addEventListener('click', () => {
        const promoInput = document.getElementById('promoCodeInput');
        if (promoInput && promoInput.value.trim().toUpperCase() === 'SOVEREIGN15') {
          this.discount = 0.15;
          if (window.showToast) window.showToast('15% Gentleman discount activated!', 'Promotion Applied');
          this.renderCart();
        } else {
          if (window.showToast) window.showToast('Invalid voucher code. Try "SOVEREIGN15"', 'Code Error');
        }
      });
    }

    // Checkout button inside drawer
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.items.length === 0) {
          if (window.showToast) window.showToast('Your satchel is currently empty.', 'Cart Empty');
          return;
        }
        this.openCheckoutModal();
      });
    }
  },

  addItem(product) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.save();
    this.renderCart();
  },

  updateQty(id, delta) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.items = this.items.filter(i => i.id !== id);
      }
    }
    this.save();
    this.renderCart();
  },

  removeItem(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
    this.renderCart();
  },

  save() {
    localStorage.setItem('sovereign_cart', JSON.stringify(this.items));
  },

  renderCart() {
    const listContainer = document.getElementById('cartItemsList');
    const badgeCounts = document.querySelectorAll('.cart-badge-count');
    const subtotalEl = document.getElementById('cartSubtotal');
    const totalEl = document.getElementById('cartTotal');
    const discountRow = document.getElementById('cartDiscountRow');

    const totalCount = this.items.reduce((acc, item) => acc + item.quantity, 0);
    badgeCounts.forEach(el => el.textContent = totalCount);

    const subtotal = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discountAmount = subtotal * this.discount;
    const finalTotal = Math.max(0, subtotal - discountAmount);

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${finalTotal.toFixed(2)}`;
    
    if (discountRow) {
      if (this.discount > 0) {
        discountRow.style.display = 'flex';
        const discountVal = discountRow.querySelector('.discount-value');
        if (discountVal) discountVal.textContent = `-$${discountAmount.toFixed(2)}`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    if (!listContainer) return;

    if (this.items.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align:center; padding: 40px 10px; color: var(--text-muted);">
          <i class="fas fa-shopping-bag" style="font-size: 2.5rem; color: var(--gold-primary); margin-bottom: 15px; display: block; opacity: 0.5;"></i>
          <p style="font-size: 0.95rem;">Your grooming satchel is empty.</p>
          <a href="products.html" class="btn btn-secondary btn-sm" style="margin-top: 15px;">Browse Apothecary</a>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = this.items.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-qty-ctrl">
            <button class="qty-btn" onclick="SovereignCart.updateQty('${item.id}', -1)">-</button>
            <span style="font-size: 0.85rem; font-weight: 600; color: #fff;">${item.quantity}</span>
            <button class="qty-btn" onclick="SovereignCart.updateQty('${item.id}', 1)">+</button>
            <button onclick="SovereignCart.removeItem('${item.id}')" style="background:none; border:none; color: #ef4444; font-size: 0.75rem; margin-left: auto; cursor: pointer;" title="Remove Item">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  ensureCheckoutModalExists() {
    let modal = document.getElementById('checkoutModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'checkoutModal';
      modal.className = 'custom-modal-overlay';
      document.body.appendChild(modal);
    }
  },

  openCheckoutModal() {
    this.ensureCheckoutModalExists();
    const modal = document.getElementById('checkoutModal');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');

    cartDrawer?.classList.remove('active');
    cartOverlay?.classList.remove('active');

    const subtotal = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discountAmount = subtotal * this.discount;
    const finalTotal = Math.max(0, subtotal - discountAmount);

    const itemsSummaryHtml = this.items.map(item => `
      <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.88rem; padding: 8px 0; border-bottom: 1px solid var(--border-subtle);">
        <div>
          <strong>${item.name}</strong> <span style="color:var(--gold-primary); font-size:0.8rem;">x${item.quantity}</span>
        </div>
        <div>$${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');

    modal.innerHTML = `
      <div class="custom-modal-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid var(--border-gold); padding-bottom:12px;">
          <h3 style="font-size:1.3rem; margin:0;"><i class="fas fa-receipt text-gold"></i> Atelier Checkout</h3>
          <button type="button" id="closeCheckoutModal" style="background:none; border:none; color:var(--text-muted); font-size:1.4rem; cursor:pointer;" aria-label="Close Checkout Modal">&times;</button>
        </div>

        <div style="background:var(--bg-dark); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:16px; margin-bottom:22px;">
          <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--gold-primary); font-weight:700; margin-bottom:8px;">Order Review (${this.items.reduce((a,c)=>a+c.quantity,0)} Items)</div>
          ${itemsSummaryHtml}
          <div style="display:flex; justify-content:space-between; margin-top:10px; font-size:0.9rem; color:var(--text-muted);">
            <span>Subtotal</span><span>$${subtotal.toFixed(2)}</span>
          </div>
          ${this.discount > 0 ? `<div style="display:flex; justify-content:space-between; font-size:0.9rem; color:#10b981;"><span>15% Gentleman Discount</span><span>-$${discountAmount.toFixed(2)}</span></div>` : ''}
          <div style="display:flex; justify-content:space-between; margin-top:4px; font-size:0.9rem; color:var(--text-muted);">
            <span>White-Glove Courier Delivery</span><span class="text-gold">Complimentary</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-top:12px; font-size:1.15rem; font-weight:800; border-top:1px solid var(--border-gold); padding-top:10px;">
            <span>Total Investment</span><span style="color:var(--gold-primary);">$${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        <form id="checkoutOrderForm" style="display:flex; flex-direction:column; gap:14px;">
          <div class="form-group">
            <label><i class="fas fa-user"></i> Full Name *</label>
            <input type="text" id="checkoutFullName" name="fullName" required class="form-control" placeholder="e.g. Harrison Bennett" autocomplete="name">
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
            <div class="form-group">
              <label><i class="fas fa-envelope"></i> Email Address *</label>
              <input type="email" id="checkoutEmail" name="email" required class="form-control" placeholder="harrison@domain.com" autocomplete="email">
            </div>
            <div class="form-group">
              <label><i class="fas fa-phone"></i> Phone Number *</label>
              <input type="tel" id="checkoutPhone" name="phone" inputmode="numeric" pattern="[0-9]*" required class="form-control" placeholder="9876543210" autocomplete="tel">
            </div>
          </div>

          <div class="form-group">
            <label><i class="fas fa-map-marker-alt"></i> Delivery Address / Mayfair Studio Collection</label>
            <input type="text" id="checkoutAddress" class="form-control" placeholder="Street Address, City, Postal Code" required value="442 St. James Boulevard, Mayfair District, London">
          </div>

          <div class="form-group">
            <label><i class="fas fa-credit-card"></i> Payment Arrangement</label>
            <select class="form-control">
              <option value="arrival">Pay On Studio Collection / Concierge Arrival</option>
              <option value="card">Encrypted Sovereign Guild Card Vault</option>
              <option value="applepay">Apple Pay / Google Pay Instant</option>
            </select>
          </div>

          <div style="display:flex; gap:10px; margin-top:10px;">
            <button type="button" class="btn btn-secondary" id="cancelCheckoutBtn" style="flex:1;">Cancel</button>
            <button type="submit" class="btn btn-primary" style="flex:2;"><i class="fas fa-shield-alt"></i> Place Sovereign Order ($${finalTotal.toFixed(2)})</button>
          </div>
        </form>
      </div>
    `;

    modal.style.display = 'flex';

    // Bind form validators
    if (window.FormValidator) {
      window.FormValidator.init();
    }

    // Modal dismiss
    document.getElementById('closeCheckoutModal')?.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    document.getElementById('cancelCheckoutBtn')?.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Form submit
    const checkoutOrderForm = document.getElementById('checkoutOrderForm');
    checkoutOrderForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('checkoutFullName');
      const phoneInput = document.getElementById('checkoutPhone');

      let hasError = false;
      if (nameInput) {
        const nameVal = nameInput.value.trim();
        if (!nameVal || !/^[A-Za-z\s]+$/.test(nameVal)) {
          if (window.FormValidator) window.FormValidator.showError(nameInput, window.FormValidator.nameErrorMsg);
          nameInput.focus();
          hasError = true;
        }
      }
      if (phoneInput && !hasError) {
        const phoneVal = phoneInput.value.trim();
        if (!phoneVal || !/^[0-9]+$/.test(phoneVal)) {
          if (window.FormValidator) window.FormValidator.showError(phoneInput, window.FormValidator.phoneErrorMsg);
          phoneInput.focus();
          hasError = true;
        }
      }

      if (hasError) return;

      const orderNum = 'SOV-' + Math.floor(100000 + Math.random() * 900000);
      const clientName = nameInput.value;
      const clientEmail = document.getElementById('checkoutEmail')?.value || '';

      this.items = [];
      this.save();
      this.renderCart();

      modal.innerHTML = `
        <div class="custom-modal-card" style="text-align:center;">
          <div style="width:70px; height:70px; border-radius:50%; background:rgba(212,175,55,0.15); border:2px solid var(--gold-primary); display:inline-flex; align-items:center; justify-content:center; color:var(--gold-primary); font-size:2rem; margin-bottom:18px;">
            <i class="fas fa-check"></i>
          </div>
          <h3 style="font-size:1.6rem; margin-bottom:6px;">Apothecary Order Confirmed</h3>
          <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:20px;">
            Thank you, <strong>${clientName}</strong>. Your artisanal order has been recorded into our Mayfair dispensary registry.
          </p>
          <div style="background:var(--bg-dark); border:1px solid var(--border-gold); padding:16px; border-radius:8px; margin-bottom:25px; font-size:0.9rem;">
            <p style="margin:0 0 6px 0;"><strong>Order Reference:</strong> <span class="text-gold" style="font-weight:800;">#${orderNum}</span></p>
            <p style="margin:0; font-size:0.82rem; color:var(--text-dim);">Dispatch details and tracking manifest have been forwarded to <strong>${clientEmail}</strong>.</p>
          </div>
          <button type="button" class="btn btn-primary btn-lg" onclick="document.getElementById('checkoutModal').style.display='none';">
            <i class="fas fa-check-circle"></i> Complete & Close
          </button>
        </div>
      `;
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  SovereignCart.init();
});
