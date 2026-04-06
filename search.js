window.doSearch = (q) => {
  q = (q || '').toLowerCase().trim();

  
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  document.getElementById('page-search')?.classList.add('active');
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('t-search')?.classList.add('active');

  
  const heroWrap = document.getElementById('heroWrap');
  if (heroWrap) heroWrap.style.display = 'none';

  
  const navIn  = document.getElementById('searchIn');
  const pageIn = document.getElementById('searchPageInput');
  if (navIn  && navIn.value  !== q) navIn.value  = q;
  if (pageIn && pageIn.value !== q) pageIn.value = q;

  const grid     = document.getElementById('searchGrid');
  const countEl  = document.getElementById('searchCount');
  if (!grid) return;

  
  if (!q) {
    grid.innerHTML = '';
    if (countEl) countEl.innerHTML = '';
    return;
  }

  grid.innerHTML = '';

  
  const movieResults = [
    ...( window.MOVIES || []).filter(m =>
      m.title?.toLowerCase().includes(q) ||
      m.title_en?.toLowerCase().includes(q) ||
      m.cat?.toLowerCase().includes(q) ||
      String(m.year).includes(q)
    ),
    ...( window.SERIES || []).filter(s =>
      s.title?.toLowerCase().includes(q) ||
      s.title_en?.toLowerCase().includes(q) ||
      s.cat?.toLowerCase().includes(q)
    ),
  ];

  
  const gameResults = (window.GAMES_LIST || []).filter(g =>
    g.title?.toLowerCase().includes(q) ||
    g.desc?.toLowerCase().includes(q) ||
    g.cat?.toLowerCase().includes(q)
  );

  
  const cityResults = (window.MN_CITIES || []).filter(c =>
    c.name?.toLowerCase().includes(q) ||
    c.en?.toLowerCase().includes(q)
  );

  const total = movieResults.length + gameResults.length + cityResults.length;

  if (countEl) {
    if (total === 0) {
      countEl.innerHTML = `<div style="color:var(--text3)">«${q}» — үр дүн олдсонгүй</div>`;
    } else {
      const parts = [];
      if (movieResults.length) parts.push(`🎬 ${movieResults.length} кино/цуврал`);
      if (gameResults.length)  parts.push(`🎮 ${gameResults.length} тоглоом`);
      if (cityResults.length)  parts.push(`🌤 ${cityResults.length} хот`);
      countEl.innerHTML = `<div>«${q}» — нийт <strong>${total}</strong> үр дүн: ${parts.join(' · ')}</div>`;
    }
  }

  
  if (total === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:80px 20px;color:var(--text2);">
        <div style="font-size:48px;margin-bottom:16px;">🔍</div>
        <div style="font-size:18px;font-weight:600;margin-bottom:8px;">«${q}» олдсонгүй</div>
        <div style="font-size:14px;color:var(--text3);">Өөр үг оруулж үзнэ үү</div>
      </div>`;
    return;
  }

  
  if (movieResults.length) {
    appendSectionLabel(grid, `🎬 Кино · Цуврал (${movieResults.length})`);
    movieResults.slice(0, 40).forEach(m => {
      const card = window.makeMovieCard(m);
      card.onclick = () => m.episodes ? window.openSeriesDetail(m) : window.openMovieDetail(m);
      grid.appendChild(card);
    });
  }

  
  if (gameResults.length) {
    appendSectionLabel(grid, `🎮 Тоглоом (${gameResults.length})`);
    gameResults.forEach(g => {
      if (window.makeGamePosterCard) {
        grid.appendChild(window.makeGamePosterCard(g));
      }
    });
  }

  
  if (cityResults.length) {
    appendSectionLabel(grid, `🌤 Цаг агаар (${cityResults.length})`);
    cityResults.forEach(c => {
      const card = document.createElement('div');
      card.className = 'mcard';
      card.style.cursor = 'pointer';
      card.innerHTML = `
        <div class="mcard-poster-wrap"
             style="background:linear-gradient(135deg,#1a237e,#0277bd);
                    display:flex;align-items:center;justify-content:center;
                    flex-direction:column;gap:10px;">
          <div style="font-size:52px;line-height:1;">${c.emoji}</div>
          <div style="font-size:15px;font-weight:700;color:#fff;text-shadow:0 2px 4px rgba(0,0,0,.5);">${c.name}</div>
          <div class="mcard-ov">
            <div class="mcard-play">
              <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" fill="white"/></svg>
            </div>
          </div>
        </div>
        <div class="mcard-info">
          <div class="mcard-title">${c.name}</div>
          <div class="mcard-sub">🌤 Цаг агаар</div>
        </div>`;
      card.onclick = () => {
        window.gotoPage('weather');
        setTimeout(() => window.loadWeather?.(), 400);
      };
      grid.appendChild(card);
    });
  }
};

function appendSectionLabel(container, text) {
  const lbl = document.createElement('div');
  lbl.style.cssText = `
    grid-column: 1 / -1;
    font-size: 16px;
    font-weight: 700;
    color: var(--text2);
    margin: 20px 0 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
    letter-spacing: 0.3px;`;
  lbl.textContent = text;
  container.appendChild(lbl);
}
