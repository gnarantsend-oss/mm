import './tv-detect.js';

// ═══════════════════════════════════════════════════════════════
//  DESKTOP — 3D hover effect (хулгана байвал л ажиллана)
// ═══════════════════════════════════════════════════════════════
if (window.matchMedia('(hover: hover)').matches && !window.isTV) {
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.mcard');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rotateX = (((e.clientY - rect.top)  / rect.height) - 0.5) * -20;
    const rotateY = (((e.clientX - rect.left) / rect.width)  - 0.5) *  20;
    card.style.transform  = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05,1.05,1.05)`;
    card.style.zIndex     = '100';
    card.style.transition = 'transform 0.1s ease-out';
  });
  document.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.mcard');
    if (!card) return;
    card.style.transform  = '';
    card.style.zIndex     = '1';
    card.style.transition = 'transform 0.5s ease';
  });
}

// ═══════════════════════════════════════════════════════════════
//  TV — D-pad (Remote) navigation
//  Android TV remote товчнууд:
//    ← 37  ↑ 38  → 39  ↓ 40  OK/Enter 13  Back 8/27
// ═══════════════════════════════════════════════════════════════
if (window.isTV) {

  // TV-д card бүрд tabindex өгнө — remote focus хийж чадна
  function _makeFocusable() {
    document.querySelectorAll('.mcard').forEach(c => {
      if (!c.getAttribute('tabindex')) {
        c.setAttribute('tabindex', '0');
        c.setAttribute('role', 'button');
      }
    });
  }

  // Card-ийн байрлах row-ийг олно
  function _getRow(card) {
    return card.closest('.scroll-row');
  }

  // Row дотрох бүх card-ийг авна
  function _cards(row) {
    return Array.from(row ? row.querySelectorAll('.mcard') : []);
  }

  // Одоогийн focused card-аас зүүн/баруун зөрүүгээр шилжих
  function _moveInRow(card, dir) {
    const row   = _getRow(card);
    const cards = _cards(row);
    const idx   = cards.indexOf(card);
    const next  = cards[idx + dir];
    if (next) {
      next.focus();
      // Card харагдахаар scroll хийнэ
      next.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      // Ирмэгт хүрвэл row-ийг нааш цааш гүйлгэнэ
      if (row) row.scrollBy({ left: dir * 300, behavior: 'smooth' });
    }
  }

  // Дээрх/доорх row руу шилжих
  function _moveVertical(card, dir) {
    const row     = _getRow(card);
    if (!row) return;

    // Бүх scroll-row жагсаалт
    const allRows = Array.from(document.querySelectorAll('.scroll-row'));
    const rIdx    = allRows.indexOf(row);
    const nextRow = allRows[rIdx + dir];
    if (!nextRow) return;

    const nextCards = _cards(nextRow);
    if (!nextCards.length) return;

    // Хэвтээ байрлалаар хамгийн ойр card руу очно
    const curRect = card.getBoundingClientRect();
    let best = nextCards[0];
    let bestDist = Infinity;
    nextCards.forEach(c => {
      const r    = c.getBoundingClientRect();
      const dist = Math.abs((r.left + r.width / 2) - (curRect.left + curRect.width / 2));
      if (dist < bestDist) { bestDist = dist; best = c; }
    });
    best.focus();
    best.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  // ── CSS: focus харагдах болгоно ─────────────────────────────
  const tvCSS = document.createElement('style');
  tvCSS.textContent = `
    /* TV pointer горимыг хаана */
    * { cursor: none !important; }

    /* Focus ring — remote дэлгэц дээр харагдана */
    .mcard:focus {
      outline: 3px solid #D4AF37 !important;
      outline-offset: 3px !important;
      transform: scale(1.07) !important;
      z-index: 100 !important;
      box-shadow: 0 0 20px rgba(212,175,55,0.6) !important;
      transition: transform 0.15s ease, box-shadow 0.15s ease !important;
    }

    /* Scroll товчнуудыг TV-д нуух — remote-ийн arrow key хийнэ */
    .scroll-btn { display: none !important; }

    /* Modal товч focus */
    .btn-watch:focus, .mcls:focus, button:focus {
      outline: 3px solid #D4AF37 !important;
      outline-offset: 2px !important;
    }
  `;
  document.head.appendChild(tvCSS);

  // ── Keyboard handler ─────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    const key     = e.keyCode;
    const focused = document.activeElement;
    const isCard  = focused && focused.classList.contains('mcard');

    // Modal нээлттэй үед Back товч → хаах
    if (key === 8 || key === 27) {
      const openModal = document.querySelector('.modal-bg.open, .modal.open');
      if (openModal) {
        e.preventDefault();
        const closeBtn = openModal.querySelector('.mcls, [onclick*="closeM"]');
        if (closeBtn) closeBtn.click();
        // Modal хаасны дараа сүүлд focus байсан card руу буцах
        if (window._tvLastCard) {
          setTimeout(() => window._tvLastCard.focus(), 100);
        }
        return;
      }
    }

    if (!isCard) return;

    switch (key) {
      case 37: // ←
        e.preventDefault();
        window._tvLastCard = focused;
        _moveInRow(focused, -1);
        break;

      case 39: // →
        e.preventDefault();
        window._tvLastCard = focused;
        _moveInRow(focused, +1);
        break;

      case 38: // ↑
        e.preventDefault();
        window._tvLastCard = focused;
        _moveVertical(focused, -1);
        break;

      case 40: // ↓
        e.preventDefault();
        window._tvLastCard = focused;
        _moveVertical(focused, +1);
        break;

      case 13: // Enter / OK
        e.preventDefault();
        window._tvLastCard = focused;
        focused.click();
        // Modal нээгдсэний дараа "Үзэх" товч руу focus
        setTimeout(() => {
          const watchBtn = document.querySelector('.btn-watch, #movieModal .btn-watch');
          if (watchBtn) watchBtn.focus();
        }, 200);
        break;
    }
  });

  // ── Card-уудыг хянах — динамикаар нэмэгддэг тул MutationObserver ─
  const _obs = new MutationObserver(_makeFocusable);
  _obs.observe(document.body, { childList: true, subtree: true });

  // Эхний ачаалалд
  window.addEventListener('DOMContentLoaded', () => {
    _makeFocusable();
    // Эхний card руу автоматаар focus
    setTimeout(() => {
      const first = document.querySelector('.mcard');
      if (first) first.focus();
    }, 800);
  });

  console.log('[TV] D-pad navigation идэвхжлээ');
}
