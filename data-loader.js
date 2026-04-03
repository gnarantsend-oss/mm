// data-loader.js — Олон JSON файлаас өгөгдөл татах + Worker холболт
import { fillRow } from './utils.js';

// (Cloudflare Worker хэрэглэхгүй болсон — бүх линк бүтэн URL байх ёстой)

// Линкийг тайлж унших туслах функц
function decodeLink(link) {
  if (!link) return '';
  if (link.startsWith('http')) return link;
  try { 
    // Хэрэв линк base64-өөр кодлогдсон бол тайлна, үгүй бол хэвээр нь үлдээнэ
    return atob(link); 
  } catch (e) { 
    return link; 
  }
}

export async function loadData() {
  try {
    // Гарчиг болон холбоо барих мэдээлэл шинэчлэх
    const titleEl = document.getElementById('appTitle');
    const phoneEl = document.getElementById('contactPhoneEl');
    if (titleEl) titleEl.textContent = `Nabooshy - ${window.CURRENT_YEAR || 2026}`;
    if (phoneEl) phoneEl.textContent = window.CONTACT_PHONE || '9937-6238';

    // Глобал жагсаалтуудыг цэвэрлэх
    window.MOVIES = [];
    window.SERIES = [];

    // Унших файлуудын жагсаалт
    const files = [
      'data_drama.json', 'data_action.json', 'data_tsuwral.json',
      'data_horror.json', 'data_adal.json', 'data_tvvhen.json',
      'data_aimshig.json', 'data_trailer.json', 'data_zognol.json',
      'data_hvvhed.json', 'data_gemt.json', 'data_hair.json',
      'data_nuutslag.json', 'data_barimt.json', 'data_gerbvl.json',
      'data_daintai.json', 'data_namtar.json', 'data_comedy.json'
    ];

    let globalIndex = 0;

    // Бүх JSON файлыг зэрэг татаж авах
    const responses = await Promise.all(files.map(file => 
      fetch(file)
        .then(res => res.json())
        .catch(() => []) // Файл байхгүй эсвэл алдаа гарвал хоосон жагсаалт буцаана
    ));

    responses.forEach(json => {
      const raw = json.data || json;
      if (!Array.isArray(raw)) return;

      raw.forEach((item) => {
        const isSeries = item.type?.toLowerCase().includes('series');

        // --- 🖼️ ПОСТЕР (ЗУРАГ) ХОЛБОЛТ ---
        let pLink = item.poster_link || item.poster || '';

        // --- ⭐ ҮНЭЛГЭЭ ---
        let movieRating = window.FALLBACK_RATING || 7.0;
        if (item.ratings?.imdb) movieRating = parseFloat(item.ratings.imdb);
        else if (item.rating) movieRating = parseFloat(item.rating);

        // --- 📂 ТӨРӨЛ (Genre) ---
        let category = '';
        if (Array.isArray(item.genre)) category = item.genre.join(',');
        else if (item.genre) category = item.genre;
        
        const base = {
          id: (isSeries ? 's' : 'm') + globalIndex++,
          title: item.mongolian_title || item.title,
          title_en: item.title,
          year: item.year || window.FALLBACK_YEAR || 2024,
          rating: movieRating,
          poster: pLink,
          cat: category.toLowerCase(),
          country: (item.country || 'mn').toLowerCase(),
        };

        if (isSeries) {
          // Цуврал киноны ангиудын линкийг засах
          const decodedEpisodes = (item.episodes || []).map(ep => {
            let epLink = ep.embed_links ? ep.embed_links[0] : '';
            return { ...ep, embed_links: [decodeLink(epLink)] };
          });
          window.SERIES.push({ ...base, episodes: decodedEpisodes });
        } else {
          // --- 🎬 КИНОНЫ ВИДЕО ЛИНК ---
          let eLink = (item.embed_links && item.embed_links[0]) || item.embed || '';
          window.MOVIES.push({ ...base, embed: decodeLink(eLink) });
        }
      });
    });

    // Дэлгэцэнд эгнээгээр харуулах
    buildHomeRows();

  } catch (e) {
    console.error("Өгөгдөл ачаалахад алдаа гарлаа:", e);
  }
}

function buildHomeRows() {
  // Hero-тэй өрсөлдөхгүйн тулд browser сул байхад л ажиллуулна
  const run = () => {
    fillRow('rowFeatured', window.MOVIES.slice(0, 30));
    fillRow('rowSeries',   window.SERIES.slice(0, 20), true);

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

  // Browser дэмжвэл idle горимд, үгүй бол 300ms хойшлуулна
  if ('requestIdleCallback' in window) {
    requestIdleCallback(run, { timeout: 2000 });
  } else {
    setTimeout(run, 300);
  }
}
