export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster: string;
  banner: string;
  rating: number;
  bunnyEmbedUrl: string;
  genre: { id: number; name: string }[];
  tags: string[];
};

export const ROWS = [
  { label: "🔥 Трэнд",    filter: (m: Movie) => m.tags.includes("trending") },
  { label: "🆕 Шинэ",     filter: (m: Movie) => m.tags.includes("new") },
  { label: "⭐ Топ 10",   filter: (m: Movie) => m.tags.includes("top10") },
  { label: "💥 Алдартай", filter: (m: Movie) => m.tags.includes("popular") },
  { label: "👻 Аймшиг",   filter: (m: Movie) => m.tags.includes("horror") },
];
