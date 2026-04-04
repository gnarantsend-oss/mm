// games-data.js
const RAWG_KEY = 'd5b91afa0e704aa3b31930dfc78e5cfe';

// ─── СТАТИК ДАТА (шууд ачаалагдана, хуудас харлахгүй) ───────────────
window.HERO_GAMES = [
  { title:'PUBG',             cat:'Shooter',  desc:'Battle Royale',          trailer:'GXXEsnG14kw', poster:'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578080/library_600x900_2x.jpg' },
  { title:'Dota 2',           cat:'Strategy', desc:'MOBA - Стратеги',        trailer:'-cSFPIwMEq4',  poster:'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/library_600x900_2x.jpg' },
  { title:'Counter-Strike 2', cat:'Shooter',  desc:'Тактикийн буудлага',     trailer:'c80dVYcL69E',  poster:'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/library_600x900_2x.jpg' },
  { title:'Apex Legends',     cat:'Shooter',  desc:'Хурдтай Battle Royale',  trailer:'e_E9W2vsRbQ',  poster:'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/library_600x900_2x.jpg' },
  { title:'Rust',             cat:'Survival', desc:'Амьд үлдэх тулаан',      trailer:'W1ZJ1Hj2kQY',  poster:'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/252490/library_600x900_2x.jpg' },
];

