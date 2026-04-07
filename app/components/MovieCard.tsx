"use client";
import { useState } from "react";

interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string[];
  poster: string;
  embed: string;
}

export default function MovieCard({ movie }: { movie: Movie }) {
  const [playing, setPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <>
      <div
        onClick={() => setPlaying(true)}
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
          width: "100%", aspectRatio: "2/3", position: "relative",
          background: "linear-gradient(135deg, #030d07 0%, #003322 100%)",
          overflow: "hidden",
        }}>
          {!imgError ? (
            <img
              src={movie.poster}
              alt={movie.title}
              onError={() => setImgError(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>🎬</div>
          )}
          <div style={{
            position: "absolute", inset: 0, background: "rgba(0,0,0,0)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.4)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0)"}
          >
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "rgba(0,255,136,0.9)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.1rem", opacity: 0, transition: "opacity 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
            >▶</div>
          </div>
          <span style={{
            position: "absolute", top: 8, right: 8,
            background: "var(--green)", color: "var(--bg)",
            fontSize: "0.55rem", fontWeight: 700, padding: "2px 6px",
            borderRadius: 3, letterSpacing: "0.1em",
          }}>{movie.genre[0].toUpperCase()}</span>
        </div>
        <div style={{ padding: "0.75rem" }}>
          <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>{movie.year}</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.82rem", lineHeight: 1.4 }}>{movie.title}</div>
        </div>
      </div>

      {playing && (
        <div
          onClick={() => setPlaying(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.93)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 900 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.9rem", color: "var(--green)" }}>{movie.title}</span>
              <button onClick={() => setPlaying(false)} style={{
                background: "transparent", border: "1px solid var(--border)",
                color: "var(--text)", padding: "4px 12px", cursor: "pointer",
                fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", borderRadius: 4,
              }}>✕ ХААХ</button>
            </div>
            <video src={movie.embed} controls autoPlay style={{ width: "100%", borderRadius: 8, border: "1px solid var(--border)" }} />
          </div>
        </div>
      )}
    </>
  );
}
