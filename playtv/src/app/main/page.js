'use client'
import Header from "./components/header.js";
import Slider_Prox from "./components/slider_prox.js"
import Carousel_Prox from "./components/carousel_prox.js";
import { useState, useEffect } from "react";

export default function Home() {

  const [genres, setGenres] = useState([]);
  const [isLoadingGenres, setIsLoadingGenres] = useState(true);

  useEffect(() => {
    fetch('/api/genres')
      .then(res => res.json())
      .then(data => {
        setGenres(data.genres || []);
        setIsLoadingGenres(false);
      });
  }, []);

  return (
    <div style={{ paddingTop: '80px', backgroundColor: '#1a1a1a', minHeight: '100vh', color: '#FDFDFF' }}>
      <Header />
      <Carousel_Prox/>
      <section>
        {isLoadingGenres ? (
            <p style={{ textAlign: 'center', paddingTop: '100px', color: '#FDFDFF' }}>Loading categories....</p>
        ) : (
            genres.filter(g =>
                ['Action', 'Comedy', 'Animation', 'Horror'].includes(g.name)
            ).map(genre => (
                <Slider_Prox key={genre.id} title={genre.name} genreId={genre.id} />
            ))
        )}
        {!isLoadingGenres && genres.filter(g => ['Action', 'Comedy', 'Animation', 'Horror'].includes(g.name)).length === 0 && (
            <p style={{ textAlign: 'center', padding: '50px', color: '#B3B3B3' }}>No selected movie categories to display.</p>
        )}
      </section>
    </div>
  );
}