// ── TV Detection ─────────────────────────────────────────────
// Smart TV, Android TV, Tizen, WebOS, Roku, FireTV г.м бүгдийг илрүүлнэ

const TV_UA = /SmartTV|SMART-TV|WebOS|Tizen|VIDAA|HbbTV|NetCast|googletv|crkey|Roku|amazonwebapp|AFT|AFTS|AFTB|TV Safari|AppleTV|appletv/i;

export const isTV = TV_UA.test(navigator.userAgent)
  || navigator.userAgent.includes('CrKey')
  || (typeof window.orientation === 'undefined' && !navigator.maxTouchPoints && window.innerWidth >= 1280 && window.matchMedia('(hover: none)').matches === false && /TV|television/i.test(navigator.userAgent));

// TV дээр байвал <body>-д класс нэм — CSS-ээр тусгаарлахад хялбар болно
if (isTV) {
  document.documentElement.classList.add('is-tv');
  console.log('[TV] Smart TV browser илэрлээ — TV горим идэвхжлээ');
}

window.isTV = isTV;
