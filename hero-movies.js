import { showPoster, hidePoster, animateContent, startProgress } from './hero-utils.js';

let hi   = 0;
let hInt = null;

export function startSlide() {
  clearInterval(hInt);
  hInt = setInterval(() => {
    const cont = document.getElementById('heroVideoContainer');
    if (!cont?.hasChildNodes()) {
      window.setHero((hi + 1) % window.HERO_MOVIES.length);
    }
  }, window.HERO_TIMER || 12000);
}

window.setHero = async (i) => {
  hi = i;
  const m = window.HERO_MOVIES?.[i];
  if (!m) return;

  document.querySelectorAll('.hero-dot').forEach((d, idx) =>
    d.classList.toggle('active', idx === i));

  const te = document.getElementById('heroTitle');
  if (te) te.textContent = m.title;

  const descEl = document.getElementById('heroDesc');
  if (descEl) descEl.textContent = m.overview || '';

  const metaEl = document.getElementById('heroMeta');
  if (metaEl) {
    const genreTags = m.cat
      ? m.cat.split(',').map(g => `<span class="tag">${g.trim()}</span>`).join('')
      : '';
    metaEl.innerHTML = `
      <span class="star">★ ${m.rating}</span>
      <span>${m.year}</span>
      ${genreTags}
    `;
  }

  animateContent();
  startProgress();
  window.stopTrailer();

  
  showPoster(m.poster);
  window.hideVolBtn();
  window._heroMuted = true;
  window.updateVolBtn(true);

  
  _loadTrailerAsync(m, i);
};

async function _loadTrailerAsync(m, slideIndex) {
  let trailerUrl = m.trailer || null;

  if (!trailerUrl && m.tmdbId) {
    trailerUrl = await window.fetchTrailerKey(m.tmdbId);
    
    if (trailerUrl) m.trailer = trailerUrl;
  }

  
  if (hi !== slideIndex) return;

  if (trailerUrl) {
    const type = window.detectTrailerType(trailerUrl);
    if (type) {
      window.playTrailer(
        trailerUrl, type,
        () => { hidePoster(); window.showVolBtn(); },
        () => window.setHero((slideIndex + 1) % window.HERO_MOVIES.length),
        () => { showPoster(m.poster); window.hideVolBtn(); }
      );
    }
  }
}

window.initHero = function () {
  if (!window.HERO_MOVIES?.length) return;
  window.hideVolBtn();

  const tag = document.getElementById('heroTag');
  if (tag) tag.textContent = '🔥 ДЭЛХИЙН ШИЛДЭГ';

  const btns = document.getElementById('heroBtns');
  if (btns) {
    btns.innerHTML = `
      <button class="btn-volume" id="heroVolumeBtn" onclick="toggleHeroVolume()">🔇 Дууг нээх</button>`;
  }

  const dotsEl = document.getElementById('heroDots');
  if (dotsEl) {
    dotsEl.innerHTML = '';
    window.HERO_MOVIES.forEach((_, i) => {
      const dot     = document.createElement('div');
      dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
      dot.onclick   = () => { clearInterval(hInt); window.setHero(i); startSlide(); };
      dotsEl.appendChild(dot);
    });
  }

  const heroEl = document.getElementById('hero');
  if (heroEl && !document.getElementById('heroProgress')) {
    const pb = document.createElement('div');
    pb.id        = 'heroProgress';
    pb.className = 'hero-progress';
    pb.innerHTML = '<div class="hero-progress-fill" id="heroProgressFill"></div>';
    heroEl.appendChild(pb);
  }

  window.setHero(0);
  startSlide();
};
