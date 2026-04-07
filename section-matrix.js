/* section-matrix.js — NABOOSHY — Кино хэсгийн арт matrix rain */
(function () {
  'use strict';

  const FS      = 13;
  const OPACITY = 0.13;   /* 0.08–0.20 хооронд тохируулж болно */
  const COLOR   = '#00ff41';
  const CHARS   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコ0123456789@#';
  const FPS     = 30;
  const INTERVAL= 1000 / FPS;

  function attachRain(sec) {
    /* Canvas үүсгэж section доторт хийх */
    const cv = document.createElement('canvas');
    cv.className = 'sec-matrix-canvas';
    cv.style.cssText = [
      'position:absolute',
      'inset:0',
      'width:100%',
      'height:100%',
      'pointer-events:none',
      'z-index:0',
      'opacity:' + OPACITY,
    ].join(';');
    sec.insertBefore(cv, sec.firstChild);

    const ctx = cv.getContext('2d');
    let drops = [];
    let lastTime = 0;

    function resize() {
      cv.width  = sec.offsetWidth;
      cv.height = sec.offsetHeight;
      const cols = Math.floor(cv.width / FS);
      /* Одоогийн drops-ийг хадгалж шинэ баганыг 0-с эхлүүлэх */
      drops = Array.from({ length: cols }, (_, i) => drops[i] ?? Math.random() * -(cv.height / FS));
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(sec);

    function draw(ts) {
      if (ts - lastTime < INTERVAL) { requestAnimationFrame(draw); return; }
      lastTime = ts;

      /* Арыг бага зэрэг бүдгэрүүлж trail үүсгэх */
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, cv.width, cv.height);

      ctx.fillStyle = COLOR;
      ctx.font      = FS + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(ch, i * FS, drops[i] * FS);
        if (drops[i] * FS > cv.height && Math.random() > 0.97) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  }

  /* DOM бэлэн болсны дараа бүх .sec-д нэмэх */
  function init() {
    document.querySelectorAll('.sec').forEach(attachRain);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
