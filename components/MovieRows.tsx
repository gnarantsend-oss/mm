import { Movie, ROWS } from "@/lib/types";
import Card from "./Card";

type Props = { movies: Movie[]; genre: string; onSelect: (m: Movie) => void };

export default function MovieRows({ movies, genre, onSelect }: Props) {
  const filtered = genre === "Бүгд" ? movies : movies.filter(m => m.genre.some(g => g.name === genre));

  if (genre !== "Бүгд") {
    return (
      <div className="rows">
        <div>
          <p className="row-title">{genre}</p>
          <div className="row-scroll">
            {filtered.map(m => <Card key={m.id} movie={m} onClick={() => onSelect(m)} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rows">
      {ROWS.map(row => {
        const list = movies.filter(row.filter);
        if (!list.length) return null;
        return (
          <div key={row.label}>
            <p className="row-title">{row.label}</p>
            <div className="row-scroll">
              {list.map(m => <Card key={m.id} movie={m} onClick={() => onSelect(m)} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
