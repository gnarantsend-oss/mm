import { animateContent } from './hero-utils.js';

export function initWeatherHero() {
  window.stopTrailer?.();

  const bg = document.querySelector('.hero-bg');
  if (bg) {
    bg.style.backgroundImage = '';
    bg.style.background = 'linear-gradient(135deg, #1a237e 0%, #0277bd 50%, #01579b 100%)';
    bg.style.opacity    = '1';
  }
  const vig = document.querySelector('.hero-vignette');
  if (vig) vig.style.opacity = '1';

  const tag = document.getElementById('heroTag');
  if (tag) tag.textContent = '🌤 ЦАГ АГААРЫН МЭДЭЭЛЭЛ';

  const title = document.getElementById('heroTitle');
  if (title) title.textContent = 'Монгол улс';

  const meta = document.getElementById('heroMeta');
  if (meta) meta.innerHTML = '<span>21 аймаг, хотын цаг агаар</span>';

  const desc = document.getElementById('heroDesc');
  if (desc) desc.textContent = '';

  const dots = document.getElementById('heroDots');
  if (dots) dots.innerHTML = '';

  const btns = document.getElementById('heroBtns');
  if (btns) {
    btns.innerHTML = `
      <button class="btn-watch" onclick="window.loadWeather?.()">☁️ Цаг агаар харах</button>
      <button class="btn-more"  onclick="window.refreshWeather?.()">🔄 Шинэчлэх</button>`;
  }
  window.hideVolBtn?.();
  animateContent();

  const cityQuery = window.DEFAULT_CITY || 'Ulaanbaatar';
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&appid=${window.OW_KEY}&units=metric`)
    .then(r => r.json())
    .then(d => {
      if (!d?.main) return;
      const temp = Math.round(d.main.temp);
      const feel = Math.round(d.main.feels_like);
      const cond = d.weather[0].main.toLowerCase();
      let icon = '🌤';
      if      (cond.includes('clear'))                         icon = '☀️';
      else if (cond.includes('cloud'))                         icon = '⛅';
      else if (cond.includes('rain'))                          icon = '🌧️';
      else if (cond.includes('snow'))                          icon = '❄️';
      else if (cond.includes('thunder'))                       icon = '⛈️';
      else if (cond.includes('mist') || cond.includes('fog')) icon = '🌫️';

      const t = document.getElementById('heroTitle');
      if (t) t.textContent = `${icon} ${cityQuery}  ${temp > 0 ? '+' : ''}${temp}°C`;

      const m = document.getElementById('heroMeta');
      if (m) m.innerHTML = `
        <span>${d.weather[0].description}</span>
        <span>·</span><span>🌡️ ${feel > 0 ? '+' : ''}${feel}°C</span>
        <span>·</span><span>💧 ${d.main.humidity}%</span>
        <span>·</span><span>💨 ${(d.wind.speed * 3.6).toFixed(0)} км/ц</span>`;

      let gradient = 'linear-gradient(135deg,#1a237e,#0277bd,#01579b)';
      if      (temp < -20) gradient = 'linear-gradient(135deg,#0d1b2a,#1b2a3b,#4fc3f7)';
      else if (temp <  -5) gradient = 'linear-gradient(135deg,#1a237e,#283593,#81d4fa)';
      else if (temp >  20) gradient = 'linear-gradient(135deg,#4a0000,#b71c1c,#ff8f00)';
      else if (temp >  10) gradient = 'linear-gradient(135deg,#1b5e20,#2e7d32,#66bb6a)';

      const b = document.querySelector('.hero-bg');
      if (b) b.style.background = gradient;
    })
    .catch(() => {});
}
