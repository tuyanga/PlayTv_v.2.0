'use client';

import { useFavorites } from '../context/FavoritesContext';
import Card from '../components/card';
import styles from './styles.module.css';

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className={styles.favoritesPageContainer}>
      <h1 className={styles.pageTitle}>Миний Жагсаалт</h1>

      {favorites.length === 0 ? (
        <p className={styles.emptyMessage}>Таны жагсаалт хоосон байна.</p>
      ) : (
        <div className={styles.favoritesGrid}>
          {favorites.map(movie => (
            <Card key={movie.id || movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}