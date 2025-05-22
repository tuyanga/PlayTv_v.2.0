'use client';

import React from 'react';
import styles from './styles/MovieList.module.css';
import Card from '../../components/card';

export default function MovieList({ movies, isLoading, error, currentPage, handleNextPage, handlePrevPage }) {
    return (
        <section className={styles['movie-list-section']}>
            <h2>Movies</h2>
            <div className={styles['movie-list-container']}>
                {isLoading && <p>Loading movies...</p>}
                {!isLoading && !error && movies.length === 0 && <p>No movies found for page {currentPage}.</p>}

                {!isLoading && !error && movies.map((movie) => (
                    <Card
                        key={movie?.id || movie?.imdb_id || movie?.tmdb_id || `movie-${movie?.title}-${Math.random()}`}
                        movie={movie}
                    />
                ))}
            </div>

            <div className={styles.pagination}>
                 <button
                    className={`${styles['pagination-button']} ${styles['prev-page'] || ''}`}
                    disabled={currentPage <= 1 || isLoading}
                    onClick={handlePrevPage}
                >
                    &lt;
                </button>

                <span className={styles['page-range']}>Page {currentPage}</span>

                <button
                    className={`${styles['pagination-button']} ${styles['next-page'] || ''}`}
                    onClick={handleNextPage}
                    disabled={isLoading}
                >
                    &gt;
                </button>
            </div>
        </section>
    );
}