'use client'
import Slider from "./components/slider.js"
import Slider_Prox from "./components/slider_prox.js"
import Carousel from "./components/carousel.js";
import Carousel_Prox from "./components/carousel_prox.js";
import { useState, useEffect } from "react";

export default function Home() {

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch('api/genres')
      .then(res => res.json())
      .then(setGenres)
      .catch(err => console.error('Falied to fetch genres'));
  }, []);

  if (!genres.length) return <p>Loading ....</p>

  const selectedGenres = genres.filter(g => ['Action', 'Comedy', 'Drama', 'Horror'].includes(g.name));

  return (
    <div>
      <Carousel_Prox/>
      <section>
      {selectedGenres.map(genre => (
          <Slider_Prox key={genre.id} title={genre.name} genreId={genre.id} />
      ))}
      </section>
    </div>
  );
}
