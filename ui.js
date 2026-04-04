// ============================================================
// weather/ui.js — Цаг агаарын карт үүсгэх
// ============================================================

import { MN_CITIES, wIcon, wColor } from './data.js';

export function buildWeatherCard(city, data) {
  const card = document.createElement('div');
  card.className = 'w-card';

  if (data?.main) {
    const temp = Math.round(data.main.temp);
    const feel = Math.round(data.main.feels_like);
    const icon = wIcon(data.weather[0].id);
    const desc = data.weather[0].description;
    const hum  = data.main.humidity;
    const wind = (data.wind.speed * 3.6).toFixed(0);
    const pres = data.main.pressure;

    card.innerHTML = `
      <div class="w-card-header">
        <div class="w-city-name">${city.emoji} ${city.name}</div>
        <div class="w-icon-big">${icon}</div>
      </div>
      <div class="w-temp-big" style="color:${wColor(temp)}">${temp > 0 ? '+' : ''}${temp}°C</div>
      <div class="w-desc-text">${desc}</div>
      <div class="w-stats">
        <div class="w-stat">
          <div class="w-stat-label">🌡️ Мэдрэгдэх</div>
          <div class="w-stat-val">${feel > 0 ? '+' : ''}${feel}°C</div>
        </div>
        <div class="w-stat">
          <div class="w-stat-label">💧 Чийгшил</div>
          <div class="w-stat-val">${hum}%</div>
        </div>
        <div class="w-stat">
          <div class="w-stat-label">💨 Салхи</div>
          <div class="w-stat-val">${wind} км/ц</div>
        </div>
        <div class="w-stat">
          <div class="w-stat-label">🌀 Даралт</div>
          <div class="w-stat-val">${pres} hPa</div>
        </div>
      </div>`;
  } else {
    card.innerHTML = `
      <div class="w-card-header">
        <div class="w-city-name">${city.emoji} ${city.name}</div>
        <div class="w-icon-big">❓</div>
      </div>
      <div class="w-temp-big" style="color:var(--text3)">—</div>
      <div class="w-desc-text">Мэдээлэл байхгүй</div>`;
  }

  return card;
}
