import { Movie } from "@/lib/types";

type Props = {
  query: string;
  results: Movie[];
  onChange: (q: string) => void;
  onSelect: (m: Movie) => void;
  onClose: () => void;
};

export default function SearchOverlay({ query, results, onChange, onSelect, onClose }: Props) {
  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-box" onClick={e => e.stopPropagation()}>
        <div className="search-input-wrap">
          <svg width="18" height="18" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            autoFocus
            className="search-input"
            placeholder="Кино хайх..."
            value={query}
            onChange={e => onChange(e.target.value)}
          />
          <button className="search-close" onClick={onClose}>✕</button>
        </div>
        <div className="search-results">
          {query.trim().length <= 1 && <p className="search-empty">Хайх нэрээ бичнэ үү...</p>}
          {query.trim().length > 1 && results.length === 0 && (
            <p className="search-empty">"{query}" олдсонгүй</p>
          )}
          {results.map(m => (
            <div key={m.id} className="search-card" onClick={() => onSelect(m)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.poster || m.banner} alt={m.title} />
              <p className="search-card-title">{m.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
