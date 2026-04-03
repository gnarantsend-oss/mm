// ============================================================
// hero/tmdb.js — TMDB API дуудлагууд
// ============================================================

// Кино дэлгэцийн trailer татах
export async function fetchTrailerKey(tmdbId) {
  try {
    const r = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${window.TMDB_KEY}`
    );
    const d = await r.json();
    const t = d.results?.find(
      (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
    );
    return t?.key ? `https://www.youtube.com/watch?v=${t.key}` : null;
  } catch {
    return null;
  }
}

// Дэлхийд яг одоо гарч буй кинонуудыг TMDB-с татах
window.fetchTMDBNowPlaying = async function () {
  try {
    const r = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${window.TMDB_KEY}&language=en-US`
    );
    const d = await r.json();

    window.HERO_MOVIES = d.results.slice(0, 6).map((m) => ({
      id:       'hero_' + m.id,
      tmdbId:   m.id,
      title:    m.title,
      title_en: m.title,
      rating:   m.vote_average.toFixed(1),
      year:     m.release_date?.split('-')[0] || '',
      poster:   `https://image.tmdb.org/t/p/w1280${m.backdrop_path || m.poster_path}`,
      embed:    `https://vidsrc.to/embed/movie/${m.id}`,
      cat:      '',
      trailer:  null,
    }));

    // "Дэлхийд яг одоо" мөрийг дүүргэх
    const intEl = document.getElementById('rowInternational');
    if (intEl) {
      intEl.innerHTML = '';
      window.HERO_MOVIES.forEach((m) => intEl.appendChild(window.makeMovieCard(m)));
    }

    window.initHero();
  } catch (e) {
    console.error('TMDB now_playing:', e);
    window.initHero();
  }
};
