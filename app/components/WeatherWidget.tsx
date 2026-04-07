"use client";
import { useState, useEffect } from "react";
import { Cloud, Wind, Droplets, Thermometer, MapPin, RefreshCw } from "lucide-react";

const API_KEY = "28b8969deb0ae248fe2db2e6064dd511";

interface WeatherData {
  city: string;
  temp: number;
  feels: number;
  desc: string;
  humidity: number;
  wind: number;
  icon: string;
  country: string;
}

export default function WeatherWidget() {
  const [city, setCity] = useState("Ulaanbaatar");
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (target: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(target)}&appid=${API_KEY}&units=metric&lang=en`
      );
      if (!res.ok) throw new Error("Хот олдсонгүй");
      const data = await res.json();
      setWeather({
        city: data.name,
        temp: Math.round(data.main.temp),
        feels: Math.round(data.main.feels_like),
        desc: data.weather[0].description,
        humidity: data.main.humidity,
        wind: Math.round(data.wind.speed),
        icon: data.weather[0].icon,
        country: data.sys.country,
      });
      setCity(target);
    } catch {
      setError("Хот олдсонгүй. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWeather("Ulaanbaatar"); }, []);

  const popularCities = ["Ulaanbaatar", "Darkhan", "Erdenet", "Choibalsan", "Tokyo", "Seoul", "Beijing"];

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }} className="animate-fadeIn">
      {/* Search */}
      <div style={{ marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
        <div style={{
          flex: 1, display: "flex", alignItems: "center", gap: "0.5rem",
          background: "rgba(0,255,136,0.06)", border: "1px solid var(--border)",
          borderRadius: 6, padding: "0.5rem 0.75rem",
        }}>
          <MapPin size={14} style={{ opacity: 0.6 }} />
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && input && fetchWeather(input)}
            placeholder="Хот хайх... (жш: Darkhan)"
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              color: "var(--green)", fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.85rem", caretColor: "var(--green)",
            }}
          />
        </div>
        <button onClick={() => input && fetchWeather(input)} style={{
          background: "var(--green)", color: "var(--bg)", border: "none",
          borderRadius: 6, padding: "0.5rem 1rem", cursor: "pointer",
          fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", fontWeight: 700,
        }}>ХАЙХ</button>
      </div>

      {/* Quick cities */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {popularCities.map(c => (
          <button key={c} onClick={() => fetchWeather(c)} style={{
            padding: "0.3rem 0.7rem", border: "1px solid var(--border)",
            borderRadius: 4, background: city === c ? "var(--green-glow)" : "transparent",
            color: city === c ? "var(--green)" : "var(--text-muted)",
            fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem",
            cursor: "pointer", transition: "all 0.2s",
          }}>{c}</button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
          <RefreshCw size={24} className="animate-spin" style={{ margin: "0 auto 0.75rem", display: "block" }} />
          <p style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}>ТАТАЖ БАЙНА...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{
          background: "rgba(255,0,0,0.08)", border: "1px solid rgba(255,0,0,0.3)",
          borderRadius: 8, padding: "1rem", color: "#ff4444", fontSize: "0.8rem",
          textAlign: "center",
        }}>{error}</div>
      )}

      {/* Weather Card */}
      {weather && !loading && (
        <div style={{
          background: "var(--bg2)", border: "1px solid rgba(0,255,136,0.3)",
          borderRadius: 10, overflow: "hidden",
          boxShadow: "0 0 40px rgba(0,255,136,0.06)",
        }}>
          {/* Top */}
          <div style={{
            background: "linear-gradient(135deg, #001a0d 0%, #003322 100%)",
            padding: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: "1rem",
          }}>
            <div>
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.3em", marginBottom: "0.4rem" }}>
                ЦАГ АГААР // {weather.country}
              </div>
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.8rem", fontWeight: 700, textShadow: "0 0 20px rgba(0,255,136,0.4)" }}>
                {weather.city}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.3rem", textTransform: "uppercase" }}>
                {weather.desc}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "4rem", fontWeight: 900, lineHeight: 1, textShadow: "0 0 30px rgba(0,255,136,0.5)" }}>
                {weather.temp}°
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
                Мэдрэгдэх: {weather.feels}°C
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
            {[
              { icon: Droplets, label: "ЧИЙГШИЛ", value: `${weather.humidity}%` },
              { icon: Wind, label: "САЛХИ", value: `${weather.wind} м/с` },
              { icon: Thermometer, label: "МЭДРЭГДЭХ", value: `${weather.feels}°C` },
            ].map(({ icon: Icon, label, value }, i) => (
              <div key={i} style={{
                padding: "1.2rem",
                borderTop: "1px solid var(--border)",
                borderRight: i < 2 ? "1px solid var(--border)" : "none",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
              }}>
                <Icon size={20} style={{ opacity: 0.7 }} />
                <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.15em" }}>{label}</div>
                <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.1rem", fontWeight: 700 }}>{value}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: "0.75rem 1.5rem", borderTop: "1px solid var(--border)", fontSize: "0.65rem", color: "var(--text-muted)", display: "flex", justifyContent: "space-between" }}>
            <span>SOURCE: OPENWEATHER API</span>
            <span>ШИНЭЧЛЭГДСЭН: {new Date().toLocaleTimeString("mn-MN")}</span>
          </div>
        </div>
      )}
    </div>
  );
}
