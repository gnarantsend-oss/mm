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
function _loadScript(src, onload) {
  const s = document.createElement('script');
  s.src   = src;
  s.async = true;
  if (onload) s.onload = onload;
  document.head.appendChild(s);
  return s;
}

// ══════════════════════════════════════════════════════════════
// ── AdBlock илрүүлэлт + хаалтын дэлгэц ──────────────────────
// ══════════════════════════════════════════════════════════════

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

// AdBlock шалгах — 2 найдвартай арга
async function detectAdBlock() {
  if (window.isTV) return false;

  let blocked = false;

  // Арга 1: Хуурамч зарын div — нуугдсан эсэхийг шалгах
  try {
    const bait = document.createElement('div');
    bait.className = 'ad ads adsbox ad-placement carbon-ads pub_300x250 pub_300x250m';
    bait.style.cssText = 'position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;pointer-events:none;';
    document.body.appendChild(bait);
    await new Promise(r => setTimeout(r, 150));
    const cs = window.getComputedStyle(bait);
    if (
      cs.display === 'none' ||
      cs.visibility === 'hidden' ||
      cs.opacity === '0' ||
      bait.offsetHeight === 0
    ) {
      blocked = true;
    }
    bait.remove();
  } catch (e) { blocked = true; }

  if (blocked) return true;

  // Арга 2: Зарын network request хаагдсан эсэх
  try {
    await new Promise((resolve, reject) => {
      const t = setTimeout(() => reject(new Error('timeout')), 2000);
      const img = new Image();
      img.onload  = () => { clearTimeout(t); resolve(); };
      img.onerror = () => { clearTimeout(t); reject(); };
      img.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?t=' + Date.now();
    });
  } catch (e) {
    blocked = true;
  }

  return blocked;
}

async function checkAndEnforceAdBlock() {
  _zarInjectCSS();
  const hasAdBlock = await detectAdBlock();

  if (hasAdBlock) {
    _buildAdBlockWall();
    // 5 секунд тутамд дахин шалгах
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

// ── 1-р зар: Popunder + Social Bar ───────────────────────────
function initGlobalAds() {
  if (!window.GLOBAL_ADS) return;
  const ads = window.GLOBAL_ADS;

  if (!window.isTV) {
    if (ads.popunder)  _loadScript(ads.popunder);
    if (ads.socialBar) _loadScript(ads.socialBar);
  }

  // Banner 728x90
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

// ── Banner-ууд — data_banner.json-оос ────────────────────────
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
    if (section) section.insertAdjacentElement('afterend', _zarBuildEl(b));
  });
}

// ── Эхлүүлэх ─────────────────────────────────────────────────
window.addEventListener('load', async () => {
  const blocked = await checkAndEnforceAdBlock();
  if (!blocked) {
    initGlobalAds();
  }
});

window.insertAds = insertAds;
