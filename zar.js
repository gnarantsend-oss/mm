import './zar-config.js';
import { ZAR_CSS } from './zar-styles.js';

// ── CSS inject ────────────────────────────────────────────────
function _zarInjectCSS() {
  if (document.getElementById('_zar_css')) return;
  const s = document.createElement('style');
  s.id = '_zar_css';
  s.textContent = ZAR_CSS;
  document.head.appendChild(s);
}

// ── 1-р зар: Popunder + Social Bar script-ууд ────────────────
function initGlobalAds() {
  if (!window.GLOBAL_ADS) return;
  [window.GLOBAL_ADS.popunder, window.GLOBAL_ADS.socialBar].forEach(src => {
    if (!src) return;
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    document.head.appendChild(s);
  });
}

// ── Banner element үүсгэх ─────────────────────────────────────
function _zarBuildEl(b) {
  const wrap = document.createElement('div');
  wrap.className = 'ad-wrap';

  const imgSrc = b.src || b.image || null;   // src эсвэл image аль нэг
  const label  = b.label || 'РЕКЛАМ';

  if (b.type === 'embed' && imgSrc) {
    // iframe banner
    wrap.innerHTML = `
      <div class="ad-img-box" style="cursor:default;position:relative;">
        <div class="ad-corner-badge">${label}</div>
        <iframe src="${imgSrc}" frameborder="0" allowfullscreen
          style="width:100%;height:160px;border-radius:10px;display:block;border:1px solid rgba(212,175,55,0.3);"></iframe>
      </div>`;

  } else if (imgSrc) {
    // зургийн banner — link байвал дарахад очно
    const href = b.link || imgSrc;
    wrap.innerHTML = `
      <a href="${href}" target="_blank" rel="noopener"
         class="ad-img-box" style="display:block;text-decoration:none;position:relative;">
        <div class="ad-corner-badge">${label}</div>
        <img src="${imgSrc}" alt="${label}" loading="lazy"
          style="width:100%;border-radius:10px;display:block;border:1px solid rgba(212,175,55,0.3);">
      </a>`;

  } else {
    // хоосон placeholder
    const phone = window.CONTACT_PHONE || '99376238';
    wrap.innerHTML = `
      <div class="ad-empty-box">
        <div>
          <div style="color:#D4AF37;font-weight:600;">${label} — Реклам байрлуул</div>
          <div style="color:rgba(212,175,55,0.5);font-size:12px;">Холбогдох: ${phone}</div>
        </div>
        <a href="tel:${phone}" class="ad-phone-btn">📞 ${phone}</a>
      </div>`;
  }
  return wrap;
}

// ── 2+3-р зар: Image banner-ууд — data_banner.json-оос ────────
export async function insertAds() {
  _zarInjectCSS();

  // Хуучин banner цэвэрлэ
  document.querySelectorAll('.ad-wrap').forEach(el => el.remove());

  // data_banner.json уншина
  let banners = window.BANNERS || [];
  if (!banners.length) {
    try {
      banners = await fetch('data_banner.json').then(r => r.json());
      window.BANNERS = banners;
    } catch (e) {
      console.warn('data_banner.json уншигдсангүй:', e);
      return;
    }
  }

  // afterRowId байвал → тэр row-ийн дараа тавина (тодорхой байрлал)
  // afterRowId байхгүй бол → HOME_ROWS-ийн эгнээ бүрийн дараа cycling
  const fixedBanners  = banners.filter(b => b.afterRowId);
  const cyclingBanners = banners.filter(b => !b.afterRowId);

  // Тодорхой байрлал
  fixedBanners.forEach(b => {
    const rowEl = document.getElementById(b.afterRowId);
    if (!rowEl) return;
    const section = rowEl.closest('section') || rowEl.parentElement;
    if (section) section.insertAdjacentElement('afterend', _zarBuildEl(b));
  });

  // HOME_ROWS-ийн дунд cycling
  if (!cyclingBanners.length || !window.HOME_ROWS) return;
  let bidx = 0;
  window.HOME_ROWS.forEach(({ id }) => {
    const rowEl = document.getElementById(id);
    if (!rowEl) return;
    const section = rowEl.closest('section');
    if (!section) return;
    const b = cyclingBanners[bidx % cyclingBanners.length];
    section.insertAdjacentElement('afterend', _zarBuildEl(b));
    bidx++;
  });
}

window.addEventListener('load', () => {
  initGlobalAds();   // Popunder + Social Bar
});

window.insertAds = insertAds;
