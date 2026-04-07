"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Header from "./components/Header";
import Ticker from "./components/Ticker";
import StatsRow from "./components/StatsRow";
import MovieCard from "./components/MovieCard";
import WeatherWidget from "./components/WeatherWidget";

const MatrixRain = dynamic(() => import("./components/MatrixRain"), { ssr: false });

const movies = [
  { emoji: "🎭", badge: "HD", tag: "ДРАМА • 2025", title: "Тал Нутгийн Нулимс", duration: "2ч 15мин", rating: "8.4" },
  { emoji: "⚔️", badge: "4K", tag: "ТҮҮХ • 2024", title: "Чингисийн Сүүлчийн Тулаан", duration: "2ч 48мин", rating: "9.1" },
  { emoji: "🚀", badge: "NEW", tag: "ФАН • 2025", title: "Говийн Зомби Апокалипс", duration: "1ч 52мин", rating: "7.6" },
  { emoji: "🎵", tag: "ХӨГЖИМ • 2025", title: "Морин Хуурын Дуун", duration: "1ч 30мин", rating: "8.8" },
  { emoji: "👾", badge: "ANIME", tag: "АНИМЭ • 2025", title: "Нүүдэлчин Баатар", duration: "Цуврал: 24", rating: "9.3" },
  { emoji: "🌙", tag: "ХОШИН • 2024", title: "Гэр Бүл", duration: "1ч 45мин", rating: "8.0" },
];

const games = [
  { emoji: "⚡", badge: "HOT", tag: "ACTION • ONLINE", title: "Нүүдэлчин Дайчин Online", duration: "3,241 тоглогч", rating: "9.0" },
  { emoji: "🧩", tag: "PUZZLE • BROWSER", title: "Тооцооны Тоглоом", duration: "512 тоглогч", rating: "7.9" },
  { emoji: "🏹", badge: "NEW", tag: "RPG • 2025", title: "Эртний Монголын Нууц", duration: "Beta", rating: "8.5" },
];

const SectionHeader = ({ title }: { title: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
    <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.75rem", letterSpacing: "0.2em" }}>// {title}</span>
    <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
  </div>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState("кино");

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
                nabooshy@server:~$ loading content... шинэ кино нэмэгдлээ... систем хэвийн ажиллаж байна... хэрэглэгч нэвтэрсэн...
              </span>
            </div>
          </div>

          <StatsRow />

          {/* TAB CONTENT */}
          {activeTab === "кино" && (
            <div className="animate-fadeIn">
              {/* Featured */}
              <SectionHeader title="ОНЦЛОХ КОНТЕНТ" />
              <div style={{
                background: "var(--bg2)", border: "1px solid rgba(0,255,136,0.35)",
                borderRadius: 10, overflow: "hidden", display: "grid",
                gridTemplateColumns: "1fr 1fr", marginBottom: "2.5rem",
                boxShadow: "0 0 30px rgba(0,255,136,0.06)", cursor: "pointer",
              }}>
                <div style={{
                  background: "linear-gradient(135deg,#001a0d 0%,#003322 60%,#005533 100%)",
                  minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "5rem", position: "relative",
                }}>
                  🎬
                  <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(0,255,136,0.03) 20px,rgba(0,255,136,0.03) 21px)" }} />
                </div>
                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <span style={{ fontSize: "0.6rem", color: "var(--green)", letterSpacing: "0.3em", border: "1px solid var(--border)", display: "inline-block", padding: "2px 8px", borderRadius: 3, marginBottom: "0.75rem", width: "fit-content" }}>ШИНЭ • 2025</span>
                  <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.2rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "0.75rem", textShadow: "0 0 15px rgba(0,255,136,0.3)" }}>САНСРЫН ГЭР<br />ОРШИН СУУГЧ</h2>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1rem" }}>Монгол анхны sci-fi бүтээл. Сансрын дайны дундуур нэг ганц командлагч дэлхийгээ аврах гэж оролдоно...</p>
                  <button style={{ background: "var(--green)", color: "var(--bg)", border: "none", padding: "0.5rem 1.1rem", fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", fontWeight: 700, borderRadius: 4, cursor: "pointer", width: "fit-content" }}>▶ ҮЗЭХ</button>
                </div>
              </div>

              <SectionHeader title="ШИНЭ КИНОНУУД" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
                {movies.map((m, i) => <MovieCard key={i} {...m} />)}
              </div>
            </div>
          )}

          {activeTab === "тоглоом" && (
            <div className="animate-fadeIn">
              <SectionHeader title="ТОГЛООМУУД" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
                {games.map((g, i) => <MovieCard key={i} {...g} />)}
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
