// ============================================================
// weather/data.js — Хотуудын жагсаалт + туслах функцүүд
// ============================================================

export const MN_CITIES = [
  { name: 'Улаанбаатар', en: 'Ulaanbaatar',  emoji: '🏙️' },
  { name: 'Дархан',       en: 'Darkhan',       emoji: '🏭' },
  { name: 'Эрдэнэт',     en: 'Erdenet',       emoji: '⛏️' },
  { name: 'Өлгий',       en: 'Olgiy',         emoji: '🏔️' },
  { name: 'Чойбалсан',   en: 'Choibalsan',    emoji: '🌾' },
  { name: 'Мөрөн',       en: 'Murun',         emoji: '🌲' },
  { name: 'Баянхонгор',  en: 'Bayankhongor',  emoji: '🏜️' },
  { name: 'Сайншанд',    en: 'Sainshand',     emoji: '🏝️' },
  { name: 'Ховд',        en: 'Khovd',         emoji: '⛰️' },
  { name: 'Арвайхээр',   en: 'Arvaikheer',    emoji: '🌻' },
  { name: 'Цэцэрлэг',    en: 'Tsetserleg',    emoji: '🌸' },
  { name: 'Улиастай',    en: 'Uliastai',      emoji: '🌿' },
  { name: 'Зуунмод',     en: 'Zuunmod',       emoji: '🏡' },
  { name: 'Сүхбаатар',   en: 'Sukhbaatar',    emoji: '🏙️' },
  { name: 'Алтай',       en: 'Altai',         emoji: '⛰️' },
  { name: 'Баруун-Урт',  en: 'Baruun-Urt',    emoji: '🌅' },
  { name: 'Даланзадгад', en: 'Dalanzadgad',   emoji: '☀️' },
  { name: 'Өндөрхаан',   en: 'Ondorhaan',     emoji: '🌾' },
  { name: 'Улаангом',    en: 'Ulaangom',      emoji: '🌊' },
  { name: 'Манлай',      en: 'Manlai',        emoji: '🏜️' },
  { name: 'Баянтал',     en: 'Bayantal',      emoji: '🌄' },
];

// Цаг агаарын код → emoji
export function wIcon(code) {
  if (code < 300) return '⛈️';
  if (code < 400) return '🌧️';
  if (code < 600) return '🌧️';
  if (code < 700) return '❄️';
  if (code < 800) return '🌫️';
  if (code === 800) return '☀️';
  if (code <= 802) return '⛅';
  return '☁️';
}

// Температур → өнгө
export function wColor(t) {
  if (t < -25) return '#4fc3f7';
  if (t < -10) return '#81d4fa';
  if (t <   0) return '#b3e5fc';
  if (t <  15) return '#fff59d';
  if (t <  25) return '#ffcc80';
  return '#ef9a9a';
}
