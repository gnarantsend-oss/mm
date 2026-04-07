"use client";
import { useState } from "react";
import { Film, Gamepad2, CloudSun, Search } from "lucide-react";

const navItems = [
  { icon: Film, label: "[КИНО]", id: "кино" },
  { icon: Gamepad2, label: "[ТОГЛООМ]", id: "тоглоом" },
  { icon: CloudSun, label: "[ЦАГ АГААР]", id: "цаг-агаар" },
  { icon: Search, label: "[ХАЙХ]", id: "хайх" },
];

export default function Header({ activeTab, onTabChange }: { activeTab: string; onTabChange: (t: string) => void }) {
  const [query, setQuery] = useState("");

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(3,13,7,0.93)", backdropFilter: "blur(10px)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "1.5rem",
        padding: "0.85rem 1.5rem", maxWidth: 1100, margin: "0 auto",
        flexWrap: "wrap",
      }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
          <div className="animate-pulse-logo" style={{
            width: 36, height: 36, background: "var(--green)", borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: 16, color: "var(--bg)",
          }}>N</div>
          <span style={{
            fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: "1.1rem",
            color: "var(--green)", letterSpacing: "0.12em",
            textShadow: "0 0 12px rgba(0,255,136,0.5)",
          }}>NABOOSHY</span>
        </a>

        {/* Nav */}
        <nav style={{ display: "flex", gap: "0.2rem", flex: 1, flexWrap: "wrap" }}>
          {navItems.map(({ icon: Icon, label, id }) => (
            <button key={id} onClick={() => onTabChange(id)} style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              padding: "0.4rem 0.7rem", border: "1px solid",
              borderColor: activeTab === id ? "var(--border)" : "transparent",
              borderRadius: 4, background: activeTab === id ? "var(--green-glow)" : "transparent",
              color: activeTab === id ? "var(--green)" : "var(--text-muted)",
              fontFamily: "'Space Mono', monospace", fontSize: "0.7rem",
              letterSpacing: "0.08em", cursor: "pointer",
              textShadow: activeTab === id ? "0 0 8px var(--green)" : "none",
              transition: "all 0.2s",
            }}>
              <Icon size={12} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          background: "rgba(0,255,136,0.06)", border: "1px solid var(--border)",
          borderRadius: 4, padding: "0.35rem 0.75rem",
        }}>
          <Search size={12} style={{ opacity: 0.5 }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="хайх..."
            style={{
              background: "none", border: "none", outline: "none",
              color: "var(--green)", fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.8rem", width: 130, caretColor: "var(--green)",
            }}
          />
        </div>
      </div>
    </header>
  );
}
