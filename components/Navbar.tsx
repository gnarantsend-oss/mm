type Props = { scrolled: boolean; onSearchOpen: () => void };

export default function Navbar({ scrolled, onSearchOpen }: Props) {
  return (
    <nav className={`navbar ${scrolled ? "scrolled" : "top"}`}>
      <span className="logo">NABO</span>
      <button className="search-btn" onClick={onSearchOpen} aria-label="Хайх">
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      </button>
    </nav>
  );
}
