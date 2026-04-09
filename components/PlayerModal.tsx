import { Movie } from "@/lib/types";

type Props = { movie: Movie; onClose: () => void };

export default function PlayerModal({ movie, onClose }: Props) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-video">
          <video
            src={movie.bunnyEmbedUrl}
            controls autoPlay playsInline
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="modal-body">
          <h2 className="modal-title">{movie.title}</h2>
          <div className="modal-meta">
            <span className="modal-rating">★ {movie.rating}</span>
            <span className="modal-genre">{movie.genre.map(g => g.name).join(", ")}</span>
          </div>
          {movie.overview && <p className="modal-overview">{movie.overview}</p>}
        </div>
      </div>
    </div>
  );
}
