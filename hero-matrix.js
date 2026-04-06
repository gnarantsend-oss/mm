/* hero-matrix.js — NABOOSHY Matrix Background — HACKER EDITION v10 */

(function () {
  'use strict';

  const WORD    = 'NABOOSHY';
  const FS      = 15;
  const FPS     = 42;

  const TERM_LINES = [
    '> NABOOSHY_v10.0 initialized...',
    '> Establishing encrypted tunnel... [OK]',
    '> Loading content database... [OK]',
    '> Bypassing geo-restrictions... [OK]',
    '> Stream protocol: ACTIVE',
    '> Proxy chain: 3 nodes',
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
      const w = canvas.offsetWidth  || canvas.parentElement?.offsetWidth  || window.innerWidth  || 400;
      const h = canvas.offsetHeight || canvas.parentElement?.offsetHeight || window.innerHeight || 560;
      canvas.width  = w;
      canvas.height = h;
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

  /* ── Horizontal scan beam ──────────────────────────────────── */
  function createScanBeam(hero) {
    const beam = document.createElement('div');
    beam.id = 'nabScanBeam';
    beam.style.cssText = [
      'position:absolute;left:0;right:0;height:2px;z-index:5;pointer-events:none',
      'background:linear-gradient(90deg,transparent,rgba(0,255,60,0.15),rgba(0,255,100,0.4),rgba(0,255,60,0.15),transparent)',
      'box-shadow:0 0 12px rgba(0,255,60,0.3)',
      'top:0',
    ].join(';');
    hero.appendChild(beam);

    let pos = 0;
    let dir = 1;
    const heroH = () => hero.offsetHeight || 560;
    setInterval(() => {
      pos += dir * 1.8;
      if (pos >= heroH()) { pos = heroH(); dir = -1; }
      if (pos <= 0)       { pos = 0;       dir =  1; }
      beam.style.top = pos + 'px';
    }, 16);
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

    /* Targeting reticle — постерийн дунд */
    const reticle = document.createElement('div');
    reticle.id = 'nabReticle';
    reticle.style.cssText = [
      'position:absolute;top:50%;left:55%;transform:translate(-50%,-50%)',
      'width:80px;height:80px;z-index:6;pointer-events:none',
      'border:1px solid rgba(0,255,60,0.25)',
      'border-radius:50%',
    ].join(';');
    reticle.innerHTML = `
      <div style="position:absolute;top:50%;left:0;right:0;height:1px;background:rgba(0,255,60,0.2);"></div>
      <div style="position:absolute;left:50%;top:0;bottom:0;width:1px;background:rgba(0,255,60,0.2);"></div>
      <div style="position:absolute;top:-6px;left:50%;transform:translateX(-50%);width:1px;height:12px;background:rgba(0,255,60,0.5);"></div>
      <div style="position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);width:1px;height:12px;background:rgba(0,255,60,0.5);"></div>
      <div style="position:absolute;left:-6px;top:50%;transform:translateY(-50%);width:12px;height:1px;background:rgba(0,255,60,0.5);"></div>
      <div style="position:absolute;right:-6px;top:50%;transform:translateY(-50%);width:12px;height:1px;background:rgba(0,255,60,0.5);"></div>
    `;
    hero.appendChild(reticle);

    /* Reticle мигдэх */
    let rop = 1;
    setInterval(() => {
      rop = rop === 1 ? 0.3 : 1;
      reticle.style.opacity = rop;
    }, 2200);
  }

  /* ── Network stats panel (зүүн дээд доор) ─────────────────── */
  function createNetStats(hero) {
    const panel = document.createElement('div');
    panel.id = 'nabNetStats';
    panel.style.cssText = [
      'position:absolute;bottom:100px;left:24px;z-index:12',
      'font-family:monospace;font-size:9px;color:rgba(0,200,50,0.5)',
      'letter-spacing:0.8px;line-height:2;pointer-events:none',
    ].join(';');
    panel.innerHTML = `
      <div>DL: <span id="nabDL">0.00</span> MB/s</div>
      <div>UL: <span id="nabUL">0.00</span> MB/s</div>
      <div>PING: <span id="nabPing">--</span> ms</div>
    `;
    hero.appendChild(panel);

    /* Амьд тоо өөрчлөх */
    function rnd(min, max) { return (Math.random() * (max - min) + min).toFixed(2); }
    function rndInt(min, max) { return Math.floor(Math.random() * (max - min) + min); }
    setInterval(() => {
      const dl = document.getElementById('nabDL');
      const ul = document.getElementById('nabUL');
      const ping = document.getElementById('nabPing');
      if (dl)   dl.textContent   = rnd(1.2, 9.8);
      if (ul)   ul.textContent   = rnd(0.1, 2.4);
      if (ping) ping.textContent = rndInt(8, 45);
    }, 1200);
  }

  /* ── Status panel (баруун дээд) ────────────────────────────── */
  function createStatus(hero) {
    const s = document.createElement('div');
    s.id = 'nabStatus';
    s.style.cssText = 'position:absolute;top:70px;right:24px;z-index:12;text-align:right;font-family:monospace;font-size:9px;color:rgba(0,200,50,0.6);letter-spacing:1px;line-height:1.9;pointer-events:none;';
    s.innerHTML = `
      <div>SYS_STATUS: <span id="nabOnline" style="color:rgba(0,255,60,0.9);">■ ONLINE</span></div>
      <div>CONN: <span style="color:rgba(0,255,60,.7);">SECURE</span></div>
      <div>ENC: <span style="color:rgba(0,255,60,.7);">AES-256</span></div>
      <div>IP: <span id="nabIP" style="color:rgba(255,255,255,.35);">---.---.---.---</span></div>
      <div>USR: <span style="color:rgba(255,255,255,.4);">ANONYMOUS</span></div>
    `;
    hero.appendChild(s);

    /* Мигдэх */
    const onlineEl = s.querySelector('#nabOnline');
    setInterval(() => {
      onlineEl.style.opacity = onlineEl.style.opacity === '0.2' ? '1' : '0.2';
    }, 900);

    /* Fake IP scramble */
    const ipEl = s.querySelector('#nabIP');
    const fakeIPs = [
      '104.21.*.***', '172.67.*.***', '45.33.***.***',
      '138.197.**.***', '192.168.*.***',
    ];
    let ipI = 0;
    setInterval(() => {
      if (ipEl) {
        ipEl.textContent = fakeIPs[ipI++ % fakeIPs.length];
      }
    }, 3000);
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
        d.style.cssText = 'opacity:0;transition:opacity 0.3s;';
        t.appendChild(d);
        /* Typewriter per line */
        const line = TERM_LINES[i++];
        let ci = 0;
        const tw = setInterval(() => {
          d.textContent = line.slice(0, ++ci);
          if (ci >= line.length) clearInterval(tw);
        }, 28);
        requestAnimationFrame(() => { d.style.opacity = '1'; });
        setTimeout(next, 900 + line.length * 28);
      } else {
        const cur = document.createElement('span');
        cur.style.cssText = 'display:inline-block;width:7px;height:11px;background:rgba(0,255,60,0.8);vertical-align:middle;margin-left:2px;';
        t.appendChild(cur);
        setInterval(() => { cur.style.opacity = cur.style.opacity === '0' ? '1' : '0'; }, 600);
      }
    }
    setTimeout(next, 800);
  }

  /* ── Title glitch + decrypt effect ────────────────────────── */
  function glitchTitle() {
    const title = document.querySelector('.hero-title');
    if (!title || title.dataset.nabGlitch) return;
    title.dataset.nabGlitch = '1';

    const original = title.textContent.trim();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';

    function scramble(el, text, cb) {
      let iter = 0;
      const interval = setInterval(() => {
        el.textContent = text.split('').map((c, idx) => {
          if (idx < iter) return c;
          if (c === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        if (iter >= text.length) { clearInterval(interval); el.textContent = text; if (cb) cb(); }
        iter += 1.5;
      }, 35);
    }

    /* Эхний decrypt */
    setTimeout(() => scramble(title, original), 1800);

    /* Мөн 12 секунд тутам богино glitch */
    setInterval(() => {
      const saved = title.textContent;
      let g = 0;
      const gi = setInterval(() => {
        title.textContent = saved.split('').map(c => {
          if (c === ' ') return ' ';
          return Math.random() > 0.7 ? chars[Math.floor(Math.random() * chars.length)] : c;
        }).join('');
        if (++g > 6) { clearInterval(gi); title.textContent = saved; }
      }, 60);
    }, 12000);
  }

  /* ── Виньетка override ─────────────────────────────────────── */
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

  /* ── MutationObserver: title гарч ирэхэд glitch дуудах ────── */
  function observeTitle() {
    const mo = new MutationObserver(() => glitchTitle());
    const hero = document.getElementById('hero');
    if (hero) mo.observe(hero, { childList: true, subtree: true });
    glitchTitle(); /* анхны оролдлого */
  }

  /* ── Мобайл шалгах ─────────────────────────────────────────── */
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
                   window.innerWidth < 768;

  /* ── Эхлүүлэх ─────────────────────────────────────────────── */
  function init() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    /* Canvas хэмжээ зөв тооцогдохыг хүлээх */
    requestAnimationFrame(() => {
      const canvas = createCanvas(hero);
      initMatrix(canvas);
      createScanlines(hero);
      createScanBeam(hero);
      patchVignette();
      styleNavTabs();
      observeTitle();

      /* Desktop дээр л overlay элементүүд нэмнэ */
      if (!isMobile) {
        createHUD(hero);
        createStatus(hero);
        createNetStats(hero);
        createTerminal(hero);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
