import { useState, useEffect } from "react";

const STORAGE_KEY = "culinaryhub_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites to localStorage", e);
    }
  }, [favorites]);

  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => String(item.id) === String(recipe.id));
      if (exists) {
        return prev.filter((item) => String(item.id) !== String(recipe.id));
      } else {
        return [...prev, recipe];
      }
    });
  };

  const isFavorite = (id) => {
    return favorites.some((item) => String(item.id) === String(id));
  };

  return { favorites, toggleFavorite, isFavorite };
}
