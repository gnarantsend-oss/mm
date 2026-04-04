import './games-data.js';
import './games-cards.js';

let gamesBuilt = false;

window.buildGamesRow = function() {
  const el = document.getElementById('rowGames');
  if (!el) return;
  el.innerHTML = '';
  (window.GAMES_LIST || []).slice(0, 10).forEach(g => {
    el.appendChild(window.makeGamePosterCard(g));
  });
};

window.buildGamesPage = function() {
  if (gamesBuilt) return;
  gamesBuilt = true;

  const bar  = document.getElementById('gameGenreBar');
  const grid = document.getElementById('gamesGrid');
  if (!bar || !grid) return;

  
  bar.innerHTML = '';

  const allBtn = _pill('🌐 Бүгд', true);
  allBtn.onclick = () => { _activate(bar, allBtn); renderGamesGrid(''); };
  bar.appendChild(allBtn);

  (window.GAME_SECTIONS || []).forEach(c => {
    const p = _pill(c.title, false);
    p.onclick = () => { _activate(bar, p); renderGamesGrid(c.key); };
    bar.appendChild(p);
  });

  
  renderGamesGrid('');

  
  if (typeof window.enhanceGamesWithRawg === 'function') {
    window.enhanceGamesWithRawg().catch(() => {});
  }
};

function _pill(label, active) {
  const b = document.createElement('button');
  b.className = 'gpill' + (active ? ' on' : '');
  b.textContent = label;
  return b;
}

function _activate(bar, btn) {
  bar.querySelectorAll('.gpill').forEach(p => p.classList.remove('on'));
  btn.classList.add('on');
}

function renderGamesGrid(catKey) {
  const grid = document.getElementById('gamesGrid');
  if (!grid) return;
  grid.className = 'mgrid';
  grid.innerHTML = '';

  const items = catKey
    ? (window.GAMES_LIST || []).filter(g => g.cat === catKey)
    : (window.GAMES_LIST || []);

  if (items.length === 0) {
    grid.innerHTML = '<div style="color:#666;padding:2rem;grid-column:1/-1;text-align:center;">Тоглоом олдсонгүй</div>';
    return;
  }

  items.forEach(g => grid.appendChild(window.makeGamePosterCard(g)));
}

window.openGame = function(g) {
  const frame = document.getElementById('gmFrame');
  const modal = document.getElementById('gameModal');

  if (!frame || !modal) {
    window.open(g.embed, '_blank');
    return;
  }

  frame.src = g.embed;
  modal.classList.add('open');
};
