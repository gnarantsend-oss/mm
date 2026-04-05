/* settings.js — Nabooshy 2026 Тохиргоо */

(function () {
  'use strict';

  /* ── Persistent state ── */
  const STORAGE_KEY = 'naboo_settings_v2';
  const defaults = {
    accent:       'red',
    autoplay:     true,
    hls:          true,
    subtitles:    false,
    notifications:false,
    quality:      'auto',
    language:     'mn',
    fontSize:     'medium',
    volume:       80,
    animations:   true,
  };

  function load()  { try { return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; } catch { return { ...defaults }; } }
  function save(s) { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }

  let S = load();

  /* ── Apply settings on startup ── */
  function applyAll() {
    document.body.setAttribute('data-accent', S.accent);
    document.body.className = document.body.className.replace(/\bfs-\w+/g, '').trim();
    document.body.classList.add('fs-' + S.fontSize);
    if (!S.animations) document.documentElement.style.setProperty('--transition-speed', '0s');
    else document.documentElement.style.removeProperty('--transition-speed');
  }
  applyAll();

  /* ── Build modal HTML ── */
  const ACCENT_COLORS = [
    { key: 'red',    hex: '#E50914', label: 'Улаан' },
    { key: 'blue',   hex: '#1E88E5', label: 'Цэнхэр' },
    { key: 'green',  hex: '#43A047', label: 'Ногоон' },
    { key: 'gold',   hex: '#FFC107', label: 'Алтан' },
    { key: 'pink',   hex: '#EC407A', label: 'Ягаан' },
    { key: 'purple', hex: '#AB47BC', label: 'Нил ягаан' },
    { key: 'teal',   hex: '#00BCD4', label: 'Хөх ногоон' },
  ];

  const QUALITY_OPTS  = ['auto', '1080p', '720p', '480p', '360p'];
  const FONT_OPTS     = [['small','Жижиг'],['medium','Дунд'],['large','Том']];
  const LANG_OPTS     = [['mn','Монгол'],['en','English']];

  function toggle(id, key) {
    return `
      <label class="s-toggle" aria-label="${key}">
        <input type="checkbox" id="${id}" ${S[key] ? 'checked' : ''} onchange="window._nabooSettings.set('${key}', this.checked)">
        <div class="s-toggle-track"><div class="s-toggle-thumb"></div></div>
      </label>`;
  }

  function select(id, key, opts) {
    const optsHtml = opts.map(([v,l]) => `<option value="${v}" ${S[key]===v?'selected':''}>${l}</option>`).join('');
    return `<select class="s-select" id="${id}" onchange="window._nabooSettings.set('${key}', this.value)">${optsHtml}</select>`;
  }

  function row(iconClass, emoji, title, sub, control) {
    return `
      <div class="s-row">
        <div class="s-row-icon ${iconClass}">${emoji}</div>
        <div class="s-row-text">
          <div class="s-row-title">${title}</div>
          ${sub ? `<div class="s-row-sub">${sub}</div>` : ''}
        </div>
        ${control}
      </div>`;
  }

  const colorDots = ACCENT_COLORS.map(c =>
    `<div class="s-color-dot ${S.accent===c.key?'active':''}" style="background:${c.hex}" title="${c.label}" onclick="window._nabooSettings.setAccent('${c.key}', this)"></div>`
  ).join('');

  const modalHTML = `
<div id="settingsModal" onclick="if(event.target===this)window._nabooSettings.close()">
  <div class="settings-sheet" role="dialog" aria-label="Тохиргоо">
    <div class="settings-handle"></div>
    <div class="settings-header">
      <div class="settings-title">⚙️ Тохиргоо</div>
      <button class="settings-close" onclick="window._nabooSettings.close()">✕</button>
    </div>
    <div class="settings-body">

      <!-- ГАДААД БАЙДАЛ -->
      <div class="s-section">
        <div class="s-section-label">🎨 Гадаад байдал</div>
        <div class="s-row">
          <div class="s-row-icon red">🎨</div>
          <div class="s-row-text">
            <div class="s-row-title">Accent өнгө</div>
            <div class="s-row-sub">Үндсэн өнгийг сонгох</div>
            <div class="s-colors" style="margin-top:10px;">${colorDots}</div>
          </div>
        </div>
        ${row('purple','🔤','Фонт хэмжээ','Текстийн том жижгийг тохируулах', select('s-fontSize','fontSize',FONT_OPTS))}
        ${row('blue','✨','Хөдөлгөөн / Animation','Шилжилт, нэвтрэлтийн эффект', toggle('s-animations','animations'))}
      </div>

      <!-- ТОГЛУУЛАГЧ -->
      <div class="s-section">
        <div class="s-section-label">🎬 Тоглуулагч</div>
        ${row('red','▶️','Автомат тоглуулах','Дараагийн анги автоматаар тоглох', toggle('s-autoplay','autoplay'))}
        ${row('blue','📡','HLS / P2P Stream','P2P сүлжээний дамжуулалт', toggle('s-hls','hls'))}
        ${row('teal','💬','Хадмал орчуулга','Subtitle идэвхжүүлэх', toggle('s-subtitles','subtitles'))}
        ${row('gold','📺','Чанар','Видео тоглуулах чанарыг сонгох', select('s-quality','quality',QUALITY_OPTS.map(q=>[q,q==='auto'?'Автомат':q])))}
        <div class="s-row" style="flex-direction:column; align-items:flex-start; cursor:default;">
          <div style="display:flex;align-items:center;gap:12px;width:100%;margin-bottom:10px;">
            <div class="s-row-icon green">🔊</div>
            <div class="s-row-text">
              <div class="s-row-title">Анхдагч дуу</div>
              <div class="s-row-sub" id="s-vol-label">${S.volume}%</div>
            </div>
          </div>
          <input type="range" class="s-slider" id="s-volume" min="0" max="100" value="${S.volume}"
            oninput="window._nabooSettings.setVol(this.value)">
          <div class="s-slider-labels"><span>0%</span><span>50%</span><span>100%</span></div>
        </div>
      </div>

      <!-- ХЭЛ -->
      <div class="s-section">
        <div class="s-section-label">🌐 Хэл & Бүс нутаг</div>
        ${row('blue','🌍','Интерфэйс хэл','Платформын харуулах хэл', select('s-language','language',LANG_OPTS))}
      </div>

      <!-- МЭДЭГДЭЛ -->
      <div class="s-section">
        <div class="s-section-label">🔔 Мэдэгдэл</div>
        ${row('gold','🔔','Push Notification','Шинэ кино гарахад мэдэгдэх', toggle('s-notifications','notifications'))}
      </div>

      <!-- АЮУЛГҮЙ БАЙДАЛ -->
      <div class="s-section">
        <div class="s-section-label">🗑️ Өгөгдөл</div>
        <button class="s-danger-btn" onclick="window._nabooSettings.clearHistory()">
          🕐 Үзсэн түүх цэвэрлэх
        </button>
        <button class="s-danger-btn" onclick="window._nabooSettings.clearWatchlist()">
          ❤️ Хадгалсан жагсаалт устгах
        </button>
      </div>

      <!-- ТУХАЙ -->
      <div class="s-section">
        <div class="s-section-label">ℹ️ Тухай</div>
        ${row('red','🚀','Nabooshy','2026 · Монголын хамгийн ухаалаг платформ','')}
        ${row('blue','📱','PWA дэмжлэг','Апп болгож суулгах боломжтой','')}
        ${row('teal','🔗','Холбоо барих','@oroodvz Telegram',
          `<a href="https://t.me/oroodvz" target="_blank" rel="noopener" style="color:var(--red);font-size:12px;font-weight:600;white-space:nowrap;">Telegram →</a>`)}
      </div>

      <div class="s-version">
        <span>⚡ Nabooshy v2.0 · 2026</span>
      </div>

    </div>
  </div>
</div>`;

  /* ── Inject modal ── */
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  /* ── Public API ── */
  window._nabooSettings = {
    open() {
      document.getElementById('settingsModal').classList.add('open');
      document.body.style.overflow = 'hidden';
    },
    close() {
      document.getElementById('settingsModal').classList.remove('open');
      document.body.style.overflow = '';
    },
    set(key, val) {
      S[key] = val;
      save(S);
      applyAll();
      if (key === 'notifications' && val) {
        if ('Notification' in window) Notification.requestPermission();
      }
    },
    setAccent(key, el) {
      S.accent = key;
      save(S);
      applyAll();
      document.querySelectorAll('.s-color-dot').forEach(d => d.classList.remove('active'));
      el.classList.add('active');
    },
    setVol(v) {
      S.volume = parseInt(v);
      save(S);
      const lbl = document.getElementById('s-vol-label');
      if (lbl) lbl.textContent = v + '%';
      if (window.HERO_VOLUME !== undefined) window.HERO_VOLUME = parseInt(v) / 100;
    },
    clearHistory() {
      if (confirm('Үзсэн түүхийг устгах уу?')) {
        localStorage.removeItem('naboo_history');
        if (window.toast) window.toast('✅ Түүх цэвэрлэгдлээ');
      }
    },
    clearWatchlist() {
      if (confirm('Хадгалсан жагсаалтыг бүгдийг устгах уу?')) {
        localStorage.removeItem('naboo_watchlist');
        window.userWatchlist = [];
        if (window.toast) window.toast('✅ Жагсаалт цэвэрлэгдлээ');
      }
    },
  };

  /* ── Touch drag to close ── */
  const sheet = document.querySelector('.settings-sheet');
  let startY = 0, isDragging = false;
  sheet.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
    isDragging = true;
  }, { passive: true });
  sheet.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const dy = e.touches[0].clientY - startY;
    if (dy > 0) sheet.style.transform = `translateY(${dy}px)`;
  }, { passive: true });
  sheet.addEventListener('touchend', e => {
    const dy = e.changedTouches[0].clientY - startY;
    sheet.style.transform = '';
    if (dy > 100) window._nabooSettings.close();
    isDragging = false;
  });

})();
