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
function _loadScript(src, attrs = {}) {
  const s = document.createElement('script');
  s.src   = src;
  s.async = true;
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  document.head.appendChild(s);
  return s;
}

// ══════════════════════════════════════════════════════════════
// ── AdBlock илрүүлэлт ─────────────────────────────────────────
// ══════════════════════════════════════════════════════════════
const BAIT_CLASS = 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links ad-banner adsbox adsbygoogle';
const BAIT_STYLE = 'width:1px!important;height:1px!important;position:absolute!important;left:-10000px!important;top:-1000px!important;';

function _singleCheck() {
  return new Promise(resolve => {
    const bait = document.createElement('div');
    bait.setAttribute('class', BAIT_CLASS);
    bait.setAttribute('style', BAIT_STYLE);
    document.body.appendChild(bait);
    void bait.offsetParent; void bait.offsetHeight; void bait.offsetWidth;
    setTimeout(() => {
      const cs = window.getComputedStyle(bait);
      const blocked =
        cs.getPropertyValue('display')    === 'none'   ||
        cs.getPropertyValue('visibility') === 'hidden' ||
        cs.getPropertyValue('opacity')    === '0'      ||
        bait.offsetHeight === 0 || bait.offsetWidth  === 0 ||
        bait.clientHeight === 0 || bait.clientWidth  === 0;
      document.body.removeChild(bait);
      resolve(blocked);
    }, 50);
  });
}

async function detectAdBlock() {
  if (window.isTV) return false;
  let blockedCount = 0;
  for (let i = 0; i < 5; i++) {
    if (await _singleCheck()) blockedCount++;
  }
  return blockedCount >= 3;
}

// ── AdBlock wall ──────────────────────────────────────────────
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
        <div class="_abw-step"><span class="_abw-num">1</span>
          <span>Браузерийн баруун дээд булангаас <strong>AdBlock</strong> товчийг дарна</span></div>
        <div class="_abw-step"><span class="_abw-num">2</span>
          <span>Энэ сайтад <strong>"Идэвхгүй болгох"</strong> эсвэл <strong>"Whitelist"</strong> сонгоно</span></div>
        <div class="_abw-step"><span class="_abw-num">3</span>
          <span>Дараах товч дарж хуудсыг <strong>шинэчилнэ</strong></span></div>
      </div>
      <button class="_abw-btn" onclick="location.reload()">✅ Унтрааллаа — Шинэчлэх</button>
      <p class="_abw-note">⏱ Автоматаар 5 секунд тутамд шалгана</p>
    </div>`;
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
      if (!await detectAdBlock()) {
        clearInterval(iv);
        _removeAdBlockWall();
        initGlobalAds();
      }
    }, 5000);
  }
  return hasAdBlock;
}

// ══════════════════════════════════════════════════════════════
// ── SMARTLINK — Nicole-ийн "hot spots" зөвлөгөөнд тулгуурлан ─
// ══════════════════════════════════════════════════════════════
//
// Hot spots (Nicole):
//   • Call-to-action товчлуур: Watch, Play, Download
//   • Кино постер зураг (full-size image preview)
//   • Hero Watch товч
//   • Nav Урамшуулал линк
//
// Арга: event delegation — динамикаар нэмэгдэх элементүүдэд
//       автоматаар ажиллана (MutationObserver шаардлагагүй)
// ──────────────────────────────────────────────────────────────
// Smartlink хасагдсан

// ══════════════════════════════════════════════════════════════
// ── GLOBAL ADS: Popunder + Social Bar ────────────────────────
// ══════════════════════════════════════════════════════════════
function initGlobalAds() {
  if (!window.GLOBAL_ADS) return;
  const ads = window.GLOBAL_ADS;

  // Popunder — <head> дотор ачааллана
  if (!window.isTV) {
    if (ads.popunder) _loadScript(ads.popunder, { 'data-cfasync': 'false' });
  }

  // Social Bar — DOM бэлэн болсны дараа ачааллана (2026 стандарт)
  if (!window.isTV && ads.socialBar) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        _loadScript(ads.socialBar, { 'data-cfasync': 'false' });
      });
    } else {
      _loadScript(ads.socialBar, { 'data-cfasync': 'false' });
    }
  }
}

// ── Эхлүүлэх ─────────────────────────────────────────────────
window.addEventListener('load', async () => {
  const blocked = await checkAndEnforceAdBlock();
  if (!blocked) {
    initGlobalAds();

    // ── MONETAG Interesting tag ───────────────────────────────
    // Adblock байхгүй үед л ачааллана (давхар хамгаалалт)
    const monetagSrc = window.GLOBAL_ADS?.monetagTag;
    const monetagZone = window.GLOBAL_ADS?.monetagZone;
    if (monetagSrc && !window.isTV) {
      _loadScript(monetagSrc, { 'data-zone': monetagZone, 'async': true, 'data-cfasync': 'false' });
    }
  }
});
