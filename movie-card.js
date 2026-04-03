// movie-card.js — Кино карт + дэлгэрэнгүй modal
window.makeMovieCard = function (m, isFirst = false) {
  const d = document.createElement('div');
  d.className = 'mcard';
  const imgAttrs = isFirst
    ? 'fetchpriority="high" loading="eager"'
    : 'loading="lazy" decoding="async"';
  d.innerHTML = `
    <div class="mcard-poster-wrap">
      <img class="mcard-poster"
           src="${m.poster || ''}"
           alt="${m.title}"
           ${imgAttrs}
           onerror="fixPoster(this,'${(m.title_en || m.title).replace(/'/g, "\\'")}')">
      <div class="mcard-ov">
        <div class="mcard-play">
          <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" fill="white"/></svg>
        </div>
      </div>
    </div>
    <div class="mcard-info">
      <div class="mcard-title">${m.title}</div>
      <div class="mcard-sub"><span class="st">★</span>${m.rating} <span>·</span> ${m.year}</div>
    </div>`;
  d.addEventListener('click', () => window.openMovieDetail(m));
  return d;
};

window.openMovieDetail = function (m) {
  document.getElementById('mHero').style.backgroundImage = `url('${m.poster}')`;
  document.getElementById('mTitle').textContent = m.title;
  document.getElementById('mMeta').innerHTML =
    `<span class="st">★</span>${m.rating} &nbsp;·&nbsp; ${m.year} &nbsp;·&nbsp; ${m.cat || ''}`;
  document.getElementById('mDesc').textContent = '';
  document.getElementById('mActs').innerHTML =
    `<button class="btn-watch" style="width:100%;margin-top:10px;"
             onclick="openPlayer(window._curM)">▶ ЯГ ОДОО ҮЗЭХ</button>`;
  window._curM = m;
  document.getElementById('movieModal').classList.add('open');
};
