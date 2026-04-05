/* hero-matrix.js — NABOOSHY Matrix Background — хэзээч солигдохгүй хувилбар */

(function () {
  'use strict';

  const WORD    = 'NABOOSHY';
  const FS      = 15;
  const FPS     = 42;
  const TERM_LINES = [
    '> NABOOSHY_v7.0 initialized...',
    '> Loading content database... OK',
    '> Stream protocol: ACTIVE',
    '> Welcome back, user_',
  ];

  /* ── Canvas үүсгэх ─────────────────────────────────────────── */
  function createCanvas(hero) {
    const c = document.createElement('canvas');
    c.id = 'nabMatrixCanvas';
    c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;';
    hero.insertBefore(c, hero.firstChild);
    return c;
  }

  /* ── Matrix дусал ──────────────────────────────────────────── */
  function initMatrix(canvas) {
    const ctx  = canvas.getContext('2d');
    let cols, drops, charIdx;

    function resize() {
      canvas.width  = canvas.offsetWidth  || canvas.parentElement.offsetWidth  || 800;
      canvas.height = canvas.offsetHeight || canvas.parentElement.offsetHeight || 560;
      cols    = Math.floor(canvas.width / FS);
      drops   = Array(cols).fill(0).map(() => -(Math.random() * 50 | 0));
      charIdx = Array(cols).fill(0).map(() => Math.random() * WORD.length | 0);
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.048)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = 'bold ' + FS + 'px monospace';

      for (let i = 0; i < cols; i++) {
        const y  = drops[i] * FS;
        const ch = WORD[charIdx[i] % WORD.length];
        charIdx[i]++;

        if      (drops[i] < 2) ctx.fillStyle = '#ffffff';
        else if (drops[i] < 4) ctx.fillStyle = 'rgba(160,255,180,0.95)';
        else                   ctx.fillStyle = 'rgba(0,170,40,0.5)';

        if (y > 0) ctx.fillText(ch, i * FS, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    return setInterval(draw, FPS);
  }

  /* ── Scanlines давхарга ────────────────────────────────────── */
  function createScanlines(hero) {
    const s = document.createElement('div');
    s.id = 'nabScanlines';
    s.style.cssText = [
      'position:absolute;inset:0;z-index:4;pointer-events:none',
      'background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 4px)',
    ].join(';');
    hero.appendChild(s);
  }

  /* ── HUD булан ─────────────────────────────────────────────── */
  function createHUD(hero) {
    const positions = [
      { top:'4px',  left:'4px',  borderTop:'1px solid rgba(0,255,60,.35)', borderLeft:'1px solid rgba(0,255,60,.35)' },
      { top:'4px',  right:'4px', borderTop:'1px solid rgba(0,255,60,.35)', borderRight:'1px solid rgba(0,255,60,.35)' },
      { bottom:'4px', left:'4px',  borderBottom:'1px solid rgba(0,255,60,.35)', borderLeft:'1px solid rgba(0,255,60,.35)' },
      { bottom:'4px', right:'4px', borderBottom:'1px solid rgba(0,255,60,.35)', borderRight:'1px solid rgba(0,255,60,.35)' },
    ];
    positions.forEach(pos => {
      const d = document.createElement('div');
      Object.assign(d.style, { position:'absolute', width:'18px', height:'18px', zIndex:'12', pointerEvents:'none', ...pos });
      hero.appendChild(d);
    });
  }

  /* ── Status panel (баруун дээд) ────────────────────────────── */
  function createStatus(hero) {
    const s = document.createElement('div');
    s.id = 'nabStatus';
    s.style.cssText = 'position:absolute;top:70px;right:24px;z-index:12;text-align:right;font-family:monospace;font-size:9px;color:rgba(0,200,50,0.6);letter-spacing:1px;line-height:1.9;pointer-events:none;';
    s.innerHTML = `
      <div>SYS_STATUS: <span id="nabOnline" style="color:rgba(0,255,60,0.9);">■ ONLINE</span></div>
      <div>CONN: <span style="color:rgba(0,255,60,.7);">SECURE</span></div>
      <div>USR: <span style="color:rgba(255,255,255,.4);">ANONYMOUS</span></div>
    `;
    hero.appendChild(s);

    /* Мигдэх */
    const onlineEl = s.querySelector('#nabOnline');
    setInterval(() => {
      onlineEl.style.opacity = onlineEl.style.opacity === '0.2' ? '1' : '0.2';
    }, 900);
  }

  /* ── Terminal (зүүн доод) ──────────────────────────────────── */
  function createTerminal(hero) {
    const t = document.createElement('div');
    t.id = 'nabTerminal';
    t.style.cssText = 'position:absolute;bottom:48px;left:24px;z-index:12;font-family:monospace;font-size:10px;color:rgba(0,200,50,0.75);letter-spacing:0.5px;line-height:1.9;pointer-events:none;';
    hero.appendChild(t);

    let i = 0;
    function next() {
      if (i < TERM_LINES.length) {
        const d = document.createElement('div');
        d.textContent = TERM_LINES[i++];
        d.style.cssText = 'opacity:0;transition:opacity 0.3s;';
        t.appendChild(d);
        requestAnimationFrame(() => { d.style.opacity = '1'; });
        setTimeout(next, 950);
      } else {
        const cur = document.createElement('span');
        cur.style.cssText = 'display:inline-block;width:7px;height:11px;background:rgba(0,255,60,0.8);vertical-align:middle;margin-left:2px;';
        t.appendChild(cur);
        setInterval(() => { cur.style.opacity = cur.style.opacity === '0' ? '1' : '0'; }, 600);
      }
    }
    setTimeout(next, 800);
  }

  /* ── Виньетка override (matrix-д тохирсон) ────────────────── */
  function patchVignette() {
    const v = document.querySelector('.hero-vignette');
    if (!v) return;
    v.style.background = [
      'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
      'linear-gradient(to top, #000 0%, rgba(0,0,0,0.5) 20%, transparent 55%)',
      'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 14%)',
    ].join(',');
    v.style.zIndex = '3';
  }

  /* ── hero-bg постер байвал матриксыг бүдгэрүүлэх ──────────── */
  function watchPoster(canvas) {
    const bg = document.getElementById('heroBg');
    if (!bg) return;
    const obs = new MutationObserver(() => {
      const hasPoster = bg.style.backgroundImage && bg.style.backgroundImage !== 'none' && bg.style.opacity !== '0';
      canvas.style.opacity = hasPoster ? '0.18' : '1';
    });
    obs.observe(bg, { attributes: true, attributeFilter: ['style'] });
  }

  /* ── Nav tabs — hacker формат ──────────────────────────────── */
  function styleNavTabs() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
      const span = tab.querySelector('span:not(.tab-icon)');
      if (span && !span.dataset.nabPatched) {
        span.dataset.nabPatched = '1';
        const orig = span.textContent.trim();
        span.textContent = '[' + orig + ']';
      }
    });
    const logoName = document.querySelector('.logo-name');
    if (logoName) logoName.style.fontFamily = 'monospace';
  }

  /* ── Эхлүүлэх ─────────────────────────────────────────────── */
  function init() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const canvas = createCanvas(hero);
    initMatrix(canvas);
    createScanlines(hero);
    createHUD(hero);
    createStatus(hero);
    createTerminal(hero);
    patchVignette();
    watchPoster(canvas);
    styleNavTabs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
