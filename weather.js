import './weather-data.js';

let weatherLoaded = false;

window.loadWeather = async function() {
  if (weatherLoaded) return;
  weatherLoaded = true;
  const grid = document.getElementById('weatherGrid');
  if (!grid) return;
  grid.innerHTML = `<div class="w-loading">⏳ Цаг агаарын мэдээлэл татаж байна...</div>`;

  const results = await Promise.allSettled(
    window.MN_CITIES.map(c =>
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${c.en}&appid=${window.OW_KEY}&units=metric`).then(r => r.json())
    )
  );

  grid.innerHTML = '';
  const now = new Date();
  const upd = document.getElementById('weatherLastUpdate');
  if (upd) upd.textContent = `✅ Сүүлд шинэчлэгдсэн: ${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;

  results.forEach((res, i) => {
    const city = window.MN_CITIES[i];
    const d    = res.status === 'fulfilled' ? res.value : null;
    const card = document.createElement('div');
    card.className = 'w-card';
    if (d?.main) {
      const temp = Math.round(d.main.temp), feel = Math.round(d.main.feels_like);
      card.innerHTML = `
        <div class="w-card-header"><div class="w-city-name">${city.emoji} ${city.name}</div><div class="w-icon-big">${window.wIcon(d.weather[0].id)}</div></div>
        <div class="w-temp-big" style="color:${window.wColor(temp)}">${temp > 0 ? '+' : ''}${temp}°C</div>
        <div class="w-desc-text">${d.weather[0].description}</div>
        <div class="w-stats">
          <div class="w-stat"><div class="w-stat-label">🌡️ Мэдрэгдэх</div><div class="w-stat-val">${feel > 0 ? '+' : ''}${feel}°C</div></div>
          <div class="w-stat"><div class="w-stat-label">💧 Чийгшил</div><div class="w-stat-val">${d.main.humidity}%</div></div>
          <div class="w-stat"><div class="w-stat-label">💨 Салхи</div><div class="w-stat-val">${(d.wind.speed*3.6).toFixed(0)} км/ц</div></div>
          <div class="w-stat"><div class="w-stat-label">🌀 Даралт</div><div class="w-stat-val">${d.main.pressure} hPa</div></div>
        </div>`;
    } else {
      card.innerHTML = `
        <div class="w-card-header"><div class="w-city-name">${city.emoji} ${city.name}</div><div class="w-icon-big">❓</div></div>
        <div class="w-temp-big" style="color:var(--text3)">—</div><div class="w-desc-text">Мэдээлэл байхгүй</div>`;
    }
    grid.appendChild(card);
  });
};

window.refreshWeather = () => { weatherLoaded = false; window.loadWeather(); };
