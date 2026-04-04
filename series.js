// series.js - БҮРЭН ЭХЭЭРЭЭ
export const SERIES_GENRES = [
  { label: '🌐 Бүгд',       keys: [] },
  { label: '🎭 Драма',       keys: ['drama', 'romance'] },
  { label: '⚔️ Action',     keys: ['action', 'adventure'] },
  { label: '😂 Инээдмийн',  keys: ['comedy'] },
  { label: '🎨 Аниме',       keys: ['animation', 'anime'] },
  { label: '👻 Аймшиг',     keys: ['horror', 'thriller'] },
];

window.openSeriesDetail = function (s) {
  const hero = document.getElementById('smHero');
  if (hero) hero.style.backgroundImage = `url('${s.poster}')`;
  
  const title = document.getElementById('smTitle');
  if (title) title.textContent = s.title;
  
  const meta = document.getElementById('smMeta');
  if (meta) meta.innerHTML = `<span class="st">★</span>${s.rating} &nbsp;·&nbsp; ${s.year}`;
  
  const desc = document.getElementById('smDesc');
  if (desc) desc.textContent = s.desc || '';

  const epGrid = document.getElementById('smEpGrid');
  if (!epGrid) return;
  epGrid.innerHTML = '';

  (s.episodes || []).forEach((ep, i) => {
    const el = document.createElement('div');
    el.className = 'ep-item';
    el.innerHTML = `
      <div class="ep-num">${i + 1}</div>
      <div class="ep-label">${ep.episode_title || 'Анги'}</div>`;
    
    el.onclick = () => {
      window.closeM('seriesModal'); 
      setTimeout(() => {
        window.openPlayer({
          title: `${s.title} — ${i + 1}-р анги`,
          embed: ep.embed_links?.[0] || '',
          poster: s.poster,
        });
      }, 300);
    };
    
    epGrid.appendChild(el);
  });

  document.getElementById('seriesModal').classList.add('open');
};

// ✅ ЗАСВАР 3: seriesBuilt флагийг устгаж, өгөгдөл бэлэн байгааг шалгав
export function buildSeriesPage() {
  const bar = document.getElementById('seriesGenreBar');
  if (!bar) return;

  // Өгөгдөл байхгүй бол хүлээ
  if (!window.SERIES || window.SERIES.length === 0) {
    setTimeout(() => buildSeriesPage(), 500);
    return;
  }

  bar.innerHTML = '';

  SERIES_GENRES.forEach((g, i) => {
    const pill = document.createElement('button');
    pill.className = 'gpill' + (i === 0 ? ' on' : '');
    pill.textContent = g.label;
    pill.onclick = () => {
      bar.querySelectorAll('.gpill').forEach((p) => p.classList.remove('on'));
      pill.classList.add('on');
      renderSeriesGrid(g.keys);
    };
    bar.appendChild(pill);
  });

  renderSeriesGrid([]);
}

function renderSeriesGrid(keys) {
  const grid = document.getElementById('seriesGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const items =
    keys.length === 0
      ? window.SERIES
      : window.SERIES.filter((s) => keys.some((k) => s.cat.includes(k)));

  const cnt = document.getElementById('seriesCount');
  if (cnt) cnt.textContent = `Нийт ${items.length} цуврал`;

  items.slice(0, 80).forEach((s) => {
    const card = window.makeMovieCard(s);
    card.onclick = () => window.openSeriesDetail(s);
    grid.appendChild(card);
  });
}
