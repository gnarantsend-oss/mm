import { fillRow } from './utils.js';

export async function loadData() {
  try {

    const titleEl = document.getElementById('appTitle');
    const phoneEl = document.getElementById('contactPhoneEl');
    if (titleEl) titleEl.textContent = `Nabooshy - ${window.CURRENT_YEAR || 2026}`;
    if (phoneEl) {
      const tg = window.CONTACT_PHONE || 'https://t.me/oroodvz';
      phoneEl.href = tg;
      phoneEl.textContent = '✈️ @oroodvz Telegram';
    }

    window.MOVIES = [];
    window.SERIES = [];

    // ── data_movies.json, data_serial.json болон data_hero.json зэрэг ачаалах ──
    const [raw, serialRaw, heroRaw] = await Promise.all([
      fetch('data_movies.json').then(r => r.json()),
      fetch('data_serial.json?v=' + Date.now()).then(r => r.json()).catch(() => []),
      fetch('data_hero.json?v=' + Date.now()).then(r => r.json()).catch(() => null)
    ]);

    // Hero өгөгдөл
    if (Array.isArray(heroRaw) && heroRaw.length) {
      window.HERO_MOVIES = heroRaw;
      if (window.initHero) window.initHero();
    }

    if (!Array.isArray(raw)) throw new Error('data_movies.json буруу формат');

    // ── data_serial.json-г SERIES массивт нэмэх ──
    if (Array.isArray(serialRaw)) {
      serialRaw.forEach((item, i) => {
        let rating = window.FALLBACK_RATING || 7.0;
        if (item.ratings?.imdb) rating = parseFloat(item.ratings.imdb);
        else if (item.rating)   rating = parseFloat(item.rating);

        const category = Array.isArray(item.genre)
          ? item.genre.join(',')
          : (item.genre || '');

        const episodes = (item.episodes || []).map(ep => ({
          ...ep,
          embed_links: [ep.embed_links?.[0] || ''],
        }));

        window.SERIES.push({
          id:       'sj' + i,
          title:    item.mongolian_title || item.title,
          title_en: item.title,
          year:     item.year || window.FALLBACK_YEAR || 2024,
          rating,
          poster:   item.poster_link || item.poster || window.FALLBACK_POSTER,
          cat:      category.toLowerCase(),
          country:  (item.country || 'mn').toLowerCase(),
          desc:     item.desc || '',
          episodes,
        });
      });
    }

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


  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(run, { timeout: 2000 });
  } else {
    setTimeout(run, 300);
  }
}

