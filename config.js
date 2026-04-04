// =============================================
// ⚙️ NABOOSHY - ҮНДСЭН ТОХИРГОО (config.js)
// =============================================

// 1. API Түлхүүрүүд (AI болон Цаг агаарт зориулсан)
window.TMDB_KEY = '0b34540c864eaaf51207c87c28dabb36';
window.OW_KEY   = '28b8969deb0ae248fe2db2e6064dd511';

// 2. Ерөнхий мэдээллүүд
window.CONTACT_PHONE = '9937-6238';
window.CONTACT_EMAIL = 'gnarantsend@gmail.com';
window.CURRENT_YEAR  = new Date().getFullYear();
window.DEFAULT_CITY  = 'Ulaanbaatar';

// 3. Хугацааны тохиргоо (Миллисекундээр: 1000 = 1 секунд)
window.HERO_TIMER = 12000; // Нүүрний кино солигдох хугацаа
window.GAME_TIMER = 14000; // Тоглоомын трейлер солигдох хугацаа

// 4. Орлуулах утгууд (Мэдээлэл дутуу үед гарах)
window.FALLBACK_YEAR   = 2024;
window.FALLBACK_RATING = 7.0;
window.FALLBACK_POSTER = 'https://placehold.co/300x450/111/555?text=Зураг+байхгүй';

// 5. Глобал өгөгдлийн сангууд (Эхлэх үед хоосон байна)
window.MOVIES      = [];
window.SERIES      = [];
window.HERO_MOVIES = [];

// 6. 🔥 НҮҮР ХУУДАСНЫ ЭГНЭЭНҮҮД (Дэлхийн стандарт ангилал)
// Энд байгаа 'keys' нь data.json доторх 'genre' хэсэгтэй таарч байх ёстой.
window.HOME_ROWS = [
  { id: 'rowAction',      title: '💥 Тулаант (Action)',       keys: ['action'] },
  { id: 'rowAdventure',   title: '🗺️ Адал явдалт (Adventure)', keys: ['adventure'] },
  { id: 'rowComedy',      title: '😂 Инээдмийн (Comedy)',     keys: ['comedy'] },
  { id: 'rowDrama',       title: '🎭 Драм (Drama)',           keys: ['drama'] },
  { id: 'rowHorror',      title: '👻 Аймшгийн (Horror)',      keys: ['horror'] },
  { id: 'rowThriller',    title: '🔪 Триллер (Thriller)',     keys: ['thriller'] },
  { id: 'rowSciFi',       title: '🚀 Зөгнөлт (Sci-Fi)',       keys: ['sci-fi', 'science fiction'] },
  { id: 'rowFantasy',     title: '✨ Уран зөгнөлт (Fantasy)',  keys: ['fantasy'] },
  { id: 'rowAnimation',   title: '🎨 Хүүхэлдэйн (Animation)',  keys: ['animation', 'anime'] },
  { id: 'rowCrime',       title: '🚨 Гэмт хэрэг (Crime)',      keys: ['crime'] },
  { id: 'rowRomance',     title: '❤️ Хайр дурлал (Romance)',    keys: ['romance'] },
  { id: 'rowMystery',     title: '🕵️ Нууцлаг (Mystery)',      keys: ['mystery'] },
  { id: 'rowDocumentary', title: '📹 Баримтат (Documentary)',  keys: ['documentary'] },
  { id: 'rowFamily',      title: '👨‍👩‍👧‍👦 Гэр бүлийн (Family)',    keys: ['family'] },
  { id: 'rowHistory',     title: '🏛️ Түүхэн (History)',       keys: ['history'] },
  { id: 'rowWar',         title: '🪖 Дайны (War)',           keys: ['war'] },
  { id: 'rowBiography',   title: '📖 Намтар (Biography)',     keys: ['biography'] }
];

