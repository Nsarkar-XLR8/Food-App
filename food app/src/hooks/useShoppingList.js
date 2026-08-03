import { useState, useEffect } from "react";

const STORAGE_KEY = "culinaryhub_shopping_list";


export function useShoppingList() {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save shopping list", e);
    }
  }, [items]);

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addIngredientsFromRecipe = (recipeTitle, ingredientsList) => {
    const newItems = ingredientsList.map((ing, idx) => ({
      id: `${recipeTitle}-${ing.id || ing.name}-${idx}-${Date.now()}`,
      recipeTitle,
      name: ing.name,
      amount: ing.amount,
      unit: ing.unit,
      completed: false,
    }));

    setItems((prev) => [...prev, ...newItems]);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCompleted = () => {
    setItems((prev) => prev.filter((item) => !item.completed));
  };

  const clearAll = () => {
    setItems([]);
  };

  return {
    items,
    toggleItem,
    addIngredientsFromRecipe,
    removeItem,
    clearCompleted,
    clearAll,
  };
}
