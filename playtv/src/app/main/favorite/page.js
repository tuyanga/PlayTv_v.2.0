'use client'
import { useFavorites } from '../context/FavoritesContext';
import styles from './styles.module.css';
import Card from '../components/card_prox';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className={styles.favoritesContainer}>
      <h1>Миний дуртай кинонууд</h1>
      
      {favorites.length === 0 ? (
        <p>Дуртай кино нэмээгүй байна</p>
      ) : (
        <div className={styles.favoritesGrid}>
          {favorites.map((movie) => (
            <div key={movie.id} className={styles.favoriteItem}>
              <Card movie={movie} hideAddButton={true}/>
              <button 
                onClick={() => removeFromFavorites(movie)}
                className={styles.removeButton}
                aria-label={`Remove ${movie.title} from favorites`}
              >
                <i className="fas fa-times"></i> Устгах
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}