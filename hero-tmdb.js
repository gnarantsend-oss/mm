// hero-tmdb.js — data_hero.json эхэлж, TMDB backup

const _CACHE_KEY = 'nb_hero_tmdb';
const _CACHE_TTL = 60 * 60 * 1000;

const _GENRE_MAP = {
  28:'Action',12:'Adventure',16:'Animation',35:'Comedy',
  80:'Crime',99:'Documentary',18:'Drama',10751:'Family',
  14:'Fantasy',36:'History',27:'Horror',9648:'Mystery',
  10749:'Romance',878:'Sci-Fi',53:'Thriller',10752:'War'
};

// ── Trailer key cache ──────────────────────────────────────
window.fetchTrailerKey = async (tmdbId) => {
  const k = 'nb_tr_' + tmdbId;
  try { const c = sessionStorage.getItem(k); if (c !== null) return c || null; } catch {}
  try {
    const r = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${window.TMDB_KEY}`);
    const d = await r.json();
    const t = d.results?.find(v => v.site==='YouTube' && (v.type==='Trailer'||v.type==='Teaser'));
    const url = t?.key ? `https://www.youtube.com/watch?v=${t.key}` : '';
    try { sessionStorage.setItem(k, url); } catch {}
    return url || null;
  } catch { return null; }
};

// ── rowInternational дүүргэх ───────────────────────────────
function _fillRow(movies) {
  const el = document.getElementById('rowInternational');
  if (!el) return;
  el.innerHTML = '';
  movies.forEach(m => el.appendChild(window.makeMovieCard(m)));
}

// ── TMDB өгөгдөл задлах ───────────────────────────────────
function _parseTMDB(results) {
  return results.slice(0, 7).map(m => ({
    id: 'tmdb_' + m.id, tmdbId: m.id,
    title: m.title, title_en: m.title,
    rating: m.vote_average.toFixed(1),
    year: m.release_date?.split('-')[0] || '',
    poster: `https://image.tmdb.org/t/p/w1280${m.backdrop_path||m.poster_path}`,
    embed: `https://vidsrc.to/embed/movie/${m.id}`,
    cat: (m.genre_ids||[]).slice(0,3).map(id=>_GENRE_MAP[id]).filter(Boolean).join(', '),
    overview: m.overview ? (m.overview.length>180 ? m.overview.slice(0,177)+'...' : m.overview) : '',
    trailer: null,
  }));
}

// ── Арын дэвсгэрт TMDB татах (rowInternational-д) ─────────
async function _fetchTMDBBackground() {
  try {
    // Cache шалгах
    const raw = localStorage.getItem(_CACHE_KEY);
    if (raw) {
      const { ts, data } = JSON.parse(raw);
      if (Date.now() - ts < _CACHE_TTL) { _fillRow(data); return; }
    }
    const r = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${window.TMDB_KEY}&language=en-US&page=1`);
    const d = await r.json();
    const movies = _parseTMDB(d.results || []);
    try { localStorage.setItem(_CACHE_KEY, JSON.stringify({ ts: Date.now(), data: movies })); } catch {}
    _fillRow(movies);
  } catch {}
}

// ── ҮНДСЭН: data_hero.json эхэлж, TMDB backup ─────────────
window.fetchTMDBNowPlaying = async function () {

  // 1️⃣ data_hero.json → тэр даруй hero
  try {
    const r = await fetch('./data_hero.json?v=' + Date.now());
    if (r.ok) {
      const data = await r.json();
      if (Array.isArray(data) && data.length) {
        window.HERO_MOVIES = data;
        window.initHero();
        // TMDB-г арын дэвсгэрт дуудаж rowInternational дүүргэнэ
        _fetchTMDBBackground();
        return;
      }
    }
  } catch {}

  // 2️⃣ localStorage cache
  try {
    const raw = localStorage.getItem(_CACHE_KEY);
    if (raw) {
      const { ts, data } = JSON.parse(raw);
      if (Date.now() - ts < _CACHE_TTL) {
        window.HERO_MOVIES = data;
        _fillRow(data);
        window.initHero();
        return;
      }
    }
  } catch {}

  // 3️⃣ TMDB API (шинэ хэрэглэгч, cache байхгүй)
  try {
    const r = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${window.TMDB_KEY}&language=en-US&page=1`);
    const d = await r.json();
    const movies = _parseTMDB(d.results || []);
    try { localStorage.setItem(_CACHE_KEY, JSON.stringify({ ts: Date.now(), data: movies })); } catch {}
    window.HERO_MOVIES = movies;
    _fillRow(movies);
    window.initHero();
  } catch (e) {
    console.error('Hero ачаалахад алдаа:', e);
    window.initHero();
  }
};
