if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      console.log('Nabooshy PWA бэлэн боллоо!', reg.scope);
    }).catch(err => {
      console.log('PWA бүртгэхэд алдаа гарлаа:', err);
    });
  });
}