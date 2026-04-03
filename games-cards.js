// games-cards.js

// ── Постер карт (grid дээр харагдах том карт) ──
window.makeGamePosterCard = function(g) {
  const d = document.createElement('div');
  d.className = 'mcard';
  d.style.cursor = 'pointer';
  d.dataset.slug = g.slug || '';   // RAWG live update-д хэрэгтэй

  const posterUrl = g.poster ||
    `https://placehold.co/400x600/1a1a2e/ffffff?text=${encodeURIComponent(g.title)}`;

  const ratingHtml = g.rating
    ? `<div class="mcard-rating">⭐ ${Number(g.rating).toFixed(1)}</div>`
    : '<div class="mcard-rating"></div>';

  const metaHtml = g.metacritic
    ? `<div class="mcard-meta" title="Metacritic">${g.metacritic}</div>`
    : '<div class="mcard-meta"></div>';

  d.innerHTML = `
    <div class="mcard-poster-wrap" style="background-color:#111;overflow:hidden;position:relative;">
      <img src="${posterUrl}" alt="${g.title}"
        style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;z-index:0;transition:transform 0.4s ease;"
        loading="lazy"
        onerror="this.src='https://placehold.co/400x600/1a1a2e/ffffff?text=${encodeURIComponent(g.title)}'">
      <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0) 55%);z-index:1;"></div>
      <div style="position:absolute;top:8px;right:8px;z-index:3;">${metaHtml}</div>
      <div class="mcard-ov" style="z-index:2;">
        <div class="mcard-play">
          <svg viewBox="0 0 24 24" width="28" height="28"><polygon points="5,3 19,12 5,21" fill="white"/></svg>
        </div>
      </div>
    </div>
    <div class="mcard-info">
      <div class="mcard-title">${g.title}</div>
      <div class="mcard-sub" style="color:#aaa;font-size:0.75rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${g.desc || g.cat || ''}</div>
      <div style="display:flex;gap:6px;margin-top:4px;align-items:center;">${ratingHtml}</div>
    </div>`;

  d.addEventListener('mouseenter', () => {
    const img = d.querySelector('img');
    if (img) img.style.transform = 'scale(1.08)';
  });
  d.addEventListener('mouseleave', () => {
    const img = d.querySelector('img');
    if (img) img.style.transform = 'scale(1)';
  });

  d.onclick = () => window.openGame(g);
  return d;
};

// ── Жагсаалт карт (хэвтээ, жижиг) ──
window.makeGameListCard = function(g) {
  const d = document.createElement('div');
  d.className = 'game-card';
  d.dataset.slug = g.slug || '';

  const posterUrl = g.poster ||
    `https://placehold.co/100x100/1a1a2e/ffffff?text=${encodeURIComponent(g.title)}`;

  d.innerHTML = `
    <div style="background-image:url('${posterUrl}');background-size:cover;background-position:center;
                width:60px;height:60px;border-radius:8px;flex-shrink:0;"></div>
    <div class="game-info" style="flex:1;min-width:0;">
      <div class="game-title">${g.title}</div>
      <div class="game-desc" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${g.desc || g.cat || ''}</div>
      ${g.rating ? `<div style="font-size:0.72rem;color:#f0b429;margin-top:2px;">⭐ ${Number(g.rating).toFixed(1)}</div>` : ''}
    </div>
    <button class="game-btn">▶ Тоглох</button>`;

  d.querySelector('.game-btn').onclick = e => { e.stopPropagation(); window.openGame(g); };
  return d;
};