window.GAMES_LIST = [
  // 🧩 ОЮУН УХААН & ТААВАР
  { slug:'wordle',            title:'Wordle',           cat:'puzzle',   desc:'Үг таах тоглоом',              embed:'https://wordleunlimited.org/',                   poster:'https://placehold.co/400x600/1a1a2e/ffffff?text=Wordle' },
  { slug:'2048-game',         title:'2048',             cat:'puzzle',   desc:'Тоон нийлүүлэлт',              embed:'https://play2048.co/',                           poster:'https://placehold.co/400x600/2d1f00/ffffff?text=2048' },
  { slug:'sudoku',            title:'Sudoku',           cat:'puzzle',   desc:'Судоку тоглоом',               embed:'https://sudoku.com/',                            poster:'https://placehold.co/400x600/0d1b2a/ffffff?text=Sudoku' },
  { slug:'crossword',         title:'Crossword',        cat:'puzzle',   desc:'Үгийн сүлжээ',                 embed:'https://crosswordlabs.com/',                    poster:'https://placehold.co/400x600/1a1a1a/ffffff?text=Crossword' },
  { slug:'baba-is-you',       title:'Baba Is You',      cat:'puzzle',   desc:'Дүрмийг өөрчлөх тавилан',     embed:'https://poki.com/en/g/baba-is-you',              poster:'https://placehold.co/400x600/3a2060/ffffff?text=Baba+Is+You' },

  // ♟️ СТРАТЕГИ
  { slug:'chess',             title:'Chess',            cat:'strategy', desc:'Шатар тоглоом',                embed:'https://www.chess.com/play/computer',            poster:'https://placehold.co/400x600/2d1515/ffffff?text=Chess' },
  { slug:'minesweeper',       title:'Minesweeper',      cat:'strategy', desc:'Минэ эрэх тоглоом',            embed:'https://minesweeper.online/',                   poster:'https://placehold.co/400x600/1a3a1a/ffffff?text=Minesweeper' },
  { slug:'solitaire',         title:'Solitaire',        cat:'strategy', desc:'Картын тоглоом',               embed:'https://www.solitaire.org/',                    poster:'https://placehold.co/400x600/1a1a3a/ffffff?text=Solitaire' },
  { slug:'mini-metro',        title:'Mini Metro',       cat:'strategy', desc:'Метро сүлжээ байгуул',         embed:'https://dinopoloclub.com/minimetro/',            poster:'https://placehold.co/400x600/0a2a4a/ffffff?text=Mini+Metro' },

  // 🕹️ АРКАД
  { slug:'geometry-dash',     title:'Geometry Dash',    cat:'arcade',   desc:'Хэмнэлт үсрэлт',              embed:'https://geometrydash.io/',                      poster:'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322170/library_600x900_2x.jpg' },
  { slug:'terraria',          title:'Terraria',         cat:'arcade',   desc:'2D Адал явдал',                embed:'https://g.vseigru.net/14/igra-terrariya/',       poster:'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/library_600x900_2x.jpg' },
  { slug:'snake-game',        title:'Snake',            cat:'arcade',   desc:'Могойн тоглоом',               embed:'https://playsnake.org/',                        poster:'https://placehold.co/400x600/003300/ffffff?text=Snake' },
  { slug:'pac-man',           title:'Pac-Man',          cat:'arcade',   desc:'Пак-ман классик',              embed:'https://freepacman.org/',                       poster:'https://placehold.co/400x600/332b00/ffffff?text=Pac-Man' },
  { slug:'stardew-valley',    title:'Stardew Valley',   cat:'arcade',   desc:'Фермийн амьдрал',              embed:'https://playclassic.games/games/role-playing-dos-games-online/play-stardew-valley-online/', poster:'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/library_600x900_2x.jpg' },
  { slug:'celeste',           title:'Celeste',          cat:'arcade',   desc:'Уулыг давах адал явдал',       embed:'https://poki.com/en/g/celeste-classic',          poster:'https://placehold.co/400x600/1a0a3a/ffffff?text=Celeste' },

  // 👥 ОЛОН ТОГЛОГЧТОЙ IO
  { slug:'among-us',          title:'Among Us',         cat:'multi',    desc:'Хуурамч тоглогчийг ол',        embed:'https://among-us.io/',                          poster:'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/945360/library_600x900_2x.jpg' },
  { slug:'brawlhalla',        title:'Brawlhalla',       cat:'multi',    desc:'2D Тулаан',                    embed:'https://www.brawlhalla.com/play/',               poster:'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/341150/library_600x900_2x.jpg' },
  { slug:'agar-io',           title:'Agar.io',          cat:'multi',    desc:'Хүн идэх тоглоом',             embed:'https://agar.io/',                              poster:'https://placehold.co/400x600/003310/ffffff?text=Agar.io' },
  { slug:'slither-io',        title:'Slither.io',       cat:'multi',    desc:'Олон тоглогчийн могой',        embed:'https://slither.io/',                           poster:'https://placehold.co/400x600/1a1a00/ffffff?text=Slither.io' },
  { slug:'diep-io',           title:'Diep.io',          cat:'multi',    desc:'Танкийн тулаан',               embed:'https://diep.io/',                              poster:'https://placehold.co/400x600/001a3a/ffffff?text=Diep.io' },
  { slug:'zombs-royale',      title:'ZombsRoyale.io',   cat:'multi',    desc:'Зомбитой Battle Royale',       embed:'https://zombsroyale.io/',                       poster:'https://placehold.co/400x600/3a1a00/ffffff?text=ZombsRoyale' },

  // ⚔️ ТУЛААН & БУУДЛАГА
  { slug:'krunker-io',        title:'Krunker.io',       cat:'action',   desc:'3D Буудлага',                  embed:'https://krunker.io/',                           poster:'https://placehold.co/400x600/4a1414/ffffff?text=Krunker' },
  { slug:'1v1-lol',           title:'1v1.LOL',          cat:'action',   desc:'Барилга барьж буудалцах',      embed:'https://1v1.lol/',                              poster:'https://placehold.co/400x600/2a144a/ffffff?text=1v1.LOL' },
  { slug:'venge-io',          title:'Venge.io',         cat:'action',   desc:'Онлайн FPS буудлага',          embed:'https://venge.io/',                             poster:'https://placehold.co/400x600/333314/ffffff?text=Venge.io' },
  { slug:'shell-shockers',    title:'Shell Shockers',   cat:'action',   desc:'Өндөгний буудлага',            embed:'https://shellshock.io/',                        poster:'https://placehold.co/400x600/4a2a00/ffffff?text=Shell+Shockers' },
  { slug:'narrow-one',        title:'Narrow.One',       cat:'action',   desc:'Сумны тулаан',                 embed:'https://narrow.one/',                           poster:'https://placehold.co/400x600/2a3a00/ffffff?text=Narrow.One' },

  // 🏎️ СПОРТ & УРАЛДААН
  { slug:'moto-x3m',          title:'Moto X3M',         cat:'sports',   desc:'Мотоциклын саадтай уралдаан',  embed:'https://motox3m.co/',                           poster:'https://placehold.co/400x600/4a2a14/ffffff?text=Moto+X3M' },
  { slug:'basketball-stars',  title:'Basketball Stars',  cat:'sports',   desc:'Сагсан бөмбөгийн одод',       embed:'https://basketballstars.io/',                   poster:'https://placehold.co/400x600/4a1414/ffffff?text=Basketball' },
  { slug:'8-ball-pool',       title:'8 Ball Pool',       cat:'sports',   desc:'Биллиард',                    embed:'https://8ballpool.com/',                        poster:'https://placehold.co/400x600/142a4a/ffffff?text=8+Ball+Pool' },
  { slug:'retro-bowl',        title:'Retro Bowl',        cat:'sports',   desc:'Американ хөлбөмбөг',           embed:'https://retrobowl.me/',                         poster:'https://placehold.co/400x600/1a3a00/ffffff?text=Retro+Bowl' },

  // ☕ ЧӨЛӨӨТ ЦАГ
  { slug:'cookie-clicker',    title:'Cookie Clicker',    cat:'casual',   desc:'Жигнэмэг товшилтын тоглоом',  embed:'https://orteil.dashnet.org/cookieclicker/',     poster:'https://placehold.co/400x600/3a1a00/ffffff?text=Cookie+Clicker' },
  { slug:'dino-game',         title:'Dino Game',         cat:'casual',   desc:'Chrome-ийн динозавр',           embed:'https://chromedino.com/',                      poster:'https://placehold.co/400x600/1a1a1a/ffffff?text=Dino+Game' },
  { slug:'subway-surfers',    title:'Subway Surfers',    cat:'casual',   desc:'Галт тэрэгний зам дээрх гүйлт', embed:'https://poki.com/en/g/subway-surfers',          poster:'https://placehold.co/400x600/144a4a/ffffff?text=Subway+Surfers' },
  { slug:'temple-run-2',      title:'Temple Run 2',      cat:'casual',   desc:'Сүмээс зугтах нь',             embed:'https://poki.com/en/g/temple-run-2',            poster:'https://placehold.co/400x600/4a4a14/ffffff?text=Temple+Run' },
];

