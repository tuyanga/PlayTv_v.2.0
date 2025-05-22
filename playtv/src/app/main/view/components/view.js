// src/app/main/view/components/view.js
'use client';

import { useState } from 'react';
import styles from './view.module.css';
import Star from './starRating';
// CHANGE THIS LINE:
import { useFavorites } from '../../context/FavoritesContext'; // <--- CORRECTED PATH HERE

// --- Configuration ---
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w1280';
const TMDB_POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w300';
const VIDSRC_EMBED_BASE_URL = 'https://vidsrc.xyz/embed/movie';

// The View component receives the movie object directly as props
export default function View(movie) {
    const [isPlaying, setIsPlaying] = useState(false);

    // Access the favorites context
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    // Determine the ID of the current movie for favorite checks and actions
    // Use the same ID property you've consistently used for favorites (movie.id or movie._id)
    const movieId = movie.id || movie._id;
    const isMovieFavorite = isFavorite(movieId);

    // --- Handle the "ЖАГСААЛТ" button click ---
    const handleToggleFavorite = () => {
        if (!movie || !movieId) {
            console.error("Attempted to toggle favorite for a null or invalid movie object.");
            alert("Error: Movie data not available.");
            return;
        }

        if (isMovieFavorite) {
            removeFavorite(movieId);
            alert(`${movie.title || movie.name || 'Энэ кино'} Миний Жагсаалтаас хасагдлаа!`); // "This movie was removed from My List!"
        } else {
            addFavorite(movie); // Pass the entire movie object to store
            alert(`${movie.title || movie.name || 'Энэ кино'} Миний Жагсаалтад нэмэгдлээ!`); // "This movie was added to My List!"
        }
    };

    // Determine stream source
    const getStreamSource = (movieData) => {
        if (!movieData) return null;

        if (movieData.isLocal) {
            return movieData.stream_url;
        } else {
            // Check for tmdb_id first, then imdb_id as fallback for VidSrc
            const idForEmbed = movieData.tmdb_id || movieData.imdb_id || movieData.id; // Also consider movie.id directly if it's the TMDB ID
            if (idForEmbed) {
                return `${VIDSRC_EMBED_BASE_URL}?tmdb=${idForEmbed}`;
            }
            return null;
        }
    };

    const streamSource = getStreamSource(movie);

    // Determine image URLs
    // Assuming movie.backdrop_path and movie.poster_path from TMDB, or movie.image for local
    const backgroundImageUrl = movie.isLocal
        ? movie.image
        : (movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}` : '/placeholder-background.jpg');

    const posterImageUrl = movie.isLocal
        ? movie.poster
        : (movie.poster_path ? `${TMDB_POSTER_BASE_URL}${movie.poster_path}` : '/placeholder-poster.jpg');

    // Default values for display
    const movieTitle = movie.title || movie.name || 'Untitled Movie'; // TMDB uses 'name' for TV series
    const displayYear = movie.release_date // For movies
        ? new Date(movie.release_date).getFullYear()
        : (movie.first_air_date // For TV series
            ? new Date(movie.first_air_date).getFullYear()
            : (movie.year || 'N/A')); // Fallback to 'year' if it exists or 'N/A'

    const displayCategory = movie.category || (movie.media_type === 'movie' ? 'Movie' : (movie.media_type === 'tv' ? 'TV Show' : 'Unknown'));
    const displayDescription = movie.overview || movie.description || 'No description available.';


    // --- Render Player OR Details ---
    return (
        <>
            {/* Background is always there */}
            <div className={styles.viewBackground}
                 style={{ backgroundImage: `url(${backgroundImageUrl})`}}
            ></div>

            {isPlaying && streamSource ? (
                // --- Player/Embed Section ---
                <div className={styles.playerContainer}>
                    {movie.isLocal ? (
                        <video controls autoPlay className={styles.videoPlayer}>
                            <source src={streamSource} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <iframe
                            src={streamSource}
                            allowFullScreen
                            allow="autoplay; fullscreen"
                            className={styles.iframePlayer}
                        ></iframe>
                    )}
                    {/* Optional: Add a button to go back to details */}
                    {/* <button onClick={() => setIsPlaying(false)} className={styles.backToDetailsButton}>
                        <i className="fas fa-arrow-left"></i> Буцах
                    </button> */}
                </div>

            ) : (
                // --- Movie Details Section ---
                <div className={styles.container}>
                    <div className={styles.viewCard} style={{ backgroundImage: `url(${posterImageUrl})`}}></div>
                    <div className={styles.viewContent}>
                        <div className={styles.viewTitle}>{movieTitle}</div>
                        <div className={styles.viewInfo}>
                            <h2 className={styles.viewDate}>{displayYear}</h2>
                            {/* Assuming movie.rating is available for Star component */}
                            <Star rating={movie.rating} classname={styles.viewRating}/>
                        </div>
                        <div className={styles.viewCategory}>{displayCategory}</div>
                        <div className={styles.viewDescription}>{displayDescription}</div>

                        <div className={styles.viewButtonContainer}>
                             {streamSource ? (
                                <button onClick={() => setIsPlaying(true)} className={styles.btnPlay}>
                                    <i className="fas fa-play"></i> ТОГЛУУЛАХ
                                </button>
                             ) : (
                                 <span className={styles.noStreamMessage}>Stream unavailable</span>
                             )}
                            <button
                                className={styles.viewbtnAdd}
                                onClick={handleToggleFavorite} // <--- ATTACHED THE CLICK HANDLER
                            >
                                {/* Conditional icon based on favorite status */}
                                {isMovieFavorite ? (
                                    <i className="fas fa-heart" style={{ color: 'red' }}></i> // Heart icon for favorite
                                ) : (
                                    <i className="fas fa-plus"></i> // Plus icon for not favorite
                                )}
                                ЖАГСААЛТ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}