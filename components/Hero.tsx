import { Movie } from "@/lib/types";

type Props = { movie: Movie; onPlay: () => void };

export default function Hero({ movie, onPlay }: Props) {
  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${movie.banner || movie.poster})` }} />
      <div className="hero-content">
        <h1 className="hero-title">{movie.title}</h1>
        {movie.overview && <p className="hero-overview">{movie.overview}</p>}
        <button className="btn-play" onClick={onPlay}>
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
          Үзэх
        </button>
      </div>
    </section>
  );
}
