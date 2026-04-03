const CACHE_NAME = 'nabooshy-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/config.js',
  '/manifest.json',
  '/pwa-init.js'
];

// 1. Суулгах: Статик файлуудыг кэшлэх
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. Идэвхжүүлэх: Хуучин кэшийг цэвэрлэх
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Хүсэлт барих: Видеог алгасаж, бусдыг кэшлэх
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // МАШ ЧУХАЛ: Видео болон постерыг Service Worker огт оролдохгүй!
  if (url.pathname.startsWith('/movies/') || url.pathname.startsWith('/posters/')) {
    return; 
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});