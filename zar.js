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
// ── AdBlock илрүүлэлт — найдвартай нэг арга ─────────────────
// ══════════════════════════════════════════════════════════════
//
// Яагаад зөвхөн bait-div арга вэ?
//   • Network fetch (Google Ads) → сүлжээний алдаа, firewall,
//     удаан connection дээр adblock байхгүй ч fail болдог.
//   • Bait-div → adblock CSS filter-ийн тусгай зорилт.
//     Бусад юм нь огт нөлөөлдөггүй тул false positive байхгүй.
//
// Яагаад 2 удаа шалгах вэ?
//   • Эхний шалгалт хурдан ачаалал дээр өргөн filter-ийг
//     хүлээхгүйгээр гарч болдог. 800ms дараа давтвал найдвартай.

function _checkBaitDiv() {
  return new Promise(resolve => {
    // ① Bait-д хэрэглэгдэх тусгай CSS — height:1px тогтооно
    const style = document.createElement('style');
    style.id = '_zar_bait_style';
    style.textContent = '#_zar_ad_bait{display:block;height:1px;width:1px;}';
    document.head.appendChild(style);

    // ② Adblock-ийн хамгийн нийтлэг target class-ууд
    const bait = document.createElement('div');
    bait.id    = '_zar_ad_bait';
    bait.className = 'ad ads adsbox adsbygoogle pub_300x250 text-ad';
    bait.setAttribute('aria-hidden', 'true');
    // Харагдахгүй газар байрлуул — layout-д нөлөөлөхгүй
    bait.style.cssText = 'position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:-1;';
    document.body.appendChild(bait);

    // ③ AdBlock-д CSS filter хэрэглэх хугацаа өг
    setTimeout(() => {
      // offsetHeight === 0  →  adblock display:none !important тавьсан
      const blocked = bait.offsetHeight === 0;
      bait.remove();
      style.remove();
      resolve(blocked);
    }, 300);
  });
}

// 2 удаа шалгаж баталгаажуулна — хоёулаа true байж гэмэ adblock гэж үзнэ
async function detectAdBlock() {
  if (window.isTV) return false;

  const first = await _checkBaitDiv();
  if (!first) return false;                    // Эхний шалгалтад blocked биш → adblock байхгүй

  // Эхний шалгалтад blocked → 800ms хүлээгээд дахин баталгаажуулна
  await new Promise(r => setTimeout(r, 800));
  const second = await _checkBaitDiv();
  return second;                               // Хоёулаа true байж гэмэ adblock гэж үзнэ
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
    // 5 секунд тутамд дахин шалгах — унтраасан бол wall хаана
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
  if (!blocked) initGlobalAds();
});

window.insertAds = insertAds;
