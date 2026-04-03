// movie-page.js — Кино хуудас (шүүлтүүр, grid)
export const MOVIE_GENRES = [
  { label: '🌐 All',          keys: [] },
  { label: '💥 Action',       keys: ['action'] },
  { label: '🗺️ Adventure',    keys: ['adventure'] },
  { label: '😂 Comedy',       keys: ['comedy'] },
  { label: '🎭 Drama',        keys: ['drama'] },
  { label: '👻 Horror',       keys: ['horror'] },
  { label: '🔪 Thriller',     keys: ['thriller'] },
  { label: '🚀 Sci-Fi',       keys: ['sci-fi', 'science fiction'] },
  { label: '✨ Fantasy',      keys: ['fantasy'] },
  { label: '❤️ Romance',      keys: ['romance'] },
  { label: '🎨 Animation',    keys: ['animation', 'anime'] },
  { label: '🕵️ Mystery',      keys: ['mystery'] },
  { label: '🚨 Crime',        keys: ['crime'] },
  { label: '📹 Documentary',  keys: ['documentary'] },
  { label: '👨‍👩‍👧‍👦 Family',       keys: ['family'] },
  { label: '🏛️ History',      keys: ['history'] },
  { label: '🪖 War',          keys: ['war'] },
  { label: '🎵 Music',        keys: ['music', 'musical'] },
  { label: '🤠 Western',      keys: ['western'] },
  { label: '📖 Biography',    keys: ['biography'] }
];

let moviesBuilt    = false;
let activeCountry  = '';
let activeGenreKeys = [];

export function buildMoviesPage() {
  if (moviesBuilt) return;
  moviesBuilt = true;

  // ── Жанр шүүлтүүр ──
  const bar = document.getElementById('movieGenreBar');
  if (!bar) return;
  bar.innerHTML = '';

  MOVIE_GENRES.forEach((g, i) => {
    const pill = document.createElement('button');
    pill.className = 'gpill' + (i === 0 ? ' on' : '');
    pill.textContent = g.label;
    pill.onclick = () => {
      bar.querySelectorAll('.gpill').forEach(p => p.classList.remove('on'));
      pill.classList.add('on');
      activeGenreKeys = g.keys;
      renderMoviesGrid(g.keys);
    };
    bar.appendChild(pill);
  });

  renderMoviesGrid([]);
}

function renderMoviesGrid(keys) {
  const grid = document.getElementById('moviesGrid');
  if (!grid) return;
  grid.innerHTML = '';

  let items = window.MOVIES;
  if (activeCountry) items = items.filter(m => m.country === activeCountry);
  if (keys.length > 0) items = items.filter(m => keys.some(k => m.cat.includes(k)));

  const cnt = document.getElementById('moviesCount');
  if (cnt) cnt.textContent = `Нийт ${items.length} кино`;

  items.slice(0, 80).forEach((m, i) => grid.appendChild(window.makeMovieCard(m, i < 6)));
}
