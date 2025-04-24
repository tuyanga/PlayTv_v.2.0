'use client'
import styles from "./styles/styles.module.css" 
import { useFavorites } from '../context/FavoritesContext';

export default function Card({title, category, duration, poster}) {
    const { addToFavorites } = useFavorites();

    const handleAddToFavorites = (e) => {
      e.stopPropagation();
      addToFavorites({
        title,
        category,
        duration,
        poster
      });
      alert(`${title} нь дуртай жагсаалтад нэмэгдлээ!`);
    };
    return (
    <div className = {styles.movieCard} style={{backgroundImage: `url(${poster})`}}>
        <div className = {styles.cardContentContainer}>
            <button className={styles.btnAddCard} onClick={handleAddToFavorites}><i className="fas fa-plus"></i></button>
                <div className={styles.cardContent}>
                    <h4 className={styles.cardTitle}>{title}</h4>
                    <span className={styles.cardDescription}>
                            <h6>{category}</h6>
                            <h6>{duration + " мин"}</h6>
                    </span>
                </div>
        </div>
    </div>
    )
}
;