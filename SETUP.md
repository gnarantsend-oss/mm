# 🎬 Streaming Site — Тохиргооны заавар

## Яаж ажиллуулах вэ?

```bash
npm install
npm run dev
# → http://localhost:3000 дээр нээгдэнэ
```

---

## 🎥 Кино нэмэх — data/movies.json

Кино бүрийг ийм бүтцээр нэм:

```json
{
  "id": 11,
  "title": "Кинонийхоо нэр",
  "overview": "Кинонийхоо тайлбар...",
  "poster":  "https://ЧИНИЙ-PULLZONE.b-cdn.net/posters/kino11.jpg",
  "banner":  "https://ЧИНИЙ-PULLZONE.b-cdn.net/banners/kino11.jpg",
  "rating": 8.2,
  "bunnyEmbedUrl": "https://iframe.mediadelivery.net/embed/LIBRARY_ID/VIDEO_ID?autoplay=false&responsive=true",
  "genre": [
    { "id": 28, "name": "Монгол кино" },
    { "id": 18, "name": "Драм" }
  ],
  "tags": ["popular", "trending", "mongolian", "new", "top10", "horror"]
}
```

### Tag-ийн утга:
| Tag | Харагдах хэсэг |
|-----|----------------|
| `popular` | Одоо үзэж байгаа |
| `trending` | Trending — banner-д харагдана |
| `new` | Шинэ нэмэгдсэн |
| `top10` | Шилдэг 10 |
| `horror` | Аймшгийн кинонууд |
| `mongolian` | Монгол кинонууд |

---

## 🐰 Bunny.net Embed URL хаанаас авах вэ?

1. bunny.net → Stream → Libraries → Кинооны нэр дарна
2. "Embed" товч → iframe src хуулна
3. `data/movies.json`-д `bunnyEmbedUrl` талбарт тав

---

## 🖼️ Постер/Banner зураг

Bunny.net Storage-д хуулаад pull zone URL ашиглах:
```
https://ЧИНИЙ-PULLZONE.b-cdn.net/posters/kinonimi.jpg
```

Эсвэл дурын зураг хостинг ашиглаж болно.

---

## 🚀 Cloudflare Pages-д deploy хийх

```bash
# GitHub-д push хий
git add .
git commit -m "my streaming site"
git push

# Cloudflare Pages → New Project → GitHub repo сонго
# Build command: npm run build
# Output dir: .next
```

---

## 📁 Файлын бүтэц

```
data/
  movies.json          ← КИНОНУУДЫНХАА МЭДЭЭЛЭЛ ЭНД
pages/
  api/
    popular.ts         ← /api/popular → popular tag
    trending.ts        ← /api/trending → trending tag
    discover.ts        ← /api/discover?genre=Драм гэх мэт
components/
  Modal/index.tsx      ← Bunny iframe player энд
```