window.GAME_SECTIONS = [
  { id:'grow_puzzle',   title:'🧩 Оюун ухаан & Таавар',  key:'puzzle'   },
  { id:'grow_strategy', title:'♟️ Стратеги & Хөлөгт',    key:'strategy' },
  { id:'grow_arcade',   title:'🕹️ Сонгодог Аркад',       key:'arcade'   },
  { id:'grow_multi',    title:'👥 Олон тоглогчтой IO',   key:'multi'    },
  { id:'grow_action',   title:'⚔️ Тулаан & Буудлага',    key:'action'   },
  { id:'grow_sports',   title:'🏎️ Спорт & Уралдаан',     key:'sports'   },
  { id:'grow_casual',   title:'☕ Чөлөөт цаг & Бусад',   key:'casual'   },
];

// ─── RAWG-аас арын дэвсгэрт постер/рейтинг ачаалаад live шинэчлэнэ ─
async function _rawgFetch(slug) {
  try {
    const r = await fetch(`https://api.rawg.io/api/games/${slug}?key=${RAWG_KEY}`);
    if (!r.ok) return null;
    const d = await r.json();
    return {
      poster:     d.background_image || null,
      rating:     d.rating           || 0,
      metacritic: d.metacritic       || null,
      desc:       d.genres?.map(g => g.name).join(', ') || null,
      playtime:   d.playtime         || 0,
    };
  } catch { return null; }
}

window.enhanceGamesWithRawg = async function() {
  for (const game of window.GAMES_LIST) {
    const info = await _rawgFetch(game.slug);
    if (!info) continue;

    if (info.poster)     game.poster     = info.poster;
    if (info.rating)     game.rating     = info.rating;
    if (info.metacritic) game.metacritic = info.metacritic;
    if (info.desc)       game.desc       = info.desc;
    if (info.playtime)   game.playtime   = info.playtime;

    // DOM-д шууд тусга
    document.querySelectorAll(`[data-slug="${game.slug}"]`).forEach(card => {
      const img = card.querySelector('img');
      if (img && info.poster) { img.src = info.poster; }
      const rEl = card.querySelector('.mcard-rating');
      if (rEl && info.rating) rEl.textContent = `⭐ ${info.rating.toFixed(1)}`;
      const mEl = card.querySelector('.mcard-meta');
      if (mEl && info.metacritic) mEl.textContent = info.metacritic;
      const sEl = card.querySelector('.mcard-sub');
      if (sEl && info.desc) sEl.textContent = info.desc;
    });

    await new Promise(r => setTimeout(r, 120)); // rate limit
  }
};
