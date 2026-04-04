// player.js — NABOOSHY Видео Тоглуулагч
import './player-hls.js';

const WORKER_URL = window.location.origin;

window.openPlayer = (m) => {
  _playMovie(m);
};

function _playMovie(m) {
  const wrap = document.getElementById('playerWrap');
  const p2p  = document.getElementById('p2pStatus');
  if (!wrap) return;

  wrap.innerHTML = '';
  if (window.destroyHLS) window.destroyHLS();

  let videoUrl = m.embed || '';

  if (videoUrl && !videoUrl.startsWith('http')) {
    const cleanPath = videoUrl.startsWith('/') ? videoUrl.substring(1) : videoUrl;
    videoUrl = WORKER_URL + '/' + encodeURI(cleanPath);
  }

  if (videoUrl.includes('.m3u8')) {
    if (window.playHLS) window.playHLS(videoUrl, wrap, p2p);
  } else if (videoUrl.toLowerCase().endsWith('.mp4') || videoUrl.includes('.mp4?')) {
    if (p2p) p2p.style.display = 'none';
    wrap.innerHTML = `<video src="${videoUrl}" controls autoplay crossorigin="anonymous" playsinline
      style="width:100%;height:100%;background:#000;outline:none;border-radius:8px;">
      Таны хөтөч видео тоглуулах боломжгүй байна.
    </video>`;
  } else if (videoUrl) {
    if (p2p) p2p.style.display = 'none';
    wrap.innerHTML = `<iframe src="${videoUrl}" allowfullscreen style="width:100%;height:100%;border:none;background:#000;border-radius:8px;"></iframe>`;
  }

  if (document.getElementById('pTitle')) document.getElementById('pTitle').textContent = m.title;
  document.getElementById('movieModal')?.classList.remove('open');
  document.getElementById('playerModal')?.classList.add('open');
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
