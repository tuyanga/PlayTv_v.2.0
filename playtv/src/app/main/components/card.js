'use client';
import Link from 'next/link';
import styles from './styles/card.module.css';
import { useFavorites } from '../context/FavoritesContext';

export default function Card({ movie }) {
    const movieTitle = movie.title || movie.name || 'Untitled';

    const imageUrl = movie.posterPath || movie.poster || '/placeholder-poster.jpg';
    const movieId = movie.id || movie._id;

    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const isMovieFavorite = isFavorite(movieId);

    const stringMovieId = String(movieId);

    const displayYear = movie.releaseDate
        ? new Date(movie.releaseDate).getFullYear()
        : (movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : 'N/A');
    const displayCategory = movie.mediaType === 'movie' ? 'Movie' : (movie.mediaType === 'tv' ? 'TV Show' : 'Unknown');

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isMovieFavorite) {
            removeFavorite(movieId);
        } else {
            addFavorite(movie);
        }
    };

    return (
        <Link
            href={`/main/view/${stringMovieId}`}
            className={styles.movieCard}
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div className={styles.cardContentContainer}>
                <button
                    className={styles.btnAddCard}
                    onClick={handleFavoriteClick}
                >
                    {isMovieFavorite ? '❤️' : '+'}
                </button>

                <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{movieTitle}</h3>
                    <div className={styles.cardDescription}>
                        <h6>{displayCategory}</h6>
                        <h6>{displayYear}</h6>
                    </div>
                </div>
            </div>
        </Link>
    );
}