/* hero-matrix.js — NABOOSHY Matrix Background — HACKER EDITION v10 */

(function () {
  'use strict';

  const WORD    = 'NABOOSHY';
  const FS      = 15;
  const FPS     = 42;

  const TERM_LINES = [
    '> nabooshy site та нэвтэрсэн байна...',
    '> nabooshy таний байршлыг тогтоож байна.......',
    '> байрлал олдлоо... [OK]',
    '> бүх мэдээллийг цуглуулж байна... [OK]',
    '> хамтарч ажиллах бол gnarantsend@gmail',
    '> өөрийн бизнесэ хөгжүүлэх бол site-д байрлуулна',
  ];

  /* ── Canvas үүсгэх ─────────────────────────────────────────── */
  function createCanvas(hero) {
    const c = document.createElement('canvas');
    c.id = 'nabMatrixCanvas';
    c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;';
    hero.insertBefore(c, hero.firstChild);
    return c;
  }

  /* ── Circuit board арын давхарга ───────────────────────────── */
  function initCircuit(canvas) {
    const ctx = canvas.getContext('2d');
    const nodes = [];
    const lines = [];
    const pulses = [];

    function buildGraph() {
      nodes.length = 0; lines.length = 0; pulses.length = 0;
      const gx = Math.floor(canvas.width  / 80);
      const gy = Math.floor(canvas.height / 70);
      for (let x = 0; x <= gx; x++) {
        for (let y = 0; y <= gy; y++) {
          if (Math.random() > 0.45) continue;
          nodes.push({
            x: x * 80 + (Math.random() - 0.5) * 30,
            y: y * 70 + (Math.random() - 0.5) * 25,
          });
        }
      }
      /* Ойр зангилаануудыг холбох */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 120 && Math.random() > 0.5) {
            lines.push({ a: i, b: j, opacity: 0.08 + Math.random() * 0.12 });
          }
        }
      }
      /* Пульс урсгалууд */
      for (let k = 0; k < Math.min(18, lines.length); k++) {
        const li = Math.floor(Math.random() * lines.length);
        pulses.push({ line: li, t: Math.random(), speed: 0.003 + Math.random() * 0.006, size: 2 + Math.random() * 2 });
      }
    }

    buildGraph();
    window.addEventListener('resize', buildGraph);

    function drawCircuit() {
      /* Lines */
      lines.forEach(l => {
        const a = nodes[l.a], b = nodes[l.b];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        /* 90° эргэлт — circuit board шиг */
        const mx = Math.abs(b.x - a.x) > Math.abs(b.y - a.y) ? b.x : a.x;
        const my = Math.abs(b.x - a.x) > Math.abs(b.y - a.y) ? a.y : b.y;
        ctx.lineTo(mx, my);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(180,0,0,${l.opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      /* Nodes */
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200,30,0,0.25)';
        ctx.fill();
      });

      /* Пульс — улаан гэрэл урсах */
      pulses.forEach(p => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;
        const l = lines[p.line];
        if (!l) return;
        const a = nodes[l.a], b = nodes[l.b];
        const mx = Math.abs(b.x - a.x) > Math.abs(b.y - a.y) ? b.x : a.x;
        const my = Math.abs(b.x - a.x) > Math.abs(b.y - a.y) ? a.y : b.y;
        /* t дагуу байрлал тооцох */
        let px, py;
        if (p.t < 0.5) {
          px = a.x + (mx - a.x) * (p.t * 2);
          py = a.y + (my - a.y) * (p.t * 2);
        } else {
          px = mx + (b.x - mx) * ((p.t - 0.5) * 2);
          py = my + (b.y - my) * ((p.t - 0.5) * 2);
        }
        const grad = ctx.createRadialGradient(px, py, 0, px, py, p.size * 4);
        grad.addColorStop(0, 'rgba(255,60,0,0.9)');
        grad.addColorStop(0.4, 'rgba(200,0,0,0.4)');
        grad.addColorStop(1, 'rgba(200,0,0,0)');
        ctx.beginPath();
        ctx.arc(px, py, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });
    }

    return drawCircuit;
  }

  /* ── Matrix дусал ──────────────────────────────────────────── */
  function initMatrix(canvas) {
    const ctx  = canvas.getContext('2d');
    let cols, drops, charIdx;
    let drawCircuit;

    function resize() {
      const w = canvas.offsetWidth  || canvas.parentElement?.offsetWidth  || window.innerWidth  || 400;
      const h = canvas.offsetHeight || canvas.parentElement?.offsetHeight || window.innerHeight || 560;
      canvas.width  = w;
      canvas.height = h;
      cols    = Math.floor(canvas.width / FS);
      drops   = Array(cols).fill(0).map(() => -(Math.random() * 50 | 0));
      charIdx = Array(cols).fill(0).map(() => Math.random() * WORD.length | 0);
      drawCircuit = initCircuit(canvas);
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.048)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      /* Circuit board арын давхарга */
      if (drawCircuit) drawCircuit();
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
      // observeTitle(); // hero title removed

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
