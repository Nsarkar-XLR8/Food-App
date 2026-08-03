import { useState, useEffect } from "react";

const STORAGE_KEY = "culinaryhub_meal_planner";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEALS = ["breakfast", "lunch", "dinner"];

const DEFAULT_PLAN = DAYS.reduce((acc, day) => {
  acc[day] = { breakfast: null, lunch: null, dinner: null };
  return acc;
}, {});

export function useMealPlanner() {
  const [mealPlan, setMealPlan] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_PLAN;
    } catch {
      return DEFAULT_PLAN;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mealPlan));
    } catch (e) {
      console.error("Failed to save meal plan", e);
    }
  }, [mealPlan]);

  const addRecipeToSlot = (day, mealType, recipe) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: {
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          readyInMinutes: recipe.readyInMinutes,
          servings: recipe.servings,
        },
      },
    }));
  };

  const removeRecipeFromSlot = (day, mealType) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: null,
      },
    }));
  };

  const clearPlanner = () => {
    setMealPlan(DEFAULT_PLAN);
  };

  const countTotalPlanned = () => {
    let count = 0;
    Object.values(mealPlan).forEach((dayMeals) => {
      MEALS.forEach((meal) => {
        if (dayMeals[meal]) count++;
      });
    });
    return count;
  };

  return {
    mealPlan,
    DAYS,
    MEALS,
    addRecipeToSlot,
    removeRecipeFromSlot,
    clearPlanner,
    countTotalPlanned,
  };
}
