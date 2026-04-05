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

  const imgSrc = b.src || b.image || null;
  const label  = b.label || 'РЕКЛАМ';

  if (b.type === 'embed' && imgSrc) {
    // iframe banner — createElement ашиглана
    const box = document.createElement('div');
    box.className = 'ad-img-box';
    box.style.cssText = 'cursor:default;position:relative;';

    const badge = document.createElement('div');
    badge.className = 'ad-corner-badge';
    badge.textContent = label;

    const iframe = document.createElement('iframe');
    iframe.src             = imgSrc;
    iframe.frameBorder     = '0';
    iframe.allowFullscreen = true;
    iframe.style.cssText   = 'width:100%;height:160px;border-radius:10px;display:block;border:1px solid rgba(212,175,55,0.3);';

    box.appendChild(badge);
    box.appendChild(iframe);
    wrap.appendChild(box);

  } else if (imgSrc) {
    const href = b.link || window.GLOBAL_ADS?.smartlink || imgSrc;
    const a    = document.createElement('a');
    a.href    = href;
    a.target  = '_blank';
    a.rel     = 'noopener';
    a.className = 'ad-img-box';
    a.style.cssText = 'display:block;text-decoration:none;position:relative;';

    const badge = document.createElement('div');
    badge.className   = 'ad-corner-badge';
    badge.textContent = label;

    const img = document.createElement('img');
    img.src     = imgSrc;
    img.alt     = label;
    img.loading = 'lazy';
    img.style.cssText = 'width:100%;border-radius:10px;display:block;border:1px solid rgba(212,175,55,0.3);';

    a.appendChild(badge);
    a.appendChild(img);
    wrap.appendChild(a);

  } else {
    const tg  = window.CONTACT_PHONE || 'https://t.me/oroodvz';
    const box = document.createElement('div');
    box.className = 'ad-empty-box';

    const txt = document.createElement('div');
    txt.innerHTML = `
      <div style="color:#D4AF37;font-weight:600;">${label} — Реклам байрлуул</div>
      <div style="color:rgba(212,175,55,0.5);font-size:12px;">Telegram-ээр холбогдоно уу</div>`;

    const link = document.createElement('a');
    link.href      = tg;
    link.target    = '_blank';
    link.rel       = 'noopener';
    link.className = 'ad-phone-btn';
    link.textContent = '✈️ Telegram';

    box.appendChild(txt);
    box.appendChild(link);
    wrap.appendChild(box);
  }

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
