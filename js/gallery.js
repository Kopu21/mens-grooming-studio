/* ==========================================================================
   SOVEREIGN & CO. - Gallery & Before/After Slider Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Gallery category filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 2. Before / After Interactive Split Drag Slider
  const baContainer = document.querySelector('.ba-container');
  const baAfter = document.querySelector('.ba-after');
  const baHandle = document.querySelector('.ba-slider-handle');

  if (baContainer && baAfter && baHandle) {
    let isDragging = false;

    const moveSlider = (clientX) => {
      const rect = baContainer.getBoundingClientRect();
      let x = clientX - rect.left;
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;
      const percent = (x / rect.width) * 100;
      
      baAfter.style.width = `${percent}%`;
      baHandle.style.left = `${percent}%`;
    };

    baContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      moveSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      moveSlider(e.clientX);
    });

    // Touch events for mobile
    baContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      moveSlider(e.touches[0].clientX);
    });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      moveSlider(e.touches[0].clientX);
    });
  }
});
