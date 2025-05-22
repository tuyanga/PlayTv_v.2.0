'use client';

import React, { useState, useEffect, useRef } from 'react';
import Card from './card';
import styles from './styles/slider.module.css';

export default function Slider_Prox({ title, genreId }) {
    const [movies, setMovies] = useState([]);
    const movieListRef = useRef(null);

    useEffect(() => {
        const fetchMoviesForGenre = async () => {
            const apiUrl = `/api/search?genreId=${genreId}&type=movie&sortBy=popularity.desc&page=1`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            setMovies(data.results.slice(0, 20));
        };

        if (genreId) {
            fetchMoviesForGenre();
        }
    }, [genreId, title]);

    const scroll = (direction) => {
        if (movieListRef.current) {
            const scrollAmount = movieListRef.current.offsetWidth * 0.7;
            if (direction === 'left') {
                movieListRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                movieListRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className={styles.slideContainer}>
            <h2 className={styles.slideTitle}>{title}</h2>
            <div className={styles.sliderRowWrapper}>
                <div ref={movieListRef} className={styles.movieListContainer}>
                    {movies.map(movie => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </div>
                <button className={`${styles.sliderArrow} ${styles.prevArrow}`} onClick={() => scroll('left')}>‹</button>
                <button className={`${styles.sliderArrow} ${styles.nextArrow}`} onClick={() => scroll('right')}>›</button>
            </div>
        </div>
    );
}