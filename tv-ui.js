/**
 * tv-ui.js — YouTube TV загварын бүрэн TV интерфейс
 * Desktop / Mobile-д огт нөлөөлөхгүй.
 * TV browser илрэхэд хуучин UI-г нуугаад энэ UI-г харуулна.
 */
import './tv-detect.js';
if (!window.isTV) { /* TV биш бол энэ файл юу ч хийхгүй */ }
else { _initTVUI(); }

function _initTVUI() {

  // ── 1. Хуучин UI нуу, TV UI хийнэ ─────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    // Хуучин контент нуух
    document.querySelectorAll('body > *:not(#tv-root):not(script):not(style)')
      .forEach(el => el.style.display = 'none');
    _buildTVShell();
    _loadAndRender();
  });

  // ── 2. CSS ─────────────────────────────────────────────────
  const css = document.createElement('style');
  css.textContent = `
    :root {
      --tv-bg: #0f0f0f;
      --tv-bg2: #1a1a1a;
      --tv-accent: #D4AF37;
      --tv-text: #ffffff;
      --tv-muted: rgba(255,255,255,0.55);
      --tv-focus: #D4AF37;
      --tv-card-w: 320px;
      --tv-card-h: 200px;
      --tv-radius: 10px;
      --tv-nav-h: 70px;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--tv-bg); color: var(--tv-text); font-family: 'Segoe UI', Arial, sans-serif; overflow: hidden; cursor: none !important; }

    /* ── NAV ── */
    #tv-nav {
      position: fixed; top: 0; left: 0; right: 0; height: var(--tv-nav-h);
      background: linear-gradient(to bottom, rgba(0,0,0,0.95), transparent);
      display: flex; align-items: center; padding: 0 60px; gap: 8px; z-index: 100;
    }
    .tv-nav-logo {
      font-size: 22px; font-weight: 800; color: var(--tv-accent);
      letter-spacing: 1px; margin-right: 40px; text-transform: uppercase;
    }
    .tv-nav-tab {
      padding: 8px 22px; border-radius: 30px; font-size: 17px; font-weight: 600;
      color: var(--tv-muted); background: none; border: none; cursor: pointer;
      transition: all 0.2s; tabindex: 0;
    }
    .tv-nav-tab.active, .tv-nav-tab:focus {
      color: #fff; background: rgba(255,255,255,0.12);
      outline: 2px solid var(--tv-focus); outline-offset: 2px;
    }

    /* ── HERO ── */
    #tv-hero {
      width: 100vw; height: 56.25vw; max-height: 85vh;
      position: relative; overflow: hidden; flex-shrink: 0;
    }
    #tv-hero-bg {
      position: absolute; inset: 0;
      background-size: cover; background-position: center top;
      transition: background-image 0.6s ease;
    }
    #tv-hero-bg::after {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%),
                  linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%);
    }
    #tv-hero-info {
      position: absolute; bottom: 80px; left: 60px; max-width: 550px; z-index: 2;
    }
    #tv-hero-cat {
      font-size: 14px; font-weight: 700; color: var(--tv-accent);
      text-transform: uppercase; letter-spacing: 3px; margin-bottom: 12px;
    }
    #tv-hero-title {
      font-size: 52px; font-weight: 900; line-height: 1.1;
      margin-bottom: 16px; text-shadow: 0 2px 20px rgba(0,0,0,0.8);
    }
    #tv-hero-meta {
      font-size: 18px; color: var(--tv-muted); margin-bottom: 12px;
    }
    #tv-hero-desc {
      font-size: 16px; color: rgba(255,255,255,0.75); line-height: 1.6;
      margin-bottom: 28px; display: -webkit-box; -webkit-line-clamp: 3;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    #tv-hero-btns { display: flex; gap: 16px; }
    .tv-hero-btn {
      display: flex; align-items: center; gap: 10px;
      padding: 14px 32px; border-radius: 8px; font-size: 18px; font-weight: 700;
      border: none; cursor: pointer; transition: all 0.2s;
    }
    .tv-hero-btn.primary { background: #fff; color: #000; }
    .tv-hero-btn.secondary { background: rgba(255,255,255,0.2); color: #fff; border: 2px solid rgba(255,255,255,0.4); }
    .tv-hero-btn:focus {
      outline: 3px solid var(--tv-focus) !important;
      outline-offset: 3px !important;
      transform: scale(1.05);
    }

    /* Hero dots */
    #tv-hero-dots {
      position: absolute; bottom: 30px; left: 60px; display: flex; gap: 8px; z-index: 2;
    }
    .tv-hdot {
      width: 8px; height: 8px; border-radius: 50%;
      background: rgba(255,255,255,0.35); transition: all 0.3s; border: none; cursor: pointer;
    }
    .tv-hdot.active { background: var(--tv-accent); width: 24px; border-radius: 4px; }

    /* ── CONTENT ── */
    #tv-root {
      position: fixed; inset: 0; overflow-y: auto; overflow-x: hidden;
      scroll-behavior: smooth;
    }
    #tv-root::-webkit-scrollbar { display: none; }

    /* ── ROW ── */
    .tv-row { padding: 0 0 40px 0; }
    .tv-row-title {
      font-size: 20px; font-weight: 700; padding: 0 60px 16px;
      color: var(--tv-text); letter-spacing: 0.5px;
    }
    .tv-row-scroll {
      display: flex; gap: 16px; padding: 8px 60px 8px;
      overflow-x: auto; scroll-behavior: smooth; scrollbar-width: none;
    }
    .tv-row-scroll::-webkit-scrollbar { display: none; }

    /* ── CARD ── */
    .tv-card {
      flex-shrink: 0; width: var(--tv-card-w); height: var(--tv-card-h);
      border-radius: var(--tv-radius); overflow: hidden; position: relative;
      cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease;
      background: var(--tv-bg2);
    }
    .tv-card img {
      width: 100%; height: 100%; object-fit: cover; display: block;
      transition: transform 0.3s ease;
    }
    .tv-card-ov {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%);
      display: flex; flex-direction: column; justify-content: flex-end; padding: 14px;
    }
    .tv-card-title { font-size: 15px; font-weight: 700; line-height: 1.3; }
    .tv-card-sub { font-size: 13px; color: var(--tv-muted); margin-top: 3px; }
    .tv-card-play-icon {
      position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
      width: 50px; height: 50px; border-radius: 50%;
      background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.2s;
    }

    /* FOCUS STATE — TV remote-ийн highlight */
    .tv-card:focus {
      outline: none !important;
      transform: scale(1.1) !important;
      box-shadow: 0 0 0 3px var(--tv-focus), 0 20px 50px rgba(0,0,0,0.7) !important;
      z-index: 50 !important;
    }
    .tv-card:focus .tv-card-play-icon { opacity: 1; }
    .tv-card:focus img { transform: scale(1.05); }

    /* ── PLAYER MODAL ── */
    #tv-player-modal {
      position: fixed; inset: 0; background: #000; z-index: 1000;
      display: none; flex-direction: column;
    }
    #tv-player-modal.open { display: flex; }
    #tv-player-video {
      width: 100%; height: 100%; background: #000;
    }
    #tv-player-overlay {
      position: absolute; inset: 0; display: flex; flex-direction: column;
      justify-content: space-between; padding: 30px 60px;
      background: linear-gradient(to bottom,
        rgba(0,0,0,0.7) 0%, transparent 25%,
        transparent 65%, rgba(0,0,0,0.85) 100%);
      opacity: 0; transition: opacity 0.3s;
    }
    #tv-player-modal:focus-within #tv-player-overlay,
    #tv-player-modal.show-controls #tv-player-overlay { opacity: 1; }

    #tv-player-top { display: flex; align-items: center; gap: 20px; }
    #tv-player-back {
      background: none; border: none; color: #fff; font-size: 28px;
      cursor: pointer; padding: 8px;
    }
    #tv-player-back:focus { outline: 2px solid var(--tv-focus); border-radius: 6px; }
    #tv-player-title { font-size: 22px; font-weight: 700; }

    #tv-player-controls { display: flex; flex-direction: column; gap: 14px; }
    #tv-progress-wrap { position: relative; height: 6px; background: rgba(255,255,255,0.3); border-radius: 3px; cursor: pointer; }
    #tv-progress-bar { height: 100%; background: var(--tv-accent); border-radius: 3px; width: 0%; transition: width 0.5s linear; }
    #tv-player-btns { display: flex; align-items: center; gap: 20px; }
    .tv-ctrl-btn {
      background: none; border: none; color: #fff; font-size: 26px;
      cursor: pointer; padding: 8px 14px; border-radius: 8px; transition: background 0.2s;
    }
    .tv-ctrl-btn:focus { outline: 2px solid var(--tv-focus); background: rgba(255,255,255,0.15); }
    #tv-player-time { font-size: 16px; color: var(--tv-muted); margin-left: auto; }

    /* ── DETAIL MODAL ── */
    #tv-detail-modal {
      position: fixed; inset: 0; z-index: 500; display: none;
      background: rgba(0,0,0,0.85); align-items: center; justify-content: center;
    }
    #tv-detail-modal.open { display: flex; }
    #tv-detail-box {
      width: 70vw; max-height: 80vh; background: var(--tv-bg2);
      border-radius: 16px; overflow: hidden; display: flex;
      box-shadow: 0 30px 80px rgba(0,0,0,0.8);
    }
    #tv-detail-poster {
      width: 280px; flex-shrink: 0; object-fit: cover;
    }
    #tv-detail-info {
      padding: 40px; display: flex; flex-direction: column; gap: 16px;
      overflow-y: auto;
    }
    #tv-detail-cat { font-size: 13px; color: var(--tv-accent); text-transform: uppercase; letter-spacing: 2px; }
    #tv-detail-title { font-size: 36px; font-weight: 900; line-height: 1.2; }
    #tv-detail-meta { font-size: 16px; color: var(--tv-muted); }
    #tv-detail-desc { font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.8); }
    #tv-detail-btns { display: flex; gap: 14px; margin-top: 10px; }

    /* Доод зай */
    .tv-bottom-space { height: 80px; }
  `;
  document.head.appendChild(css);

  // ── 3. HTML бүтэц ──────────────────────────────────────────
  function _buildTVShell() {
    const root = document.createElement('div');
    root.id = 'tv-root';
    root.innerHTML = `
      <!-- NAV -->
      <nav id="tv-nav">
        <div class="tv-nav-logo">🎬 Nabooshy</div>
        <button class="tv-nav-tab active" tabindex="0" data-page="home">🏠 Нүүр</button>
        <button class="tv-nav-tab" tabindex="0" data-page="movies">🎬 Кино</button>
        <button class="tv-nav-tab" tabindex="0" data-page="series">📺 Цуврал</button>
        <button class="tv-nav-tab" tabindex="0" data-page="search">🔍 Хайх</button>
      </nav>

      <!-- HERO -->
      <div id="tv-hero">
        <div id="tv-hero-bg"></div>
        <div id="tv-hero-info">
          <div id="tv-hero-cat"></div>
          <div id="tv-hero-title">Ачааллаж байна...</div>
          <div id="tv-hero-meta"></div>
          <div id="tv-hero-desc"></div>
          <div id="tv-hero-btns">
            <button class="tv-hero-btn primary" tabindex="0" id="tv-hero-play">
              ▶ Тоглуулах
            </button>
            <button class="tv-hero-btn secondary" tabindex="0" id="tv-hero-info-btn">
              ℹ Дэлгэрэнгүй
            </button>
          </div>
        </div>
        <div id="tv-hero-dots"></div>
      </div>

      <!-- ROWS (dynamic) -->
      <div id="tv-rows"></div>
      <div class="tv-bottom-space"></div>

      <!-- DETAIL MODAL -->
      <div id="tv-detail-modal">
        <div id="tv-detail-box">
          <img id="tv-detail-poster" src="" alt="">
          <div id="tv-detail-info">
            <div id="tv-detail-cat"></div>
            <div id="tv-detail-title"></div>
            <div id="tv-detail-meta"></div>
            <div id="tv-detail-desc"></div>
            <div id="tv-detail-btns">
              <button class="tv-hero-btn primary" id="tv-detail-play" tabindex="0">▶ Тоглуулах</button>
              <button class="tv-hero-btn secondary" id="tv-detail-close" tabindex="0">✕ Хаах</button>
            </div>
          </div>
        </div>
      </div>

      <!-- PLAYER MODAL -->
      <div id="tv-player-modal">
        <video id="tv-player-video" controls playsinline></video>
        <div id="tv-player-overlay">
          <div id="tv-player-top">
            <button class="tv-ctrl-btn" id="tv-player-back" tabindex="0">← Буцах</button>
            <div id="tv-player-title"></div>
          </div>
          <div id="tv-player-controls">
            <div id="tv-progress-wrap">
              <div id="tv-progress-bar"></div>
            </div>
            <div id="tv-player-btns">
              <button class="tv-ctrl-btn" id="tv-btn-rw" tabindex="0">⏪ 10с</button>
              <button class="tv-ctrl-btn" id="tv-btn-play" tabindex="0">⏸</button>
              <button class="tv-ctrl-btn" id="tv-btn-ff" tabindex="0">10с ⏩</button>
              <span id="tv-player-time">0:00 / 0:00</span>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(root);
    _bindPlayerControls();
    _bindDetailModal();
    _bindNavTabs();
  }

  // ── 4. Өгөгдөл ачаалах ─────────────────────────────────────
  async function _loadAndRender() {
    const [movies, serials, heroes] = await Promise.all([
      fetch('data_movies.json').then(r => r.json()).catch(() => []),
      fetch('data_serial.json').then(r => r.json()).catch(() => []),
      fetch('data_hero.json').then(r => r.json()).catch(() => [])
    ]);
    window.MOVIES = movies;
    window.SERIES = serials;

    _renderHero(Array.isArray(heroes) && heroes.length ? heroes : movies.slice(0, 8));
    _renderRows(movies, serials);

    // Эхний card руу focus
    setTimeout(() => {
      const first = document.querySelector('#tv-hero-play');
      if (first) first.focus();
    }, 400);
  }

  // ── 5. Hero ────────────────────────────────────────────────
  let _heroList = [], _heroIdx = 0, _heroTimer = null;

  function _renderHero(list) {
    _heroList = list.slice(0, 8);
    _heroIdx  = 0;
    _showHero(0);

    const dots = document.getElementById('tv-hero-dots');
    dots.innerHTML = _heroList.map((_, i) =>
      `<button class="tv-hdot ${i===0?'active':''}" tabindex="-1" data-i="${i}"></button>`
    ).join('');
    dots.querySelectorAll('.tv-hdot').forEach(d =>
      d.addEventListener('click', () => _showHero(+d.dataset.i))
    );

    // Auto-rotate
    _heroTimer = setInterval(() => _showHero((_heroIdx + 1) % _heroList.length), 8000);
  }

  function _showHero(idx) {
    _heroIdx = idx;
    const m  = _heroList[idx];
    if (!m) return;
    const bg = document.getElementById('tv-hero-bg');
    bg.style.backgroundImage = `url('${m.poster}')`;
    document.getElementById('tv-hero-cat').textContent   = m.cat || '';
    document.getElementById('tv-hero-title').textContent = m.title;
    document.getElementById('tv-hero-meta').textContent  = `⭐ ${m.rating || ''}  ·  ${m.year || ''}`;
    document.getElementById('tv-hero-desc').textContent  = m.overview || m.desc || '';

    // Dots
    document.querySelectorAll('.tv-hdot').forEach((d, i) =>
      d.classList.toggle('active', i === idx)
    );

    // Play товч
    document.getElementById('tv-hero-play').onclick = () => _openPlayer(m);
    document.getElementById('tv-hero-info-btn').onclick = () => _openDetail(m);

    // Store current hero movie
    window._tvHeroMovie = m;
  }

  // ── 6. Rows ────────────────────────────────────────────────
  function _renderRows(movies, serials) {
    const container = document.getElementById('tv-rows');
    container.innerHTML = '';

    // Тусгай мөр: Шинэ цуврал
    if (serials.length) {
      container.appendChild(_buildRow('📺 Шинэ цуврал', serials.slice(0, 20)));
    }

    // Жанрын мөрүүд
    (window.HOME_ROWS || []).forEach(({ title, keys }) => {
      const filtered = movies.filter(m => {
        const cat = (m.cat || '').toLowerCase();
        return keys.some(k => cat.includes(k));
      });
      if (filtered.length) container.appendChild(_buildRow(title, filtered));
    });

    // Бүх кино мөр
    container.appendChild(_buildRow('🎬 Бүх кино', movies));
  }

  function _buildRow(title, items) {
    const section = document.createElement('div');
    section.className = 'tv-row';

    const h = document.createElement('div');
    h.className   = 'tv-row-title';
    h.textContent = title;

    const scroll = document.createElement('div');
    scroll.className = 'tv-row-scroll';

    items.slice(0, 30).forEach(m => scroll.appendChild(_buildCard(m)));

    section.appendChild(h);
    section.appendChild(scroll);
    return section;
  }

  function _buildCard(m) {
    const card = document.createElement('div');
    card.className = 'tv-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', m.title);
    card.innerHTML = `
      <img src="${m.poster || ''}" alt="${m.title}"
           onerror="this.src='https://placehold.co/320x200/111/555?text=${encodeURIComponent(m.title)}'">
      <div class="tv-card-ov">
        <div class="tv-card-title">${m.title}</div>
        <div class="tv-card-sub">⭐ ${m.rating || ''} · ${m.year || ''}</div>
      </div>
      <div class="tv-card-play-icon">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <polygon points="6,4 20,12 6,20" fill="white"/>
        </svg>
      </div>`;
    card.addEventListener('click', () => _openDetail(m));
    return card;
  }

  // ── 7. Detail modal ────────────────────────────────────────
  function _openDetail(m) {
    window._tvCurrentMovie = m;
    clearInterval(_heroTimer);
    document.getElementById('tv-detail-poster').src         = m.poster || '';
    document.getElementById('tv-detail-cat').textContent    = m.cat || '';
    document.getElementById('tv-detail-title').textContent  = m.title;
    document.getElementById('tv-detail-meta').textContent   = `⭐ ${m.rating || ''}  ·  ${m.year || ''}`;
    document.getElementById('tv-detail-desc').textContent   = m.overview || m.desc || '';
    document.getElementById('tv-detail-modal').classList.add('open');
    setTimeout(() => document.getElementById('tv-detail-play').focus(), 100);
  }

  function _closeDetail() {
    document.getElementById('tv-detail-modal').classList.remove('open');
    _heroTimer = setInterval(() => _showHero((_heroIdx + 1) % _heroList.length), 8000);
    // Сүүлийн focused card руу буцах
    if (window._tvLastCard) setTimeout(() => window._tvLastCard.focus(), 100);
  }

  function _bindDetailModal() {
    document.getElementById('tv-detail-play').onclick  = () => {
      _closeDetail();
      _openPlayer(window._tvCurrentMovie);
    };
    document.getElementById('tv-detail-close').onclick = _closeDetail;
  }

  // ── 8. Player ──────────────────────────────────────────────
  let _ctrlTimeout = null;

  function _openPlayer(m) {
    if (!m || !m.embed) return;
    const modal = document.getElementById('tv-player-modal');
    const video = document.getElementById('tv-player-video');
    document.getElementById('tv-player-title').textContent = m.title;

    // HLS эсвэл MP4
    if (m.embed.includes('.m3u8') && typeof Hls !== 'undefined' && Hls.isSupported()) {
      if (window._tvHls) window._tvHls.destroy();
      window._tvHls = new Hls();
      window._tvHls.loadSource(m.embed);
      window._tvHls.attachMedia(video);
      window._tvHls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
    } else {
      video.src = m.embed;
      video.play().catch(() => {});
    }

    modal.classList.add('open');
    _showControls();
    document.getElementById('tv-btn-play').focus();
  }

  function _closePlayer() {
    const video = document.getElementById('tv-player-video');
    video.pause();
    video.src = '';
    if (window._tvHls) { window._tvHls.destroy(); window._tvHls = null; }
    document.getElementById('tv-player-modal').classList.remove('open');
    if (window._tvLastCard) setTimeout(() => window._tvLastCard.focus(), 100);
  }

  function _showControls() {
    const modal = document.getElementById('tv-player-modal');
    modal.classList.add('show-controls');
    clearTimeout(_ctrlTimeout);
    _ctrlTimeout = setTimeout(() => modal.classList.remove('show-controls'), 4000);
  }

  function _bindPlayerControls() {
    const video   = document.getElementById('tv-player-video');
    const progBar = document.getElementById('tv-progress-bar');
    const timeEl  = document.getElementById('tv-player-time');
    const playBtn = document.getElementById('tv-btn-play');

    document.getElementById('tv-player-back').onclick = _closePlayer;
    document.getElementById('tv-btn-rw').onclick = () => { video.currentTime -= 10; _showControls(); };
    document.getElementById('tv-btn-ff').onclick = () => { video.currentTime += 10; _showControls(); };

    playBtn.onclick = () => {
      video.paused ? video.play() : video.pause();
      playBtn.textContent = video.paused ? '▶' : '⏸';
      _showControls();
    };

    video.addEventListener('timeupdate', () => {
      if (!video.duration) return;
      const pct = (video.currentTime / video.duration) * 100;
      progBar.style.width = pct + '%';
      timeEl.textContent  = `${_fmt(video.currentTime)} / ${_fmt(video.duration)}`;
    });
  }

  function _fmt(s) {
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  // ── 9. Nav tabs ────────────────────────────────────────────
  function _bindNavTabs() {
    document.querySelectorAll('.tv-nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tv-nav-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        // TODO: page switching
      });
    });
  }

  // ── 10. D-pad keyboard navigation ──────────────────────────
  document.addEventListener('keydown', e => {
    const k       = e.keyCode;
    const focused = document.activeElement;

    // Player нээлттэй үед
    const playerOpen = document.getElementById('tv-player-modal')?.classList.contains('open');
    if (playerOpen) {
      _showControls();
      if (k === 8 || k === 27) { e.preventDefault(); _closePlayer(); }
      if (k === 37) { e.preventDefault(); document.getElementById('tv-player-video').currentTime -= 10; }
      if (k === 39) { e.preventDefault(); document.getElementById('tv-player-video').currentTime += 10; }
      if (k === 13) { e.preventDefault(); document.getElementById('tv-btn-play').click(); }
      return;
    }

    // Detail modal нээлттэй үед
    const detailOpen = document.getElementById('tv-detail-modal')?.classList.contains('open');
    if (detailOpen) {
      if (k === 8 || k === 27) { e.preventDefault(); _closeDetail(); }
      return;
    }

    // Үндсэн UI
    const isCard = focused?.classList.contains('tv-card');
    const isBtn  = focused?.classList.contains('tv-hero-btn') || focused?.classList.contains('tv-nav-tab');

    if (k === 13 && isCard) {
      e.preventDefault();
      window._tvLastCard = focused;
      focused.click();
      return;
    }

    if (isCard) {
      const row   = focused.closest('.tv-row-scroll');
      const cards = row ? Array.from(row.querySelectorAll('.tv-card')) : [];
      const idx   = cards.indexOf(focused);

      if (k === 37) { // ←
        e.preventDefault();
        const prev = cards[idx - 1];
        if (prev) { prev.focus(); prev.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }
        else if (row) row.scrollBy({ left: -300, behavior: 'smooth' });
      }
      if (k === 39) { // →
        e.preventDefault();
        const next = cards[idx + 1];
        if (next) { next.focus(); next.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }
        else if (row) row.scrollBy({ left: 300, behavior: 'smooth' });
      }
      if (k === 38) { // ↑ — дээрх мөр эсвэл Hero
        e.preventDefault();
        const rows    = Array.from(document.querySelectorAll('.tv-row-scroll'));
        const rIdx    = rows.indexOf(row);
        if (rIdx === 0) {
          document.getElementById('tv-hero-play')?.focus();
        } else {
          const prevCards = Array.from(rows[rIdx - 1].querySelectorAll('.tv-card'));
          const best = _nearestCard(prevCards, focused);
          if (best) { best.focus(); best.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }
        }
      }
      if (k === 40) { // ↓ — доорх мөр
        e.preventDefault();
        const rows    = Array.from(document.querySelectorAll('.tv-row-scroll'));
        const rIdx    = rows.indexOf(row);
        const nextRow = rows[rIdx + 1];
        if (nextRow) {
          const nextCards = Array.from(nextRow.querySelectorAll('.tv-card'));
          const best = _nearestCard(nextCards, focused);
          if (best) { best.focus(); best.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }
        }
      }
    }

    // Hero товчнуудаас ↓ → эхний мөрийн эхний card руу
    if (isBtn && k === 40) {
      e.preventDefault();
      const firstCard = document.querySelector('.tv-row-scroll .tv-card');
      if (firstCard) { firstCard.focus(); firstCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }
    }

    // Card-аас ↑ → Hero товч руу
    if (k === 8 || k === 27) {
      e.preventDefault();
      document.getElementById('tv-hero-play')?.focus();
    }
  });

  function _nearestCard(cards, ref) {
    const r = ref.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    let best = cards[0], bestDist = Infinity;
    cards.forEach(c => {
      const cr   = c.getBoundingClientRect();
      const dist = Math.abs((cr.left + cr.width / 2) - cx);
      if (dist < bestDist) { bestDist = dist; best = c; }
    });
    return best;
  }

  console.log('[TV] YouTube-style TV UI идэвхжлээ 🎬');
}
