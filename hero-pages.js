import { stopProgress } from './hero-utils.js';
import { startSlide } from './hero-movies.js';
import { initGamesHero } from './hero-games.js';
import { initWeatherHero } from './hero-weather.js';

window.setPageHero = function (page) {
  const heroWrap = document.getElementById('heroWrap');

  
  if (page === 'search') {
    if (heroWrap) heroWrap.style.display = 'none';
    clearInterval(window._heroInterval);
    stopProgress();
    return;
  }

  if (heroWrap) heroWrap.style.display = '';

  if (page === 'movies') {
    if (window.HERO_MOVIES?.length) window.initHero();
    else if (window.fetchTMDBNowPlaying) window.fetchTMDBNowPlaying();
    return;
  }

  if (page === 'games')   { initGamesHero();   return; }
  if (page === 'weather') { initWeatherHero();  return; }
};
