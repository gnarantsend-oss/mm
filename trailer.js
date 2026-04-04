// ============================================================
// hero/trailer.js — Trailer тодорхойлох + тоглуулах
// ============================================================

export let ytPlayer         = null;
export let ytMuted          = true;
export let activeTrailerType = null;

// ── URL төрөл тодорхойлох ────────────────────────────────
export function detectTrailerType(url) {
  if (!url) return null;
  if (/youtube\.com|youtu\.be/.test(url))  return 'youtube';
  if (/facebook\.com|fb\.watch/.test(url)) return 'facebook';
  if (/vimeo\.com/.test(url))              return 'vimeo';
  if (/\.mp4|\.webm/.test(url))            return 'mp4';
  return null;
}

export function getYouTubeKey(url) {
  const m = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

export function getVimeoId(url) {
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m ? m[1] : null;
}

// ── Trailer тоглуулах ────────────────────────────────────
export function playTrailer(url, type, hi, onReady, onEnd, onError) {
  const cont = document.getElementById('heroVideoContainer');
  if (!cont) return;
  cont.innerHTML = '';

  if (type === 'youtube') {
    const key = getYouTubeKey(url);
    if (!key) return;

    const wrapper  = document.createElement('div');
    wrapper.id     = 'ytWrapper';
    const frameDiv = document.createElement('div');
    frameDiv.id    = 'heroYTFrame';
    wrapper.appendChild(frameDiv);
    cont.appendChild(wrapper);

    ytPlayer = new YT.Player('heroYTFrame', {
      videoId: key,
      playerVars: {
        autoplay:1, mute:1, controls:0, rel:0,
        loop:1, playlist:key, playsinline:1,
        modestbranding:1, iv_load_policy:3,
        showinfo:0, disablekb:1, fs:0,
      },
      events: {
        onReady:       (e) => { e.target.mute(); e.target.playVideo(); ytMuted = true; onReady?.(); },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.PLAYING) onReady?.();
          if (e.data === YT.PlayerState.ENDED)   onEnd?.();
        },
        onError: () => onError?.(),
      },
    });
    activeTrailerType = 'youtube';

  } else if (type === 'facebook') {
    const encoded = encodeURIComponent(url);
    cont.innerHTML = `
      <iframe
        src="https://www.facebook.com/plugins/video.php?href=${encoded}&show_text=false&autoplay=1&mute=1"
        style="position:absolute;inset:0;width:100%;height:100%;border:none;"
        allowfullscreen allow="autoplay; clipboard-write; encrypted-media; picture-in-picture">
      </iframe>`;
    const fi = cont.querySelector('iframe');
    if (fi) fi.onload = () => onReady?.();
    activeTrailerType = 'facebook';

  } else if (type === 'vimeo') {
    const id = getVimeoId(url);
    if (!id) return;
    cont.innerHTML = `
      <iframe
        src="https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1&title=0&byline=0&portrait=0"
        style="position:absolute;inset:0;width:100%;height:100%;border:none;"
        allowfullscreen allow="autoplay">
      </iframe>`;
    const vi = cont.querySelector('iframe');
    if (vi) vi.onload = () => onReady?.();
    activeTrailerType = 'vimeo';

  } else if (type === 'mp4') {
    const vid = document.createElement('video');
    Object.assign(vid, { autoplay: true, muted: true, loop: true, playsInline: true });
    vid.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;';
    vid.innerHTML     = `<source src="${url}" type="video/mp4">`;
    vid.oncanplay     = () => onReady?.();
    cont.appendChild(vid);
    activeTrailerType = 'mp4';
  }
}

// ── Trailer зогсоох ──────────────────────────────────────
export function stopTrailer() {
  if (ytPlayer) { try { ytPlayer.destroy(); } catch (_) {} ytPlayer = null; }
  const cont = document.getElementById('heroVideoContainer');
  if (cont) cont.innerHTML = '';
  activeTrailerType = null;
}
