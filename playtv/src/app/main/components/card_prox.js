'use client'
import styles from "./styles/styles.module.css" 
import { useFavorites } from '../context/FavoritesContext';
import { useRouter } from "next/navigation";

export default function Card({movie, hideAddButton = false, route}) {
    const { addToFavorites } = useFavorites();
    const router = useRouter();

    const handleNavigation = () => {
      if (route) {
            window.location.href = route;
        }
    };

    const handleAddToFavorites = (e) => {
      e.stopPropagation();
      addToFavorites(movie);
      alert(`${movie.title || movie.name} нь дуртай жагсаалтад нэмэгдлээ!`);
    };
    
    return (
    <div
      className={styles.movieCard}
      style={{backgroundImage: movie.poster_path
                        ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
                        : movie.image
                            ? `url(${movie.image})`
                            : 'none'}}
      onClick={handleNavigation}
    >
        <div className={styles.cardContentContainer}>
            <button 
              className={styles.btnAddCard}
              style={{opacity: hideAddButton ? 0 : 1}}
              onClick={handleAddToFavorites}
            >
              <i className="fas fa-plus"></i>
            </button>
            <div className={styles.cardContent}>
                <h4 className={styles.cardTitle}>{movie.title || movie.name}</h4>
                <span className={styles.cardDescription}>
                    <h6>{movie.release_date?.split("-")[0]||movie.year}</h6>
                    <h6>{movie.vote_average||movie.rating} ⭐</h6>
                </span>
            </div>
        </div>
    </div>
    )
}
