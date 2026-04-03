// ============================================================
// hero/volume.js — Hero дуу удирдлага
// ============================================================

import { ytPlayer, activeTrailerType } from './trailer.js';

export function updateVolBtn(muted) {
  const b = document.getElementById('heroVolumeBtn');
  if (!b) return;
  b.textContent = muted ? '🔇 Дууг нээх' : '🔊 Дуу хаах';
}

export function showVolBtn() {
  const b = document.getElementById('heroVolumeBtn');
  if (b) b.style.display = '';
}

export function hideVolBtn() {
  const b = document.getElementById('heroVolumeBtn');
  if (b) b.style.display = 'none';
}

// ytMuted state hero.js-с дамжуулагдана
window.toggleHeroVolume = () => {
  if (activeTrailerType === 'youtube' && ytPlayer) {
    const nowMuted = !window._heroMuted;
    window._heroMuted = nowMuted;
    nowMuted ? ytPlayer.mute() : (ytPlayer.unMute(), ytPlayer.setVolume(80));
    updateVolBtn(nowMuted);
  } else {
    const vid = document.querySelector('#heroVideoContainer video');
    if (vid) {
      vid.muted          = !vid.muted;
      window._heroMuted  = vid.muted;
      updateVolBtn(vid.muted);
    }
  }
};
