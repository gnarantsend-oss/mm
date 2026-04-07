export default function Ticker() {
  const items = [
    "ШИНЭ КОНТЕНТ НЭМЭГДЛЭЭ",
    "◈ СИСТЕМ: ИДЭВХТЭЙ",
    "ЦАГ АГААР: 4°C ҮҮЛТЭЙ",
    "◈ ХЭРЭГЛЭГЧИД: 1,337 ОНЛАЙН",
    "ШИНЭ КИНО: 12 ТЭМДЭГЛЭГДСЭН",
    "◈ СЕРВЕР: 12MS",
  ];
  const doubled = [...items, ...items];

  return (
    <div style={{
      background: "rgba(0,255,136,0.06)",
      borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
      padding: "0.5rem 0", overflow: "hidden", position: "relative",
    }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 60, height: "100%", background: "linear-gradient(to right, var(--bg), transparent)", zIndex: 2 }} />
      <div style={{ position: "absolute", right: 0, top: 0, width: 60, height: "100%", background: "linear-gradient(to left, var(--bg), transparent)", zIndex: 2 }} />
      <div className="animate-ticker" style={{ display: "flex", gap: "3rem", width: "max-content", fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ whiteSpace: "nowrap" }}>
            <span style={{ color: "var(--green)" }}>▶ </span>{item}
          </span>
        ))}
      </div>
    </div>
  );
}
