import './player-hls.js';

window.openPlayer = (m) => { _playMovie(m); };

function _playMovie(m) {
  const wrap = document.getElementById('playerWrap');
  const p2p  = document.getElementById('p2pStatus');
  if (!wrap) return;

  wrap.innerHTML = '';
  if (window.destroyHLS) window.destroyHLS();

  const videoUrl = m.embed || '';

  if (videoUrl.includes('.m3u8')) {
    if (window.playHLS) window.playHLS(videoUrl, wrap, p2p);

  } else if (/\.mp4(\?|$)/i.test(videoUrl)) {
    if (p2p) p2p.style.display = 'none';

    const video = document.createElement('video');
    video.src         = videoUrl;
    video.controls    = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';
    video.style.cssText = 'width:100%;height:100%;background:#000;outline:none;border-radius:8px;';
    wrap.style.position = 'relative';
    wrap.appendChild(video);

    const p = video.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);border-radius:8px;';
        const btn = document.createElement('button');
        btn.setAttribute('tabindex', '0');
        btn.textContent = '▶ Тоглуулах';
        btn.style.cssText = 'font-size:22px;padding:16px 36px;border-radius:10px;border:2px solid #fff;background:rgba(0,0,0,0.6);color:#fff;cursor:pointer;';
        btn.onclick = () => { overlay.remove(); video.play(); };
        btn.addEventListener('keydown', e => { if (e.key === 'Enter') btn.onclick(); });
        overlay.appendChild(btn);
        wrap.appendChild(overlay);
        setTimeout(() => btn.focus(), 150);
      });
    }

  } else if (videoUrl) {
    // Embed URL (YouTube, бусад) — iframe ашиглана
    // Гэхдээ Android TV Chrome-д шууд видео URL iframe-д тавихгүй!
    if (p2p) p2p.style.display = 'none';
    const iframe = document.createElement('iframe');
    iframe.src             = videoUrl;
    iframe.allowFullscreen = true;
    iframe.setAttribute('allow', 'autoplay; fullscreen; encrypted-media');
    iframe.style.cssText = 'width:100%;height:100%;border:none;background:#000;border-radius:8px;';
    iframe.setAttribute('tabindex', '0');
    wrap.appendChild(iframe);
  }

  if (document.getElementById('pTitle')) {
    document.getElementById('pTitle').textContent = m.title;
  }
  document.getElementById('movieModal')?.classList.remove('open');
  document.getElementById('playerModal')?.classList.add('open');

  // TV дээр "Хаах" товч руу focus — remote-ийн Back товч ажиллана
  if (window.isTV) {
    setTimeout(() => {
      const closeBtn = document.querySelector('#playerModal .mcls');
      if (closeBtn) closeBtn.focus();
    }, 300);
  }
}

window.closeM = (id) => {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
  if (id === 'playerModal') {
    const w = document.getElementById('playerWrap');
    if (w) w.innerHTML = '';
    if (window.destroyHLS) window.destroyHLS();
  }
};

window.closeMb = (e, id) => { if (e.target.id === id) window.closeM(id); };
