'use client'
import styles from "./styles/styles.module.css" 
import { useFavorites } from '../context/FavoritesContext';
import { useRouter } from "next/navigation";

export default function Card({movie, hideAddButton=false, index}) {
    const { addToFavorites } = useFavorites();
    const router = useRouter();

    const handleNavigation = (id = index+1) => {
      router.push(`./view/${id}`);
    };

    const handleAddToFavorites = (e) => {
      e.stopPropagation();
      addToFavorites(movie);
      alert(`${movie.title} нь дуртай жагсаалтад нэмэгдлээ!`);
    };
    
    return (
    <div className = {styles.movieCard} style={{backgroundImage: `url(${movie.poster})`}} onClick={() => handleNavigation(movie.id)}>
        <div className = {styles.cardContentContainer}>
            <button 
            className={styles.btnAddCard}
            style={{opacity: hideAddButton ? 0 : 1}}
            onClick={handleAddToFavorites}>
            <i className="fas fa-plus"></i>
            </button>
                <div className={styles.cardContent}>
                    <h4 className={styles.cardTitle}>{movie.title}</h4>
                    <span className={styles.cardDescription}>
                            <h6>{movie.category}</h6>
                            <h6>{movie.duration + " мин"}</h6>
                    </span>
                </div>
        </div>
    </div>
    )
}
;