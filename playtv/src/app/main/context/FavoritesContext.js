'use client'
import { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (movie) => {
    // Шинэ кино нэмэхэд давхардсан эсэхийг шалгах
    if (!favorites.some(fav => 
      fav.title === movie.title && 
      fav.poster === movie.poster
    )) {
      setFavorites(prev => [...prev, movie]);
    }
  };

  const removeFromFavorites = (movieToRemove) => {
    setFavorites(prev => prev.filter(movie => 
      !(movie.title === movieToRemove.title && 
        movie.poster === movieToRemove.poster)
    ));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}