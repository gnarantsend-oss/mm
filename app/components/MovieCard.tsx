interface MovieCardProps {
  emoji: string;
  badge?: string;
  tag: string;
  title: string;
  duration: string;
  rating: string;
}

export default function MovieCard({ emoji, badge, tag, title, duration, rating }: MovieCardProps) {
  return (
    <div
      style={{
        background: "var(--bg2)", border: "1px solid var(--border)",
        borderRadius: 8, overflow: "hidden", cursor: "pointer",
        transition: "all 0.25s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,136,0.5)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,255,136,0.1)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div style={{
        width: "100%", aspectRatio: "16/9", position: "relative",
        background: "linear-gradient(135deg, #030d07 0%, #003322 100%)",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem",
      }}>
        {emoji}
        {badge && (
          <span style={{
            position: "absolute", top: 8, right: 8,
            background: "var(--green)", color: "var(--bg)",
            fontSize: "0.6rem", fontWeight: 700, padding: "2px 6px",
            borderRadius: 3, letterSpacing: "0.1em",
          }}>{badge}</span>
        )}
      </div>
      <div style={{ padding: "0.85rem" }}>
        <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.15em", marginBottom: "0.3rem" }}>{tag}</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.88rem", marginBottom: "0.5rem", lineHeight: 1.4 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "var(--text-muted)" }}>
          <span>{duration}</span><span>★ {rating}</span>
        </div>
      </div>
    </div>
  );
}
