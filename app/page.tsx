"use client";
import { useEffect, useState } from "react";
import moviesData from "@/lib/movies.json";
import { Movie } from "@/lib/types";
import Navbar        from "@/components/Navbar";
import Hero          from "@/components/Hero";
import GenreFilter   from "@/components/GenreFilter";
import MovieRows     from "@/components/MovieRows";
import PlayerModal   from "@/components/PlayerModal";
import SearchOverlay from "@/components/SearchOverlay";

const movies = moviesData as Movie[];
const genres = ["Бүгд", ...Array.from(new Set(movies.flatMap(m => m.genre.map(g => g.name))))];

export default function Home() {
  const [scrolled,    setScrolled]    = useState(false);
  const [selected,    setSelected]    = useState<Movie | null>(null);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQ,     setSearchQ]     = useState("");
  const [genre,       setGenre]       = useState("Бүгд");

  const searchResults = searchQ.trim().length > 1
    ? movies.filter(m => m.title.toLowerCase().includes(searchQ.toLowerCase())).slice(0, 20)
    : [];

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (selected || searchOpen) ? "hidden" : "";
  }, [selected, searchOpen]);

  const closeSearch = () => { setSearchOpen(false); setSearchQ(""); };

  return (
    <>
      <Navbar scrolled={scrolled} onSearchOpen={() => setSearchOpen(true)} />
      <Hero   movie={movies[0]}   onPlay={() => setSelected(movies[0])} />
      <GenreFilter genres={genres} active={genre} onChange={setGenre} />
      <MovieRows   movies={movies} genre={genre}  onSelect={setSelected} />

      {selected && <PlayerModal movie={selected} onClose={() => setSelected(null)} />}
      {searchOpen && (
        <SearchOverlay
          query={searchQ}
          results={searchResults}
          onChange={setSearchQ}
          onSelect={m => { setSelected(m); closeSearch(); }}
          onClose={closeSearch}
        />
      )}
    </>
  );
}
