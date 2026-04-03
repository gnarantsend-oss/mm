// ============================================================
// games/cards.js — Тоглоомын карт үүсгэгчид
// ============================================================

// Кино шиг постер карт (нүүр хуудас + бүгд хуудасны мөр)
export function makeGamePosterCard(g) {
  const [c1, c2, c3] = g.color || ['#1a1a2e', '#16213e', '#0f3460'];

  const d = document.createElement('div');
  d.className  = 'mcard';
  d.style.cursor = 'pointer';
  d.innerHTML  = `
    <div class="mcard-poster-wrap"
         style="background:linear-gradient(145deg,${c1},${c2},${c3});">
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;
                  align-items:center;justify-content:center;gap:10px;z-index:1;">
        <div style="font-size:62px;line-height:1;
                    filter:drop-shadow(0 4px 8px rgba(0,0,0,0.5));">${g.emoji}</div>
        <div style="font-size:13px;font-weight:700;color:#fff;text-align:center;
                    padding:0 8px;letter-spacing:0.5px;
                    text-shadow:0 2px 4px rgba(0,0,0,0.8);">${g.title}</div>
      </div>
      <div class="mcard-ov">
        <div class="mcard-play">
          <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" fill="white"/></svg>
        </div>
      </div>
    </div>
    <div class="mcard-info">
      <div class="mcard-title">${g.title}</div>
      <div class="mcard-sub" style="color:#aaa;">🎮 <span>${g.desc}</span></div>
    </div>`;

  d.onclick = () => window.openGame(g);
  return d;
}

// Жагсаалт хэлбэрийн карт (ангилал шүүгдсэн grid)
export function makeGameListCard(g) {
  const [c1, c2] = g.color || ['#1a1a2e', '#16213e'];

  const d = document.createElement('div');
  d.className = 'game-card';
  d.innerHTML = `
    <div class="game-emoji"
         style="background:linear-gradient(135deg,${c1},${c2});font-size:32px;">${g.emoji}</div>
    <div class="game-info">
      <div class="game-title">${g.title}</div>
      <div class="game-desc">${g.desc}</div>
    </div>
    <button class="game-btn">▶ Тоглох</button>`;

  d.querySelector('.game-btn').onclick = (e) => {
    e.stopPropagation();
    window.openGame(g);
  };
  return d;
}
