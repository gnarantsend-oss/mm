// zar.js
import './zar-config.js'; 
import { ZAR_CSS } from './zar-styles.js'; 

// 1. CSS оруулах
function _zarInjectCSS() {
  if (document.getElementById('_zar_css')) return;
  const s = document.createElement('style');
  s.id = '_zar_css';
  s.textContent = ZAR_CSS;
  document.head.appendChild(s);
}

// 2. Глобал заруудыг (Popunder, Social Bar) ажиллуулах
function initGlobalAds() {
  if (!window.GLOBAL_ADS) return;
  const scripts = [window.GLOBAL_ADS.popunder, window.GLOBAL_ADS.socialBar];
  scripts.forEach(src => {
    if (!src) return;
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    document.head.appendChild(s);
  });
}

// 3. Баннер заруудыг үүсгэх
function _zarBuildEl(ad) {
  const wrap = document.createElement('div');
  wrap.className = 'ad-wrap';
  const adImage = ad.image || ad.src;
  const hasImage = adImage && adImage.includes('http');
  const targetLink = ad.link || ad.src;

  if (hasImage) {
    wrap.innerHTML = `
      <a href="${targetLink}" target="_blank" rel="noopener" class="ad-img-box" style="display:block; text-decoration:none; position:relative;">
        <div class="ad-corner-badge">${ad.label || 'РЕКЛАМ'}</div>
        <img src="${adImage}" alt="Ads" style="width:100%; border-radius:10px; display:block; border:1px solid rgba(212,175,55,0.3);">
      </a>`;
  } else {
    wrap.innerHTML = `
      <div class="ad-empty-box">
        <div>
          <div style="color:#D4AF37; font-weight:600;">${ad.label || 'BANNER'} - Реклам байрлуул</div>
          <div style="color:rgba(212,175,55,0.5); font-size:12px;">Холбогдох: 99376238</div>
        </div>
        <a href="tel:99376238" class="ad-phone-btn">📞 99376238</a>
      </div>`;
  }
  return wrap;
}

// 4. Баннер заруудыг байрлуулах
export function insertAds() {
  _zarInjectCSS();
  document.querySelectorAll('.ad-wrap').forEach(el => el.remove());
  const ads = window.MY_ADS || [];
  ads.forEach(ad => {
    if (!ad.isActive) return;
    const row = document.getElementById(ad.afterRowId);
    if (row && row.parentElement) {
      row.parentElement.insertAdjacentElement('afterend', _zarBuildEl(ad));
    }
  });
}

// Ачаалах үед бүгдийг дуудна
window.addEventListener('load', () => {
    initGlobalAds(); // Popunder, Social Bar ачаалах
    setTimeout(insertAds, 800); // Баннер ачаалах
});

window.insertAds = insertAds;
