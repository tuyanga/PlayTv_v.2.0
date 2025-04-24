'use client'
import { useFavorites } from '../context/FavoritesContext';
import styles from './styles.module.css';
import Card from '../components/card';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className={styles.favoritesContainer}>
      <h1>Миний дуртай кинонууд</h1>
      
      {favorites.length === 0 ? (
        <p>Дуртай кино нэмээгүй байна</p>
      ) : (
        <div className={styles.favoritesGrid}>
          {favorites.map((movie, index) => (
            <div key={index} className={styles.favoriteItem}>
              <Card
                title={movie.title}
                category={movie.category}
                duration={movie.duration}
                poster={movie.poster}
              />
              <button 
                onClick={() => removeFromFavorites(movie)}
                className={styles.removeButton}
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