window.updateVolBtn = (muted) => {
  const b = document.getElementById('heroVolumeBtn');
  if (b) b.textContent = muted ? '🔇 Дууг нээх' : '🔊 Дуу хаах';
};
window.showVolBtn = () => { const b = document.getElementById('heroVolumeBtn'); if (b) b.style.display = ''; };
window.hideVolBtn = () => { const b = document.getElementById('heroVolumeBtn'); if (b) b.style.display = 'none'; };

window.toggleHeroVolume = () => {
  if (window._activeTrailerType === 'youtube' && window._heroYTPlayer) {
    const nowMuted = !window._heroMuted;
    window._heroMuted = nowMuted;
    nowMuted ? window._heroYTPlayer.mute() : (window._heroYTPlayer.unMute(), window._heroYTPlayer.setVolume(80));
    window.updateVolBtn(nowMuted);
  } else {
    const vid = document.querySelector('#heroVideoContainer video');
    if (vid) { vid.muted = !vid.muted; window._heroMuted = vid.muted; window.updateVolBtn(vid.muted); }
  }
};
