// ============================================================
// watch-party.js — Хамтдаа үзэх горим (Firebase Sync)
// ============================================================

// Киноны дэлгэрэнгүй цонхонд товч нэмэх
const origOpenMovieDetailParty = window.openMovieDetail;
window.openMovieDetail = function (m) {
  origOpenMovieDetailParty(m); // Өмнөх Gamification-ийг ч давхар дуудна
  
  const acts = document.getElementById('mActs');
  const partyBtn = document.createElement('button');
  partyBtn.className = 'btn-watch';
  partyBtn.style.width = '100%';
  partyBtn.style.marginTop = '10px';
  partyBtn.style.background = 'var(--blue)';
  partyBtn.style.color = '#fff';
  partyBtn.innerHTML = '👥 Найзтайгаа хамт үзэх';
  
  partyBtn.onclick = () => {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    window.toast(`Өрөө үүслээ! Код: ${roomId} (Тун удахгүй бүрэн ажиллана)`);
    window.openPlayer(m);
    // Энд Firebase Firestore руу roomId үүсгэж, video.currentTime-ийг onSnapshot-оор синк хийх логик орно.
  };
  
  acts.appendChild(partyBtn);
};