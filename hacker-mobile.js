/* ═══════════════════════════════════════════════════════════════
   hacker-mobile.js — NABOOSHY MOBILE IMMERSION SYSTEM v1.0
   Зөвхөн мобайл төхөөрөмжид идэвхждэг
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Мобайл шалгах ───────────────────────────────────────── */
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
                   ('ontouchstart' in window && window.innerWidth < 900);
  if (!isMobile) return;

  /* ── Utility ─────────────────────────────────────────────── */
  const $ = (s) => document.querySelector(s);
  const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const rndF = (a, b) => (Math.random() * (b - a) + a).toFixed(1);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  /* ═══════════════════════════════════════════════════════════
     1. BOOT SEQUENCE — анх нэвтэрч орох үед
     ═══════════════════════════════════════════════════════════ */
  function runBoot() {
    const alreadyBooted = sessionStorage.getItem('nab_booted');
    if (alreadyBooted) return;

    const overlay = document.createElement('div');
    overlay.id = 'nabBoot';
    overlay.style.cssText = [
      'position:fixed;inset:0;z-index:99999',
      'background:#000',
      'display:flex;flex-direction:column;align-items:center;justify-content:center',
      'font-family:"Share Tech Mono",monospace',
      'padding:40px 28px',
      'transition:opacity 0.8s ease',
    ].join(';');

    overlay.innerHTML = `
      <div style="width:100%;max-width:400px">
        <div style="text-align:center;margin-bottom:32px">
          <div style="font-size:13px;color:rgba(0,255,65,0.4);letter-spacing:4px;margin-bottom:8px">NABOOSHY SYSTEM</div>
          <div id="nabBootTitle" style="font-size:28px;color:#00ff41;letter-spacing:3px;text-shadow:0 0 20px rgba(0,255,65,0.7)">INITIALIZING</div>
        </div>
        <div id="nabBootLog" style="font-size:11px;color:rgba(0,255,65,0.6);line-height:2.2;letter-spacing:0.5px;min-height:220px"></div>
        <div style="margin-top:28px">
          <div style="font-size:9px;color:rgba(0,255,65,0.3);letter-spacing:2px;margin-bottom:8px" id="nabBootPct">0%</div>
          <div style="height:2px;background:rgba(0,255,65,0.1);width:100%">
            <div id="nabBootBar" style="height:100%;width:0%;background:#00ff41;transition:width 0.4s ease;box-shadow:0 0 8px rgba(0,255,65,0.8)"></div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    /* Vibrate — эхний мэдэгдэл */
    if (navigator.vibrate) navigator.vibrate([80, 40, 80]);

    const bootLines = [
      { t: 300,  txt: '> Initializing NABOOSHY core...',           ok: true,  pct: 8 },
      { t: 700,  txt: '> Scanning device fingerprint...',           ok: true,  pct: 16 },
      { t: 1100, txt: '> Establishing encrypted tunnel...',         ok: true,  pct: 26 },
      { t: 1600, txt: '> Routing through proxy chain [3 nodes]...', ok: true,  pct: 38 },
      { t: 2000, txt: '> Loading content database [47,203 files]...',ok: true, pct: 52 },
      { t: 2400, txt: '> Bypassing geo-restrictions...',            ok: true,  pct: 62 },
      { t: 2800, txt: '> Decrypting stream protocols...',           ok: true,  pct: 74 },
      { t: 3200, txt: '> Verifying anonymous session...',           ok: true,  pct: 84 },
      { t: 3700, txt: '> Injecting security layer...',              ok: true,  pct: 93 },
      { t: 4200, txt: '> System ready.',                            ok: true,  pct: 100 },
    ];

    const log = document.getElementById('nabBootLog');
    const bar = document.getElementById('nabBootBar');
    const pct = document.getElementById('nabBootPct');

    bootLines.forEach(({ t, txt, ok, pct: p }) => {
      setTimeout(() => {
        const d = document.createElement('div');
        d.style.cssText = 'opacity:0;transition:opacity 0.2s';
        d.innerHTML = txt + (ok ? ' <span style="color:#00ff41">[OK]</span>' : '');
        log.appendChild(d);
        requestAnimationFrame(() => d.style.opacity = '1');
        bar.style.width = p + '%';
        pct.textContent = p + '%';
        if (navigator.vibrate && p === 100) navigator.vibrate([60, 30, 120, 30, 200]);
      }, t);
    });

    setTimeout(() => {
      const title = document.getElementById('nabBootTitle');
      if (title) title.textContent = 'ACCESS GRANTED';
      if (title) title.style.color = '#00ffcc';
    }, 4400);

    setTimeout(() => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.remove();
        document.body.style.overflow = '';
        sessionStorage.setItem('nab_booted', '1');
        showLiveFeed();
      }, 800);
    }, 5200);
  }

  /* ═══════════════════════════════════════════════════════════
     2. LIVE ACTIVITY FEED — хаана ч харагдах floating ticker
     ═══════════════════════════════════════════════════════════ */
  const feedMessages = [
    () => `> USER_${rnd(1000,9999)} connected from ${pick(['Japan','Germany','Brazil','UK','France','Korea','Australia'])}`,
    () => `> Stream active: ${rnd(89,847)} users watching now`,
    () => `> New content detected: ${rnd(3,21)} titles indexed`,
    () => `> Proxy node rotated → ${pick(['Amsterdam','Singapore','Frankfurt','Tokyo','London'])}`,
    () => `> Encrypted packet: ${rnd(128,999)} MB/s throughput`,
    () => `> Content scan: ${rnd(100,999)} new releases found`,
    () => `> Security check: PASSED ✓`,
    () => `> Bandwidth allocated: ${rndF(2.1,9.8)} MB/s`,
    () => `> Cache refresh: ${rnd(200,800)} items updated`,
    () => `> Ping optimized: ${rnd(8,42)} ms latency`,
    () => `> Anonymous session active: ${rnd(1,59)}m ${rnd(1,59)}s`,
    () => `> CDN node: ${pick(['EU-WEST','ASIA-PAC','US-EAST','AF-SOUTH'])} selected`,
  ];

  function showLiveFeed() {
    const feed = document.createElement('div');
    feed.id = 'nabLiveFeed';
    feed.style.cssText = [
      'position:fixed;bottom:0;left:0;right:0;z-index:800',
      'background:linear-gradient(to top,rgba(2,10,2,0.97),rgba(2,10,2,0.85))',
      'border-top:1px solid rgba(0,255,65,0.2)',
      'padding:6px 16px 6px',
      'padding-bottom:calc(6px + env(safe-area-inset-bottom,0px))',
      'overflow:hidden;height:36px',
      'pointer-events:none',
    ].join(';');

    const ticker = document.createElement('div');
    ticker.id = 'nabTicker';
    ticker.style.cssText = [
      'font-family:"Share Tech Mono",monospace',
      'font-size:10px;color:rgba(0,255,65,0.6);letter-spacing:0.5px',
      'white-space:nowrap;overflow:hidden;text-overflow:ellipsis',
      'display:flex;align-items:center;gap:8px',
    ].join(';');

    const dot = document.createElement('span');
    dot.style.cssText = 'width:6px;height:6px;background:#00ff41;border-radius:50%;flex-shrink:0;display:inline-block;box-shadow:0 0 6px rgba(0,255,65,0.8)';
    ticker.appendChild(dot);

    const txt = document.createElement('span');
    txt.id = 'nabTickerTxt';
    ticker.appendChild(txt);

    feed.appendChild(ticker);

    /* Bottom nav дээр байвал safe area авна */
    const bnav = document.getElementById('bottomNav');
    if (bnav && getComputedStyle(bnav).display !== 'none') {
      feed.style.bottom = '62px';
    }

    document.body.appendChild(feed);

    /* Dot мигдэх */
    setInterval(() => {
      dot.style.opacity = dot.style.opacity === '0' ? '1' : '0';
    }, 800);

    /* Мессеж эргэлдэх */
    let mi = 0;
    function rotateFeed() {
      const el = document.getElementById('nabTickerTxt');
      if (!el) return;
      el.style.transition = 'opacity 0.3s';
      el.style.opacity = '0';
      setTimeout(() => {
        el.textContent = feedMessages[mi++ % feedMessages.length]();
        el.style.opacity = '1';
      }, 300);
    }
    rotateFeed();
    setInterval(rotateFeed, 4000);
  }

  /* ═══════════════════════════════════════════════════════════
     3. DEVICE SENSORS — gyro/accelerometer → matrix tilt
     ═══════════════════════════════════════════════════════════ */
  function initSensors() {
    const canvas = document.getElementById('nabMatrixCanvas');
    if (!canvas) return;

    let lastBeta = 0, lastGamma = 0;

    function handleOrientation(e) {
      const beta  = e.beta  || 0;   /* өмнөд-хойд тэнхлэг */
      const gamma = e.gamma || 0;   /* зүүн-баруун тэнхлэг */

      /* Гөлгөр хөдөлгөөн */
      lastBeta  += (beta  - lastBeta)  * 0.08;
      lastGamma += (gamma - lastGamma) * 0.08;

      /* Canvas-ийн perspective transform */
      const rx = Math.max(-12, Math.min(12, lastBeta  * 0.3));
      const ry = Math.max(-12, Math.min(12, lastGamma * 0.3));
      canvas.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      canvas.style.transformOrigin = 'center center';
    }

    if (typeof DeviceOrientationEvent !== 'undefined') {
      /* iOS 13+ requires permission */
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        /* Permission-ийг touch event дээр асуух */
        document.addEventListener('touchend', function askPerm() {
          DeviceOrientationEvent.requestPermission()
            .then(state => {
              if (state === 'granted') {
                window.addEventListener('deviceorientation', handleOrientation, { passive: true });
              }
            }).catch(() => {});
          document.removeEventListener('touchend', askPerm);
        }, { once: true });
      } else {
        window.addEventListener('deviceorientation', handleOrientation, { passive: true });
      }
    }
  }

  /* ═══════════════════════════════════════════════════════════
     4. TOUCH RIPPLE — хүрэх бүрт matrix ripple
     ═══════════════════════════════════════════════════════════ */
  function initTouchRipple() {
    document.addEventListener('touchstart', function(e) {
      const touch = e.touches[0];
      const ripple = document.createElement('div');
      ripple.style.cssText = [
        'position:fixed;pointer-events:none;z-index:99998',
        `left:${touch.clientX}px;top:${touch.clientY}px`,
        'width:0;height:0',
        'border-radius:50%',
        'border:1.5px solid rgba(0,255,65,0.7)',
        'transform:translate(-50%,-50%)',
        'box-shadow:0 0 8px rgba(0,255,65,0.4)',
        'animation:nabRipple 0.6s ease-out forwards',
      ].join(';');
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    }, { passive: true });

    /* CSS animation inject */
    if (!document.getElementById('nabRippleStyle')) {
      const s = document.createElement('style');
      s.id = 'nabRippleStyle';
      s.textContent = `
        @keyframes nabRipple {
          0%   { width:0;height:0;opacity:1; }
          100% { width:80px;height:80px;opacity:0; }
        }
        @keyframes nabGlitchFlash {
          0%,100% { transform:none; opacity:1; }
          10% { transform:translateX(-3px) skewX(-2deg); opacity:0.9; }
          20% { transform:translateX(3px) skewX(2deg); }
          30% { transform:translateX(-2px); opacity:0.95; }
          40% { transform:none; }
          50% { transform:translateY(-2px) skewY(1deg); }
          60% { transform:translateY(2px); opacity:0.92; }
          70% { transform:none; }
          80% { transform:translateX(1px) skewX(-1deg); }
          90% { transform:none; opacity:1; }
        }
        @keyframes nabSignalIn {
          0%   { transform:translateY(100%); opacity:0; }
          100% { transform:translateY(0);    opacity:1; }
        }
        @keyframes nabSignalOut {
          0%   { transform:translateY(0);    opacity:1; }
          100% { transform:translateY(-100%);opacity:0; }
        }
      `;
      document.head.appendChild(s);
    }
  }

  /* ═══════════════════════════════════════════════════════════
     5. DEVICE HUD — battery, network, GPS
     ═══════════════════════════════════════════════════════════ */
  function initDeviceHUD() {
    const hud = document.createElement('div');
    hud.id = 'nabDevHUD';
    hud.style.cssText = [
      'position:fixed;top:64px;right:12px;z-index:850',
      'font-family:"Share Tech Mono",monospace',
      'font-size:8.5px;color:rgba(0,255,65,0.45)',
      'letter-spacing:0.8px;line-height:2',
      'text-align:right;pointer-events:none',
      'text-shadow:0 0 6px rgba(0,255,65,0.3)',
    ].join(';');
    document.body.appendChild(hud);

    async function updateHUD() {
      let bat = '';
      let net = '';

      /* Battery API */
      if (navigator.getBattery) {
        try {
          const b = await navigator.getBattery();
          const lvl = Math.round(b.level * 100);
          const chg = b.charging ? '⚡' : '';
          bat = `BAT: ${chg}${lvl}%`;
        } catch(e) {}
      }

      /* Network */
      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (conn) {
        const type = (conn.effectiveType || conn.type || '').toUpperCase();
        net = `NET: ${type || 'ONLINE'}`;
      } else {
        net = `NET: ${navigator.onLine ? 'ONLINE' : 'OFFLINE'}`;
      }

      const time = new Date().toTimeString().slice(0,8);

      hud.innerHTML = [
        bat ? `<div>${bat}</div>` : '',
        `<div>${net}</div>`,
        `<div>TIME: ${time}</div>`,
        `<div>SEC: <span style="color:#00ff41">✓ ON</span></div>`,
      ].join('');
    }

    updateHUD();
    setInterval(updateHUD, 10000);
  }

  /* ═══════════════════════════════════════════════════════════
     6. INCOMING SIGNAL — "intercept" notification
     ═══════════════════════════════════════════════════════════ */
  const signals = [
    { title: 'SIGNAL INTERCEPTED', body: 'New encrypted stream available' },
    { title: 'PROXY ROTATED',      body: 'Location masked → Frankfurt' },
    { title: 'CONTENT UNLOCKED',   body: '14 geo-blocked titles accessed' },
    { title: 'SECURE TUNNEL',      body: 'AES-256 encryption active' },
    { title: 'SYSTEM ALERT',       body: 'Anonymous mode: verified' },
    { title: 'DATA STREAM',        body: `${rnd(200,900)} MB/s throughput active` },
    { title: 'USER VERIFIED',      body: 'Identity masked successfully' },
    { title: 'SCAN COMPLETE',      body: `${rnd(40,200)} new titles indexed tonight` },
  ];

  function showSignal() {
    const sig = pick(signals);
    const el = document.createElement('div');
    el.style.cssText = [
      'position:fixed;left:16px;right:16px;z-index:99900',
      'bottom:90px',
      'background:rgba(2,10,2,0.97)',
      'border:1px solid rgba(0,255,65,0.4)',
      'border-left:3px solid #00ff41',
      'padding:12px 16px',
      'font-family:"Share Tech Mono",monospace',
      'animation:nabSignalIn 0.3s ease-out forwards',
      'box-shadow:0 0 20px rgba(0,255,65,0.15),0 8px 32px rgba(0,0,0,0.8)',
    ].join(';');
    el.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
        <span style="width:6px;height:6px;background:#00ff41;border-radius:50%;display:inline-block;box-shadow:0 0 6px rgba(0,255,65,0.8)"></span>
        <span style="font-size:9px;color:#00ff41;letter-spacing:2px">${sig.title}</span>
      </div>
      <div style="font-size:11px;color:rgba(0,255,65,0.6);letter-spacing:0.5px">${sig.body}</div>
    `;

    /* Bottom nav дээр байрлуулах */
    const bnav = document.getElementById('bottomNav');
    if (bnav && getComputedStyle(bnav).display !== 'none') {
      el.style.bottom = '160px';
    }

    document.body.appendChild(el);

    if (navigator.vibrate) navigator.vibrate([30, 20, 60]);

    setTimeout(() => {
      el.style.animation = 'nabSignalOut 0.3s ease-in forwards';
      setTimeout(() => el.remove(), 320);
    }, 3500);
  }

  /* ═══════════════════════════════════════════════════════════
     7. SCREEN GLITCH — хааяа нэг дэлгэц мужирна
     ═══════════════════════════════════════════════════════════ */
  function triggerGlitch() {
    const hero = document.getElementById('hero') || document.querySelector('main');
    if (!hero) return;

    const glitch = document.createElement('div');
    glitch.style.cssText = [
      'position:fixed;inset:0;z-index:99000;pointer-events:none',
      'animation:nabGlitchFlash 0.5s ease-out forwards',
    ].join(';');

    /* Хэд хэдэн horizontal bar */
    for (let i = 0; i < 4; i++) {
      const bar = document.createElement('div');
      const h = rnd(2, 12);
      const t = rnd(5, 90);
      bar.style.cssText = [
        `position:absolute;left:0;right:0;top:${t}%;height:${h}px`,
        `background:rgba(0,255,65,${(Math.random() * 0.15 + 0.03).toFixed(2)})`,
        `transform:translateX(${rnd(-20,20)}px)`,
      ].join(';');
      glitch.appendChild(bar);
    }

    /* RGB split overlay */
    const rgb = document.createElement('div');
    rgb.style.cssText = [
      'position:absolute;inset:0;mix-blend-mode:screen',
      'background:linear-gradient(transparent 30%,rgba(0,255,65,0.03) 30.5%,transparent 31%)',
      'animation:nabGlitchFlash 0.5s ease-out forwards',
    ].join(';');
    glitch.appendChild(rgb);

    document.body.appendChild(glitch);
    if (navigator.vibrate) navigator.vibrate(15);
    setTimeout(() => glitch.remove(), 550);
  }

  /* ═══════════════════════════════════════════════════════════
     8. PLAYER HAPTIC — кино нээхэд vibrate
     ═══════════════════════════════════════════════════════════ */
  function initPlayerHaptic() {
    document.addEventListener('click', function(e) {
      /* Play товч дарахад */
      if (e.target.closest('.btn-watch') || e.target.closest('.mcard-play')) {
        if (navigator.vibrate) navigator.vibrate([40, 20, 80, 20, 40]);
      }
      /* Карт дарахад */
      if (e.target.closest('.mcard')) {
        if (navigator.vibrate) navigator.vibrate(20);
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════
     9. BOTTOM NAV HACKER STYLE — sync
     ═══════════════════════════════════════════════════════════ */
  function hackBottomNav() {
    const bnav = document.getElementById('bottomNav');
    if (!bnav) return;

    /* Border green болгох */
    bnav.style.borderTop = '1px solid rgba(0,255,65,0.2)';
    bnav.style.background = 'rgba(2,10,2,0.97)';
    bnav.style.boxShadow = '0 -4px 20px rgba(0,255,65,0.05)';

    /* Observer: active өөрчлөгдөхөд vibrate */
    const mo = new MutationObserver(() => {
      if (navigator.vibrate) navigator.vibrate(12);
    });
    document.querySelectorAll('.bnav-item').forEach(item => {
      mo.observe(item, { attributes: true, attributeFilter: ['class'] });
    });
  }

  /* ═══════════════════════════════════════════════════════════
     INIT — бүгдийг дуудах
     ═══════════════════════════════════════════════════════════ */
  function init() {
    initTouchRipple();
    initSensors();
    initDeviceHUD();
    initPlayerHaptic();

    /* Boot нэмэлт хугацааг хүлээх */
    const bootDelay = 200;
    setTimeout(runBoot, bootDelay);

    /* Boot дууссаны дараа signal эхлүүлэх */
    const bootDuration = 6000;
    setTimeout(() => {
      hackBottomNav();
      /* Эхний signal */
      setTimeout(showSignal, rnd(15000, 25000));
      /* Цааш нь тогтмол */
      setInterval(() => showSignal(), rnd(40000, 70000));
      /* Glitch */
      setInterval(() => {
        if (Math.random() > 0.5) triggerGlitch();
      }, rnd(30000, 55000));
    }, bootDuration);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
