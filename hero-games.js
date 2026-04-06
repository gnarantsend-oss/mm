import { animateContent } from './hero-utils.js';

export function initGamesHero() {
  const games = window.HERO_GAMES || [];
  if (!games.length) return;

  let gi   = 0;
  let gInt = null;

  function showGame(idx) {
    const g = games[idx];
    if (!g) return;

    const tag = document.getElementById('heroTag');
    if (tag) tag.innerHTML = `🎮 ${(g.cat || 'ТОГЛООМ').toUpperCase()}`;

    const title = document.getElementById('heroTitle');
    if (title) title.textContent = g.title;

    const meta = document.getElementById('heroMeta');
    if (meta) meta.innerHTML = `<span>${g.desc}</span>`;

    const desc = document.getElementById('heroDesc');
    if (desc) desc.textContent = '';

    const dotsEl = document.getElementById('heroDots');
    if (dotsEl) {
      dotsEl.innerHTML = '';
      games.forEach((_, i) => {
        const dot     = document.createElement('div');
        dot.className = 'hero-dot' + (i === idx ? ' active' : '');
        dot.onclick   = () => { clearInterval(gInt); gi = i; showGame(i); startGameSlide(); };
        dotsEl.appendChild(dot);
      });
    }

    const btns = document.getElementById('heroBtns');
    if (btns) {
      btns.innerHTML = `
        <button class="btn-watch"
          onclick="window.openPlayer({title:'${g.title}',embed:'https://www.youtube.com/embed/${g.trailer}?autoplay=1'})">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21"/>
          </svg> Трейлер үзэх
        </button>
        <button class="btn-more"
          onclick="document.getElementById('gameGenreBar')?.scrollIntoView({behavior:'smooth'})">
          🎮 Бүгд харах
        </button>`;
    }

    animateContent();
  }

  function startGameSlide() {
    clearInterval(gInt);
    gInt = setInterval(() => {
      const cont = document.getElementById('heroVideoContainer');
      if (!cont?.hasChildNodes()) {
        gi = (gi + 1) % games.length;
        showGame(gi);
      }
    }, window.GAME_TIMER || 14000);
  }

  showGame(0);
  startGameSlide();
}
