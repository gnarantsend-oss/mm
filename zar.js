import './zar-config.js';
import './tv-detect.js';
import { ZAR_CSS } from './zar-styles.js';

// ── CSS inject ────────────────────────────────────────────────
function _zarInjectCSS() {
  if (document.getElementById('_zar_css')) return;
  const s = document.createElement('style');
  s.id = '_zar_css';
  s.textContent = ZAR_CSS;
  document.head.appendChild(s);
}

// ── Script аюулгүй inject хийх helper ───────────────────────
// innerHTML дотор <script> TV browser-т ажилдахгүй!
// Энэ функц document.createElement('script') ашиглана
function _loadScript(src, onload) {
  const s = document.createElement('script');
  s.src   = src;
  s.async = true;
  if (onload) s.onload = onload;
  document.head.appendChild(s);
  return s;
}

// ── 1-р зар: Popunder + Social Bar ───────────────────────────
function initGlobalAds() {
  if (!window.GLOBAL_ADS) return;
  const ads = window.GLOBAL_ADS;

  // TV дээр popunder / social bar ОГТХОН ч ажилдахгүй
  // тиймээс TV дээр энэ хэсгийг алгасна
  if (!window.isTV) {
    if (ads.popunder)  _loadScript(ads.popunder);
    if (ads.socialBar) _loadScript(ads.socialBar);
  }

  // Banner 728x90 — script-ийг document.createElement-ээр inject хийнэ
  const slot = document.getElementById('adsterra-banner-slot');
  if (slot && ads.bannerKey) {
    slot.className = 'adsterra-banner-wrap';

    // ❌ innerHTML дотор <script> тавихгүй — TV + бусад browser дэмждэггүй
    // ✅ createElement ашиглана
    const inner = document.createElement('div');
    inner.className = 'adsterra-banner-inner';
    slot.appendChild(inner);

    // atOptions глобал тохиргоо
    window.atOptions = {
      'key'    : ads.bannerKey,
      'format' : 'iframe',
      'height' : window.isTV ? 60 : 90,   // TV-д жижигрүүлнэ
      'width'  : window.isTV ? 468 : 728,
      'params' : {}
    };

    // invoke.js script аюулгүйгээр ачааллана
    _loadScript(`https://www.highperformanceformat.com/${ads.bannerKey}/invoke.js`);
  }

  // Nav smartlink
  if (ads.smartlink) {
    const navLink = document.getElementById('nav-smartlink');
    if (navLink) navLink.href = ads.smartlink;
  }
}

// ── Banner element үүсгэх ─────────────────────────────────────
function _zarBuildEl(b) {
  const wrap = document.createElement('div');
  wrap.className = 'ad-wrap';

  // Adsterra 728x90 banner — createElement ашиглана (innerHTML дотор script ажилдахгүй)
  const key = window.GLOBAL_ADS && window.GLOBAL_ADS.bannerKey ? window.GLOBAL_ADS.bannerKey : 'd2854ac5234b3ab02d5a2839d6dbef5e';
  const inner = document.createElement('div');
  inner.className = 'adsterra-banner-inner';

  const optScript = document.createElement('script');
  optScript.textContent = 'window.atOptions = { "key": "' + key + '", "format": "iframe", "height": 90, "width": 728, "params": {} };';

  const invScript = document.createElement('script');
  invScript.src   = 'https://www.highperformanceformat.com/' + key + '/invoke.js';
  invScript.async = true;

  inner.appendChild(optScript);
  inner.appendChild(invScript);
  wrap.appendChild(inner);

  return wrap;
}

// ── Banner-ууд — data_banner.json-оос (id-д суурилсан удирдлага) ──
export async function insertAds() {
  _zarInjectCSS();

  // Өмнөх banner-уудыг цэвэрлэнэ
  document.querySelectorAll('.ad-wrap').forEach(el => el.remove());

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

  // active:false бол харуулахгүй
  banners.filter(b => b.active !== false).forEach(b => {
    const rowEl = document.getElementById(b.afterRowId);
    if (!rowEl) return;
    const section = rowEl.closest('section') || rowEl.parentElement;
    if (section) section.insertAdjacentElement('afterend', _zarBuildEl(b));
  });
}

window.addEventListener('load', () => {
  initGlobalAds();
});

window.insertAds = insertAds;
