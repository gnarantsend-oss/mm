"use client";
import { useEffect, useState } from "react";

const stats = [
  { label: "КИНО САНТАЙ", target: 4821 },
  { label: "ОНЛАЙН", target: 1337 },
  { label: "ТОГЛООМ", target: 256 },
  { label: "АПТАЙМ %", target: 999, display: "99.9%" },
];

function Counter({ target, display }: { target: number; display?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setVal(Math.floor(Math.random() * target));
      if (i++ > 10) { setVal(target); clearInterval(iv); }
    }, 60);
    return () => clearInterval(iv);
  }, [target]);
  return <>{display ?? val.toLocaleString()}</>;
}

export default function StatsRow() {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
      {stats.map(({ label, target, display }) => (
        <div key={label} style={{
          flex: 1, minWidth: 150,
          background: "rgba(0,255,136,0.04)", border: "1px solid var(--border)",
          borderRadius: 6, padding: "0.8rem 1rem", position: "relative", overflow: "hidden",
          transition: "all 0.2s", cursor: "default",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,255,136,0.08)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,255,136,0.04)"; }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: "var(--green)", boxShadow: "0 0 10px var(--green)" }} />
          <div style={{ fontSize: "0.62rem", color: "var(--text-muted)", letterSpacing: "0.15em", marginBottom: "0.25rem" }}>{label}</div>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.3rem", fontWeight: 700, textShadow: "0 0 10px rgba(0,255,136,0.4)" }}>
            <Counter target={target} display={display} />
          </div>
        </div>
      ))}
    </div>
  );
}
