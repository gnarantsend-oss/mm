import { Movie } from "@/lib/types";

type Props = { movie: Movie; onClick: () => void };

export default function Card({ movie, onClick }: Props) {
  return (
    <div className="card" onClick={onClick}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={movie.poster || movie.banner}
        alt={movie.title}
        loading="lazy"
        onDragStart={e => e.preventDefault()}
      />
      <div className="card-info">
        <p className="card-title">{movie.title}</p>
        <p className="card-rating">★ {movie.rating}</p>
      </div>
    </div>
  );
}
