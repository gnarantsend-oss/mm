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
function _loadScript(src, onload, attrs = {}) {
  const s = document.createElement('script');
  s.src   = src;
  s.async = true;
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  if (onload) s.onload = onload;
  document.head.appendChild(s);
  return s;
}

// ══════════════════════════════════════════════════════════════
// ── AdBlock илрүүлэлт — BlockAdBlock library-ийн арга ────────
// ══════════════════════════════════════════════════════════════
const BAIT_CLASS = 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links ad-banner adsbox adsbygoogle';
const BAIT_STYLE = 'width:1px!important;height:1px!important;position:absolute!important;left:-10000px!important;top:-1000px!important;';

function _singleCheck() {
  return new Promise(resolve => {
    const bait = document.createElement('div');
    bait.setAttribute('class', BAIT_CLASS);
    bait.setAttribute('style', BAIT_STYLE);
    document.body.appendChild(bait);

    void bait.offsetParent;
    void bait.offsetHeight;
    void bait.offsetWidth;

    setTimeout(() => {
      const cs = window.getComputedStyle(bait);
      const blocked =
        cs.getPropertyValue('display')     === 'none'    ||
        cs.getPropertyValue('visibility')  === 'hidden'  ||
        cs.getPropertyValue('opacity')     === '0'       ||
        bait.offsetHeight === 0  ||
        bait.offsetWidth  === 0  ||
        bait.clientHeight === 0  ||
        bait.clientWidth  === 0;
      document.body.removeChild(bait);
      resolve(blocked);
    }, 50);
  });
}

async function detectAdBlock() {
  if (window.isTV) return false;

  const MAX = 5;
  let blockedCount = 0;

  for (let i = 0; i < MAX; i++) {
    const blocked = await _singleCheck();
    if (blocked) blockedCount++;
  }

  return blockedCount >= 3;
}

// ── AdBlock wall ─────────────────────────────────────────────
function _buildAdBlockWall() {
  if (document.getElementById('_adblock_wall')) return;
  const wall = document.createElement('div');
  wall.id = '_adblock_wall';
  wall.innerHTML = `
    <div class="_abw-box">
      <div class="_abw-icon">🚫</div>
      <h2 class="_abw-title">AdBlock илэрлээ!</h2>
      <p class="_abw-desc">
        Энэ сайт <strong>үнэгүй</strong> байдаг тул зарын орлогоор ажилладаг.<br>
        Та AdBlock-оо унтраасны дараа сайтыг ашиглах боломжтой.
      </p>
      <div class="_abw-steps">
        <div class="_abw-step">
          <span class="_abw-num">1</span>
          <span>Браузерийн баруун дээд булангаас <strong>AdBlock</strong> товчийг дарна</span>
        </div>
        <div class="_abw-step">
          <span class="_abw-num">2</span>
          <span>Энэ сайтад <strong>"Идэвхгүй болгох"</strong> эсвэл <strong>"Whitelist"</strong> сонгоно</span>
        </div>
        <div class="_abw-step">
          <span class="_abw-num">3</span>
          <span>Дараах товч дарж хуудсыг <strong>шинэчилнэ</strong></span>
        </div>
      </div>
      <button class="_abw-btn" onclick="location.reload()">
        ✅ Унтрааллаа — Шинэчлэх
      </button>
      <p class="_abw-note">⏱ Автоматаар 5 секунд тутамд шалгана</p>
    </div>
  `;
  document.body.appendChild(wall);
  document.body.style.overflow = 'hidden';
}

function _removeAdBlockWall() {
  const wall = document.getElementById('_adblock_wall');
  if (wall) wall.remove();
  document.body.style.overflow = '';
}

async function checkAndEnforceAdBlock() {
  _zarInjectCSS();
  const hasAdBlock = await detectAdBlock();

  if (hasAdBlock) {
    _buildAdBlockWall();
    const iv = setInterval(async () => {
      const still = await detectAdBlock();
      if (!still) {
        clearInterval(iv);
        _removeAdBlockWall();
        initGlobalAds();
      }
    }, 5000);
  }

  return hasAdBlock;
}

// ── 1-р зар: Popunder + Social Bar + Banner slot ─────────────
function initGlobalAds() {
  if (!window.GLOBAL_ADS) return;
  const ads = window.GLOBAL_ADS;

  if (!window.isTV) {
    if (ads.popunder)  _loadScript(ads.popunder);
    if (ads.socialBar) _loadScript(ads.socialBar);
  }

  // Banner 728x90 slot
  const slot = document.getElementById('adsterra-banner-slot');
  if (slot && ads.bannerKey) {
    slot.className = 'adsterra-banner-wrap';
    const inner = document.createElement('div');
    inner.className = 'adsterra-banner-inner';
    slot.appendChild(inner);
    window.atOptions = {
      'key'    : ads.bannerKey,
      'format' : 'iframe',
      'height' : window.isTV ? 60 : 90,
      'width'  : window.isTV ? 468 : 728,
      'params' : {}
    };
    _loadScript(`https://www.highperformanceformat.com/${ads.bannerKey}/invoke.js`);
  }

  // Smartlink — nav дахь линк
  if (ads.smartlink) {
    const navLink = document.getElementById('nav-smartlink');
    if (navLink) navLink.href = ads.smartlink;
  }
}

// ── Banner 728x90 element үүсгэх ──────────────────────────────
function _zarBuildBannerEl() {
  const key = window.GLOBAL_ADS?.bannerKey || 'd2854ac5234b3ab02d5a2839d6dbef5e';
  const wrap = document.createElement('div');
  wrap.className = 'ad-wrap';
  const inner = document.createElement('div');
  inner.className = 'adsterra-banner-inner';
  const optScript = document.createElement('script');
  optScript.textContent = `window.atOptions = { "key": "${key}", "format": "iframe", "height": 90, "width": 728, "params": {} };`;
  const invScript = document.createElement('script');
  invScript.src   = `https://www.highperformanceformat.com/${key}/invoke.js`;
  invScript.async = true;
  inner.appendChild(optScript);
  inner.appendChild(invScript);
  wrap.appendChild(inner);
  return wrap;
}

// ── Native Banner element үүсгэх ─────────────────────────────
function _zarBuildNativeEl() {
  const nb = window.GLOBAL_ADS?.nativeBanner;
  if (!nb) return null;

  const wrap = document.createElement('div');
  wrap.className = 'ad-wrap ad-wrap--native';

  // Container div — native banner скрипт эндэд агуулга оруулна
  const container = document.createElement('div');
  container.id = nb.containerId;
  wrap.appendChild(container);

  // Invoke script
  const s = document.createElement('script');
  s.src   = nb.src;
  s.async = true;
  s.setAttribute('data-cfasync', 'false');
  wrap.appendChild(s);

  return wrap;
}

// ── Banner/Native — data_banner.json-оос ─────────────────────
export async function insertAds() {
  _zarInjectCSS();
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

  banners.filter(b => b.active !== false).forEach(b => {
    const rowEl = document.getElementById(b.afterRowId);
    if (!rowEl) return;

    const section = rowEl.closest('section') || rowEl.parentElement;
    if (!section) return;

    let el = null;
    if (b.type === 'native') {
      el = _zarBuildNativeEl();
    } else {
      // default: adsterra banner 728x90
      el = _zarBuildBannerEl();
    }

    if (el) section.insertAdjacentElement('afterend', el);
  });
}

// ── Эхлүүлэх ─────────────────────────────────────────────────
window.addEventListener('load', async () => {
  const blocked = await checkAndEnforceAdBlock();
  if (!blocked) initGlobalAds();
});

window.insertAds = insertAds;
