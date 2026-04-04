// ============================================================
// player-bandwidth.js — Bandwidth Optimizer
// Стратеги:
//   1. BroadcastChannel → ижил сайтын бусад tab-д "чимэ" гэж зарлана
//   2. Page Visibility → tab идэвхтэй үед бүх нөөцийг видеод өгнө
//   3. requestAnimationFrame throttle → UI animation-ийг зогсооно
//   4. NetworkInformation → холболтын хурдыг мэдэж buffer тохируулна
// ============================================================

const BW_CHANNEL = new BroadcastChannel('nabooshy_bw');

// ── Бусад tab-аас ирэх мессежийг сонсох ──────────────────────
let _videoThrottleActive = false;
let _frozenFetch = null;
let _rafIds = [];

BW_CHANNEL.onmessage = (e) => {
  if (e.data === 'VIDEO_PLAYING') {
    _throttleThisTab();
  } else if (e.data === 'VIDEO_STOPPED') {
    _restoreThisTab();
  }
};

// Өөр tab-д видео эхлэхэд энэ tab-ын fetch-ийг зогсоох
function _throttleThisTab() {
  if (_videoThrottleActive) return;
  _videoThrottleActive = true;

  // 1. fetch-ийг override хийж 2 секундын хоцролттой болгох
  const originalFetch = window.fetch;
  _frozenFetch = originalFetch;
  window.fetch = (...args) => {
    return new Promise(resolve =>
      setTimeout(() => resolve(originalFetch(...args)), 2000)
    );
  };

  // 2. document.title-д анхааруулга
  document.title = '⏸ ' + document.title.replace(/^⏸ /, '');

  console.info('[BW] Энэ tab throttled — өөр tab-д видео тоглуулж байна');
}

function _restoreThisTab() {
  if (!_videoThrottleActive) return;
  _videoThrottleActive = false;
  if (_frozenFetch) { window.fetch = _frozenFetch; _frozenFetch = null; }
  document.title = document.title.replace(/^⏸ /, '');
  console.info('[BW] Энэ tab сэргэв');
}

// ── Видео эхлэхэд бусад tab-д мэдэгдэх ─────────────────────
window.__bwVideoStart = () => {
  BW_CHANNEL.postMessage('VIDEO_PLAYING');
  _boostThisTab();
};

window.__bwVideoStop = () => {
  BW_CHANNEL.postMessage('VIDEO_STOPPED');
  _unboostThisTab();
};

// ── Энэ tab-ын performance-ийг нэмэгдүүлэх ─────────────────
function _boostThisTab() {
  // 1. Гаднах зурагнуудын lazy-load-ийг түр зогсоох
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.dataset._origLoading = img.loading;
    img.loading = 'eager'; // видео дуусгаад буцааж lazy болгоно
  });

  // 2. CSS animation-ийг зогсоох (CPU чөлөөлөх)
  const style = document.createElement('style');
  style.id = '__bw_pause_anim';
  style.textContent = `
    *:not(video):not(.p2p-dot) {
      animation-play-state: paused !important;
      transition: none !important;
    }
  `;
  document.head.appendChild(style);

  // 3. Background-д байгаа scroll listener-уудыг идэвхгүй болгох
  window.__bwScrollBlocked = true;

  console.info('[BW] Энэ tab boosted — видео тоглуулж байна');
}

function _unboostThisTab() {
  // Бүгдийг сэргээх
  document.querySelectorAll('img[data-_origLoading]').forEach(img => {
    img.loading = img.dataset._origLoading || 'lazy';
    delete img.dataset._origLoading;
  });
  document.getElementById('__bw_pause_anim')?.remove();
  window.__bwScrollBlocked = false;
  console.info('[BW] Энэ tab unbooted');
}

// ── Page Visibility: tab далдлагдахад видеог buffer-лэх ──────
document.addEventListener('visibilitychange', () => {
  const hls = window._currentHls;
  if (!hls) return;

  if (document.hidden) {
    // Tab харагдахгүй болоход buffer-ийг багасгах
    try { hls.config.maxBufferLength = 10; } catch(e) {}
  } else {
    // Tab эргэж ирэхэд buffer-ийг дахин нэмэгдүүлэх
    try { hls.config.maxBufferLength = 90; } catch(e) {}
  }
});

// ── NetworkInformation: холболтын хурдыг мэдэх ──────────────
const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
window.__getBandwidthTier = () => {
  if (!conn) return 'unknown';
  const mbps = conn.downlink || 0;
  if (mbps >= 10) return 'high';
  if (mbps >= 3)  return 'medium';
  return 'low';
};

// Холболт өөрчлөгдөхөд HLS-д мэдэгдэх
if (conn) {
  conn.addEventListener('change', () => {
    const hls = window._currentHls;
    if (!hls) return;
    const tier = window.__getBandwidthTier();
    if (tier === 'low') {
      hls.currentLevel = 0; // хамгийн бага качество
    } else if (tier === 'high') {
      hls.currentLevel = -1; // auto ABR
    }
    console.info('[BW] Сүлжээний хурд:', conn.downlink, 'Mbps → tier:', tier);
  });
}

// ── openPlayer / closeM override ────────────────────────────
// player.js-ийн дараа ачааллах тул override хийнэ
document.addEventListener('DOMContentLoaded', () => {
  // Хэсэг хүлээж openPlayer бэлэн болтол
  const waitForPlayer = setInterval(() => {
    if (!window.openPlayer) return;
    clearInterval(waitForPlayer);

    const _origOpen = window.openPlayer;
    window.openPlayer = (m) => {
      window.__bwVideoStart();
      _origOpen(m);
    };

    const _origClose = window.closeM;
    window.closeM = (id) => {
      if (id === 'playerModal') window.__bwVideoStop();
      _origClose(id);
    };
  }, 100);
});
