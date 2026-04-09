type Props = { genres: string[]; active: string; onChange: (g: string) => void };

export default function GenreFilter({ genres, active, onChange }: Props) {
  return (
    <div className="genre-filter">
      {genres.map(g => (
        <button
          key={g}
          className={`genre-btn${active === g ? " active" : ""}`}
          onClick={() => onChange(g)}
        >
          {g}
        </button>
      ))}
    </div>
  );
}
