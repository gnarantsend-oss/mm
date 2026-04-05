import './tv-detect.js';

window._currentHls       = null;
window._currentP2pEngine = null;

// Android TV дээр Chrome байгаа эсэхийг шалгана
// Chrome нь MSE дэмждэг тул HLS.js ажиллана — iframe ШААРДЛАГАГҮЙ
const isChrome = /Chrome/.test(navigator.userAgent) && !/Edg/.test(navigator.userAgent);
const isTVChrome = window.isTV && isChrome;

window.playHLS = (url, wrap, p2pStatusEl) => {
  const video = document.createElement('video');
  video.style.width    = '100%';
  video.style.height   = '100%';
  video.controls       = true;
  video.playsInline    = true;
  wrap.appendChild(video);

  const tryPlay = () => {
    const p = video.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => _showPlayOverlay(wrap, video));
    }
  };

  // ── Android TV Chrome — HLS.js ажиллана (MSE дэмждэг) ──────
  // iframe ашиглахгүй! Chrome iframe доторх видео URL-г
  // таслаад өөрийн player-т нээдэг
  if (isTVChrome || !window.isTV) {
    if (p2pStatusEl) {
      p2pStatusEl.style.display  = 'flex';
      p2pStatusEl.innerHTML      = '<div class="p2p-dot"></div> Ачааллаж байна...';
      p2pStatusEl.style.color    = '#fff';
    }

    if (typeof Hls !== 'undefined' && Hls.isSupported()) {
      window._currentHls = new Hls({ liveSyncDurationCount: 7 });
      window._currentHls.loadSource(url);
      window._currentHls.attachMedia(video);
      window._currentHls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (p2pStatusEl) {
          p2pStatusEl.innerHTML      = '<div class="p2p-dot"></div> Тоглуулж байна';
          p2pStatusEl.style.color    = '#0f0';
          p2pStatusEl.style.borderColor = 'rgba(0,255,0,0.3)';
        }
        tryPlay();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari / Apple TV
      video.src = url;
      video.addEventListener('loadedmetadata', tryPlay, { once: true });
    } else {
      video.src = url;
      tryPlay();
    }
    return;
  }

  // ── TV биш Chrome биш (хуучин Tizen / WebOS) — iframe fallback ─
  if (p2pStatusEl) p2pStatusEl.style.display = 'none';
  wrap.innerHTML = '';
  const iframe = document.createElement('iframe');
  iframe.src             = url;
  iframe.allowFullscreen = true;
  iframe.style.cssText   = 'width:100%;height:100%;border:none;background:#000;border-radius:8px;';
  iframe.setAttribute('allow', 'autoplay; fullscreen');
  wrap.appendChild(iframe);
};

// ── Play overlay — OK товчоор дарна ─────────────────────────
function _showPlayOverlay(wrap, video) {
  if (wrap.querySelector('.tv-play-overlay')) return;
  const overlay = document.createElement('div');
  overlay.className = 'tv-play-overlay';
  overlay.style.cssText = `
    position:absolute;inset:0;display:flex;align-items:center;
    justify-content:center;background:rgba(0,0,0,0.5);z-index:10;border-radius:8px;`;

  const btn = document.createElement('button');
  btn.setAttribute('tabindex', '0');
  btn.style.cssText = `
    display:flex;flex-direction:column;align-items:center;gap:12px;
    background:rgba(0,0,0,0.7);border:2px solid #fff;border-radius:12px;
    padding:20px 40px;cursor:pointer;color:#fff;font-size:20px;`;
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" width="64" height="64">
      <circle cx="12" cy="12" r="11" fill="none" stroke="#fff" stroke-width="1.5"/>
      <polygon points="9,7 19,12 9,17" fill="white"/>
    </svg>
    <span>OK дарж тоглуулах</span>`;

  const play = () => { overlay.remove(); video.play(); };
  btn.addEventListener('click',   play);
  btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.keyCode === 13) play(); });

  overlay.appendChild(btn);
  wrap.style.position = 'relative';
  wrap.appendChild(overlay);
  setTimeout(() => btn.focus(), 150);
}

window.destroyHLS = () => {
  if (window._currentHls) { window._currentHls.destroy(); window._currentHls = null; }
};
