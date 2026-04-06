window.toast = (msg) => {
  const t = document.getElementById('toast');
  if (t) {
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }
};

window.fixPoster = async (imgEl, titleEn) => {
  if (imgEl.dataset.tried) return;
  imgEl.dataset.tried = '1';
  try {
    const r = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${window.TMDB_KEY}&query=${encodeURIComponent(titleEn)}`
    );
    const d = await r.json();
    const hit = d.results?.find((x) => x.poster_path);
    if (hit) {
      imgEl.src = `https://image.tmdb.org/t/p/w500${hit.poster_path}`;
      return;
    }
  } catch (_) {}
  imgEl.src = window.FALLBACK_POSTER || 'https://placehold.co/300x450/111/555?text=No+Image';
};

export function fillRow(rowId, items, isSeries = false) {
  const el = document.getElementById(rowId);
  if (!el) return;
  el.innerHTML = '';
  items.forEach((m) => {
    const card = window.makeMovieCard(m);
    if (isSeries) card.onclick = () => window.openSeriesDetail(m);
    el.appendChild(card);
  });
}