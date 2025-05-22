'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('playtv_favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('playtv_favorites', JSON.stringify(favorites));
    }
  }, [favorites, isInitialized]);

  const addFavorite = (movie) => {
    setFavorites(prevFavorites => {
      if (!prevFavorites.some(fav => String(fav.id || fav._id) === String(movie.id || movie._id))) {
        return [...prevFavorites, movie];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (movieId) => {
    setFavorites(prevFavorites =>
      prevFavorites.filter(fav => String(fav.id || fav._id) !== String(movieId))
    );
  };

  const isFavorite = (movieId) => {
    return favorites.some(fav => String(fav.id || fav._id) === String(movieId));
  };

  const contextValue = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === null) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}