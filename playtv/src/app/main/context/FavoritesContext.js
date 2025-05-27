'use client';
import { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

const addToFavorites = (movie) => {
const isAlreadyInFavorites = favorites.some(fav =>
    (fav._id && movie._id && fav._id === movie._id) ||
    (fav.id && movie.id && fav.id === movie.id)
  );

  if (!isAlreadyInFavorites) {
    setFavorites([...favorites, movie]);
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
