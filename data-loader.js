import { fillRow } from './utils.js';

export async function loadData() {
  try {

    const titleEl = document.getElementById('appTitle');
    const phoneEl = document.getElementById('contactPhoneEl');
    if (titleEl) titleEl.textContent = `Nabooshy - ${window.CURRENT_YEAR || 2026}`;
    if (phoneEl) phoneEl.textContent = window.CONTACT_PHONE || '9937-6238';

    window.MOVIES = [];
    window.SERIES = [];

    const raw = await fetch('data_movies.json').then(r => r.json());
    if (!Array.isArray(raw)) throw new Error('data_movies.json буруу формат');

    raw.forEach((item, i) => {
      const isSeries = item.type?.toLowerCase().includes('series');

      let movieRating = window.FALLBACK_RATING || 7.0;
      if (item.ratings?.imdb) movieRating = parseFloat(item.ratings.imdb);
      else if (item.rating)   movieRating = parseFloat(item.rating);

      const category = Array.isArray(item.genre)
        ? item.genre.join(',')
        : (item.genre || '');

      const base = {
        id:       (isSeries ? 's' : 'm') + i,
        title:    item.mongolian_title || item.title,
        title_en: item.title,
        year:     item.year   || window.FALLBACK_YEAR || 2024,
        rating:   movieRating,
        poster:   item.poster_link || item.poster || window.FALLBACK_POSTER,
        cat:      category.toLowerCase(),
        country:  (item.country || 'mn').toLowerCase(),
      };

      if (isSeries) {
        const episodes = (item.episodes || []).map(ep => ({
          ...ep,
          embed_links: [ep.embed_links?.[0] || ''],
        }));
        window.SERIES.push({ ...base, episodes });
      } else {
        const embed = (item.embed_links?.[0]) || item.embed || '';
        window.MOVIES.push({ ...base, embed });
      }
    });

    buildHomeRows();

  } catch (e) {
    console.error('Өгөгдөл ачаалахад алдаа гарлаа:', e);
  }
}

function buildHomeRows() {

  const run = async () => {
    fillRow('rowSeries', window.SERIES.slice(0, 20), true);

    const dc = document.getElementById('dynamicRows');
    if (dc && window.HOME_ROWS) {
      dc.innerHTML = '';
      window.HOME_ROWS.forEach(({ id, title, keys }) => {
        const items = window.MOVIES.filter(m => keys.some(k => m.cat.includes(k))).slice(0, 25);
        if (items.length > 0) {
          const sec = document.createElement('section');
          sec.className = 'sec';
          sec.innerHTML = `
            <div class="sec-head"><div class="sec-title">${title}</div></div>
            <div class="row-wrap">
              <button class="scroll-btn left" onclick="scrollRow('${id}',-600)">❮</button>
              <div class="scroll-row" id="${id}"></div>
              <button class="scroll-btn right" onclick="scrollRow('${id}',600)">❯</button>
            </div>`;
          dc.appendChild(sec);
          fillRow(id, items);
        }
      });
    }

    // Бүх row бэлэн болсны дараа zar.js-ийн insertAds дуудна
    if (window.insertAds) await window.insertAds();
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(run, { timeout: 2000 });
  } else {
    setTimeout(run, 300);
  }
}
