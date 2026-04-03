// ============================================================
// profile-gamify.js — Хадгалах болон Онооны систем
// ============================================================

window.userWatchlist = JSON.parse(localStorage.getItem('naboo_watchlist')) ||[];
window.userPoints = parseInt(localStorage.getItem('naboo_points')) || 0;

// Киноны дэлгэрэнгүй цонх нээгдэхэд "Хадгалах" товч нэмэх
const origOpenMovieDetail = window.openMovieDetail;
window.openMovieDetail = function (m) {
  origOpenMovieDetail(m);
  
  const acts = document.getElementById('mActs');
  const isSaved = window.userWatchlist.some(item => item.id === m.id);
  
  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn-more';
  saveBtn.style.width = '100%';
  saveBtn.style.marginTop = '10px';
  saveBtn.innerHTML = isSaved ? '✅ Хадгалсан' : '❤️ Жагсаалтад нэмэх';
  
  saveBtn.onclick = () => {
    if (isSaved) {
      window.userWatchlist = window.userWatchlist.filter(item => item.id !== m.id);
      saveBtn.innerHTML = '❤️ Жагсаалтад нэмэх';
      window.toast('Жагсаалтаас хаслаа');
    } else {
      window.userWatchlist.push(m);
      saveBtn.innerHTML = '✅ Хадгалсан';
      window.addPoints(10); // Кино хадгалахад 10 оноо өгнө
      window.toast('Жагсаалтад нэмэгдлээ! +10 Оноо 🎉');
    }
    localStorage.setItem('naboo_watchlist', JSON.stringify(window.userWatchlist));
  };
  
  acts.appendChild(saveBtn);
};

// Оноо нэмэх функц
window.addPoints = (pts) => {
  window.userPoints += pts;
  localStorage.setItem('naboo_points', window.userPoints);
  const userBtn = document.getElementById('navUserName');
};

// Нэвтрэх үед оноог харуулах
const origUpdateNavUser = window.updateNavUser;
window.updateNavUser = function() {
  origUpdateNavUser();

};