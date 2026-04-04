// player-hls.js
window._currentHls       = null;
window._currentP2pEngine = null;

window.playHLS = (url, wrap, p2pStatusEl) => {
  const video = document.createElement('video');
  video.style.width = '100%'; video.style.height = '100%';
  video.controls = true; video.autoplay = true;
  wrap.appendChild(video);

  if (typeof p2pml !== 'undefined' && p2pml.hlsjs.Engine.isSupported()) {
    if (p2pStatusEl) {
      p2pStatusEl.style.display = 'flex';
      p2pStatusEl.innerHTML = '<div class="p2p-dot"></div> P2P Сүлжээ идэвхтэй';
      p2pStatusEl.style.color = '#0f0'; p2pStatusEl.style.borderColor = 'rgba(0,255,0,0.3)';
    }
    window._currentP2pEngine = new p2pml.hlsjs.Engine();
    window._currentHls = new Hls({ liveSyncDurationCount:7, loader: window._currentP2pEngine.createLoaderClass() });
    p2pml.hlsjs.initHlsJsPlayer(window._currentHls);
    window._currentHls.loadSource(url); window._currentHls.attachMedia(video);
  } else {
    video.src = url;
  }
};

window.destroyHLS = () => {
  if (window._currentHls)       { window._currentHls.destroy();       window._currentHls = null; }
  if (window._currentP2pEngine) { window._currentP2pEngine.destroy(); window._currentP2pEngine = null; }
};
