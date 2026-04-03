// ============================================================
// games/page.js — Тоглоомын хуудас + нүүр хуудасны мөр
// ============================================================

import { GAMES_LIST, GAME_CATS, GAME_SECTIONS } from './data.js';
import { makeGamePosterCard, makeGameListCard }  from './cards.js';

// ── Нүүр хуудасны тоглоомын мөр ─────────────────────────
window.buildGamesRow = function () {
  const el = document.getElementById('rowGames');
  if (!el) return;
  el.innerHTML = '';
  GAMES_LIST.slice(0, 10).forEach((g) => el.appendChild(makeGamePosterCard(g)));
};

// ── Тоглоомын хуудас ─────────────────────────────────────
let gamesBuilt = false;

window.buildGamesPage = function () {
  if (gamesBuilt) return;
  gamesBuilt = true;

  const bar = document.getElementById('gameGenreBar');
  if (!bar) return;
  bar.innerHTML = '';

  GAME_CATS.forEach((c, i) => {
    const pill = document.createElement('button');
    pill.className = 'gpill' + (i === 0 ? ' on' : '');
    pill.textContent = c.label;
    pill.onclick = () => {
      bar.querySelectorAll('.gpill').forEach((p) => p.classList.remove('on'));
      pill.classList.add('on');
      renderGamesGrid(c.key);
    };
    bar.appendChild(pill);
  });

  renderGamesGrid('');
};

// ── Grid дүүргэх ─────────────────────────────────────────
function renderGamesGrid(catKey) {
  const grid = document.getElementById('gamesGrid');
  if (!grid) return;
  grid.innerHTML = '';

  if (!catKey) {
    // Бүгд: ангиллаар хэсэглэж, scroll мөр болгон харуулах
    GAME_SECTIONS.forEach((sec, idx) => {
      // Гарчиг
      const title = document.createElement('div');
      title.style.cssText =
        'font-size:18px;font-weight:700;color:#fff;margin:24px 0 12px;letter-spacing:0.5px;';
      title.textContent = sec.label;
      grid.appendChild(title);

      // Scroll мөр
      const rowWrap = document.createElement('div');
      rowWrap.className = 'row-wrap';
      const rowId = 'gameRow_' + sec.key;

      const btnL     = document.createElement('button');
      btnL.className = 'scroll-btn left';
      btnL.innerHTML = '❮';
      btnL.onclick   = () => scrollRow(rowId, -600);

      const row     = document.createElement('div');
      row.className = 'scroll-row';
      row.id        = rowId;

      const btnR     = document.createElement('button');
      btnR.className = 'scroll-btn right';
      btnR.innerHTML = '❯';
      btnR.onclick   = () => scrollRow(rowId, 600);

      GAMES_LIST.filter((g) => g.cat === sec.key)
        .forEach((g) => row.appendChild(makeGamePosterCard(g)));

      rowWrap.append(btnL, row, btnR);
      grid.appendChild(rowWrap);

      // Зар баннер — мөрийн доор
      if (idx < GAME_SECTIONS.length - 1) {
        const adSlot = document.createElement('div');
        adSlot.style.cssText = 'width:100%;margin:10px 0;display:block;';
        grid.appendChild(adSlot);
        setTimeout(() => {
          if (window._zarInjectCSS) window._zarInjectCSS();
          const gameAds = (window.MY_ADS || []).filter(
            (a) => a.isActive && a.label?.startsWith('GAME AD')
          );
          const ad = gameAds[idx] || { isActive: true, label: 'GAME AD ' + (idx + 1) };
          if (window._zarBuildEl) adSlot.appendChild(window._zarBuildEl(ad));
        }, 200);
      }
    });

  } else {
    // Тодорхой ангилал: жагсаалт хэлбэрээр
    GAMES_LIST.filter((g) => g.cat === catKey)
      .forEach((g) => grid.appendChild(makeGameListCard(g)));
  }
}

// ── Тоглоом нээх ─────────────────────────────────────────
window.openGame = function (g) {
  document.getElementById('gmFrame').src = g.embed;
  document.getElementById('gameModal').classList.add('open');
};
