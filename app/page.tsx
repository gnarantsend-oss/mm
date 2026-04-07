"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Header from "./components/Header";
import Ticker from "./components/Ticker";
import StatsRow from "./components/StatsRow";
import MovieCard from "./components/MovieCard";
import WeatherWidget from "./components/WeatherWidget";
import moviesData from "./data/movies.json";

const MatrixRain = dynamic(() => import("./components/MatrixRain"), { ssr: false });

const GENRE_LABELS: Record<string, string> = {
  all: "БҮГД",
  action: "ЭКШН",
  comedy: "ИНЭЭДМИЙН",
  horror: "АЙМШГИЙН",
  drama: "ДРАМА",
  romance: "ХАЙРЫН",
  fantasy: "ФАНТАЗИ",
  thriller: "ТРИЛЛЕР",
  animation: "АНИМЭ",
  "sci-fi": "ШУ-ФАНТАСТИК",
  adventure: "АДАЛ ЯВДАЛ",
  crime: "ГЭМТ ХЭРЭГ",
};

const SectionHeader = ({ title }: { title: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
    <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.75rem", letterSpacing: "0.2em" }}>// {title}</span>
    <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
  </div>
);

const allGenres = ["all", ...Array.from(new Set(moviesData.flatMap(m => m.genre))).sort()];

export default function Home() {
  const [activeTab, setActiveTab] = useState("кино");
  const [activeGenre, setActiveGenre] = useState("all");

  const filteredMovies = activeGenre === "all"
    ? moviesData
    : moviesData.filter(m => m.genre.includes(activeGenre));

  return (
    <>
      <MatrixRain />
      <div style={{ position: "relative", zIndex: 10 }}>
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <Ticker />

        <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
          {/* HERO */}
          <div style={{ padding: "3.5rem 0 2rem", textAlign: "center" }}>
            <h1
              className="glitch"
              data-text="NABOOSHY"
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "clamp(2.2rem, 6vw, 4rem)",
                fontWeight: 900, letterSpacing: "0.15em", lineHeight: 1.1,
                textShadow: "0 0 40px rgba(0,255,136,0.5)", marginBottom: "0.5rem",
              }}
            >
              NABOOSHY
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", letterSpacing: "0.2em", marginBottom: "2rem" }}>
              МОНГОЛ КОНТЕНТ ХАБ <span className="animate-blink">|</span>
            </p>
          </div>

          {/* Terminal bar */}
          <div style={{
            background: "rgba(0,255,136,0.05)", border: "1px solid var(--border)",
            borderRadius: 6, padding: "0.6rem 1rem", marginBottom: "2.5rem",
            fontSize: "0.8rem", color: "var(--text-muted)",
            display: "flex", alignItems: "center", gap: "0.5rem", overflow: "hidden",
          }}>
            <span style={{ color: "var(--green)" }}>&gt;_</span>
            <div style={{ overflow: "hidden", flex: 1 }}>
              <span className="animate-scroll" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                nabooshy@server:~$ loading content... {moviesData.length} кино ачааллаа... систем хэвийн ажиллаж байна...
              </span>
            </div>
          </div>

          <StatsRow />

          {activeTab === "кино" && (
            <div className="animate-fadeIn">
              <SectionHeader title={`КИНОНУУД (${filteredMovies.length})`} />

              {/* Genre Filter */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                {allGenres.map(g => (
                  <button
                    key={g}
                    onClick={() => setActiveGenre(g)}
                    style={{
                      background: activeGenre === g ? "var(--green)" : "transparent",
                      color: activeGenre === g ? "var(--bg)" : "var(--text-muted)",
                      border: `1px solid ${activeGenre === g ? "var(--green)" : "var(--border)"}`,
                      padding: "4px 12px", borderRadius: 4, cursor: "pointer",
                      fontFamily: "'Space Mono', monospace", fontSize: "0.65rem",
                      letterSpacing: "0.1em", transition: "all 0.2s",
                    }}
                  >
                    {GENRE_LABELS[g] || g.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Movie Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
                {filteredMovies.map((m, i) => <MovieCard key={i} movie={m} />)}
              </div>
            </div>
          )}

          {activeTab === "цаг-агаар" && (
            <div className="animate-fadeIn" style={{ paddingTop: "1rem", paddingBottom: "3rem" }}>
              <SectionHeader title="ЦАГ АГААР" />
              <WeatherWidget />
            </div>
          )}

          {activeTab === "хайх" && (
            <div className="animate-fadeIn" style={{ paddingTop: "1rem", paddingBottom: "3rem", textAlign: "center" }}>
              <SectionHeader title="ХАЙХ" />
              <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", padding: "3rem" }}>
                <p style={{ letterSpacing: "0.2em", marginBottom: "1rem" }}>// ХАЙЛТЫН СИСТЕМ БЭЛТГЭГДЭЖ БАЙНА</p>
                <div className="animate-blink" style={{ fontSize: "2rem" }}>█</div>
              </div>
            </div>
          )}
        </main>

        <footer style={{ borderTop: "1px solid var(--border)", padding: "1.5rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.7rem", letterSpacing: "0.15em" }}>
          <p>© 2025 NABOOSHY — <a href="#" style={{ color: "var(--green)", textDecoration: "none" }}>НӨХЦӨЛ</a> · <a href="#" style={{ color: "var(--green)", textDecoration: "none" }}>ХОЛБОО БАРИХ</a></p>
          <p style={{ marginTop: "0.4rem", fontSize: "0.6rem", opacity: 0.5 }}>v2.4.1 // Next.js 15 // МОНГОЛ УЛСЫН УРАН БҮТЭЭЛИЙН ХАБ</p>
        </footer>
      </div>
    </>
  );
}
