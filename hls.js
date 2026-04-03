// ============================================================
// player/hls.js — HLS болон P2P тоглуулах логик
// ============================================================

let currentHls       = null;
let currentP2pEngine = null;

export function playHLS(url, wrap, p2pStatusEl) {
  const video         = document.createElement('video');
  video.style.width   = '100%';
  video.style.height  = '100%';
  video.controls      = true;
  video.autoplay      = true;
  wrap.appendChild(video);

  if (typeof p2pml !== 'undefined' && p2pml.hlsjs.Engine.isSupported()) {
    // P2P горим
    if (p2pStatusEl) {
      p2pStatusEl.style.display   = 'flex';
      p2pStatusEl.innerHTML       =
        '<div class="p2p-dot"></div> P2P Сүлжээ идэвхтэй';
      p2pStatusEl.style.color       = '#0f0';
      p2pStatusEl.style.borderColor = 'rgba(0,255,0,0.3)';
    }

    currentP2pEngine = new p2pml.hlsjs.Engine();
    currentHls       = new Hls({
      liveSyncDurationCount: 7,
      loader: currentP2pEngine.createLoaderClass(),
    });
    p2pml.hlsjs.initHlsJsPlayer(currentHls);
    currentHls.loadSource(url);
    currentHls.attachMedia(video);

  } else {
    video.src = url;
  }
}

export function destroyHLS() {
  if (currentHls) {
    currentHls.destroy();
    currentHls = null;
  }
  if (currentP2pEngine) {
    currentP2pEngine.destroy();
    currentP2pEngine = null;
  }
}
