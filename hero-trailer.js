// hero-trailer.js
window._heroYTPlayer      = null;
window._heroMuted         = true;
window._activeTrailerType = null;

window.detectTrailerType = (url) => {
  if (!url) return null;
  if (/youtube\.com|youtu\.be/.test(url))  return 'youtube';
  if (/facebook\.com|fb\.watch/.test(url)) return 'facebook';
  if (/vimeo\.com/.test(url))              return 'vimeo';
  if (/\.mp4|\.webm/.test(url))            return 'mp4';
  return null;
};

window._getYTKey   = (url) => { const m = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/); return m ? m[1] : null; };
window._getVimeoId = (url) => { const m = url.match(/vimeo\.com\/(\d+)/); return m ? m[1] : null; };

window.playTrailer = (url, type, onReady, onEnd, onError) => {
  const cont = document.getElementById('heroVideoContainer');
  if (!cont) return;
  cont.innerHTML = '';

  if (type === 'youtube') {
    const key = window._getYTKey(url);
    if (!key) return;
    const wrap = document.createElement('div'); wrap.id = 'ytWrapper';
    const fd   = document.createElement('div'); fd.id = 'heroYTFrame';
    wrap.appendChild(fd); cont.appendChild(wrap);
    window._heroYTPlayer = new YT.Player('heroYTFrame', {
      videoId: key,
      playerVars: { autoplay:1, mute:1, controls:0, rel:0, loop:1, playlist:key, playsinline:1, modestbranding:1, iv_load_policy:3, showinfo:0, disablekb:1, fs:0 },
      events: {
        onReady:       (e) => { e.target.mute(); e.target.playVideo(); window._heroMuted = true; onReady?.(); },
        onStateChange: (e) => { if (e.data === YT.PlayerState.PLAYING) onReady?.(); if (e.data === YT.PlayerState.ENDED) onEnd?.(); },
        onError:       ()  => onError?.(),
      },
    });
    window._activeTrailerType = 'youtube';

  } else if (type === 'facebook') {
    cont.innerHTML = `<iframe src="https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&autoplay=1&mute=1"
      style="position:absolute;inset:0;width:100%;height:100%;border:none;"
      allowfullscreen allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"></iframe>`;
    cont.querySelector('iframe').onload = () => onReady?.();
    window._activeTrailerType = 'facebook';

  } else if (type === 'vimeo') {
    const id = window._getVimeoId(url); if (!id) return;
    cont.innerHTML = `<iframe src="https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1&title=0&byline=0&portrait=0"
      style="position:absolute;inset:0;width:100%;height:100%;border:none;" allowfullscreen allow="autoplay"></iframe>`;
    cont.querySelector('iframe').onload = () => onReady?.();
    window._activeTrailerType = 'vimeo';

  } else if (type === 'mp4') {
    const vid = document.createElement('video');
    Object.assign(vid, { autoplay:true, muted:true, loop:true, playsInline:true });
    vid.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;';
    vid.innerHTML = `<source src="${url}" type="video/mp4">`;
    vid.oncanplay = () => onReady?.();
    cont.appendChild(vid);
    window._activeTrailerType = 'mp4';
  }
};

window.stopTrailer = () => {
  if (window._heroYTPlayer) { try { window._heroYTPlayer.destroy(); } catch(_){} window._heroYTPlayer = null; }
  const cont = document.getElementById('heroVideoContainer');
  if (cont) cont.innerHTML = '';
  window._activeTrailerType = null;
};
