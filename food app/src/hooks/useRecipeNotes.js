import { useState, useEffect } from "react";

const STORAGE_KEY = "culinaryhub_recipe_notes";

export function useRecipeNotes() {
  const [notes, setNotes] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error("Failed to save recipe notes to localStorage", e);
    }
  }, [notes]);

  const saveNote = (recipeId, noteText) => {
    setNotes((prev) => ({
      ...prev,
      [recipeId]: noteText,
    }));
  };

  const getNote = (recipeId) => {
    return notes[recipeId] || "";
  };

  const deleteNote = (recipeId) => {
    setNotes((prev) => {
      const updated = { ...prev };
      delete updated[recipeId];
      return updated;
    });
  };

  return { notes, saveNote, getNote, deleteNote };
}
