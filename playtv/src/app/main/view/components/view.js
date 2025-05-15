'use client';
import styles from './view.module.css';
import Star from './starRating';
import { useFavorites } from '../../context/FavoritesContext';

export default function View(movie) {

    const watchURL = `https://vidsrc.xyz/embed/movie/${movie.id}`;

    const { addToFavorites } = useFavorites();

    const handleAddToFavorites = (e) => {
        e.stopPropagation();
        addToFavorites(movie);
        alert(`${movie.title || movie.name} нь дуртай жагсаалтад нэмэгдлээ!`);
    };

    return(
        <div className={styles.container}>
            <div className={styles.viewBackground} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`}}></div>
            <div className={styles.viewCard} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`}}></div>
            <div className={styles.viewContent}>
                <div className={styles.viewTitle}>{movie.title}</div>
                <div className={styles.viewInfo}>
                    <h2 className={styles.viewDate}>{movie.release_date}</h2>
                    <Star rating={movie.vote_average} classname={styles.viewRating}/>
                </div>
                <div className={styles.viewCategoryContainer}>
                    {movie.genres && movie.genres.map((genre) => (
                        <span key={genre.id} className={styles.viewCategory}>
                            {genre.name}
                    </span>
                    ))}
                </div>
                <div className={styles.viewDescription}>{movie.overview}</div>
                <div className={styles.viewButtonContainer}>
                    <button className={styles.btnPlay} onClick={() => window.open(watchURL)}><i className="fas fa-play"></i> ТОГЛУУЛАХ</button>
                    <button className={styles.viewbtnAdd} onClick={handleAddToFavorites}><i className="fas fa-plus"></i>ЖАГСААЛТ</button>    
                </div>
            </div>
        </div>
    );
}