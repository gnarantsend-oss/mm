export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ── ВИДЕО БОЛОН ПОСТЕР (R2-оос дамжуулах) ──
    if (url.pathname.startsWith('/movies/') || url.pathname.startsWith('/posters/')) {
      const key = decodeURIComponent(url.pathname.substring(1));
      const range = request.headers.get('range');

      try {
        const object = await env.MY_BUCKET.get(key, { range });

        if (!object) {
          return new Response('Файл олдсонгүй!', { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Accept-Ranges', 'bytes');

        if (key.toLowerCase().endsWith('.mp4')) {
          headers.set('Content-Type', 'video/mp4');
        }

        return new Response(object.body, {
          status: range ? 206 : 200,
          headers,
        });
      } catch (e) {
        return new Response('R2 Алдаа: ' + e.message, { status: 500 });
      }
    }

    // ── СТАТИК ФАЙЛУУД (HTML, CSS, JS) ──
    return env.ASSETS.fetch(request);
  },
};
