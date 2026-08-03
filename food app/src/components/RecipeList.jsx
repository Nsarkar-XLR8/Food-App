import React from "react";
import RecipeCard from "./RecipeCard";
import SkeletonLoader from "./SkeletonLoader";
import { Utensils, Heart, RotateCcw } from "lucide-react";
import styles from "./RecipeList.module.css";

export default function RecipeList({
  foodData,
  isLoading,
  onSelectRecipe,
  favorites,
  onToggleFavorite,
  onAddIngredientsToShopping,
  mealPlanner,
  onShowToast,
  onResetFilters,
  isFavoriteView = false,
}) {
  if (isLoading) {
    return <SkeletonLoader count={6} />;
  }

  const isFav = (id) => favorites.some((f) => String(f.id) === String(id));

  if (!foodData || foodData.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyIconBg}>
          {isFavoriteView ? (
            <Heart size={44} className={styles.heartIcon} />
          ) : (
            <Utensils size={44} className={styles.utensilIcon} />
          )}
        </div>
        <h3 className={styles.emptyTitle}>
          {isFavoriteView ? "No Saved Recipes Yet" : "No Matching Recipes Found"}
        </h3>
        <p className={styles.emptySubtitle}>
          {isFavoriteView
            ? "Tap the heart icon on any recipe card to save it to your personal cookbook!"
            : "Try clearing your query or adjusting your diet, cuisine, and prep time filters."}
        </p>

        {!isFavoriteView && onResetFilters && (
          <button className={styles.resetFiltersBtn} onClick={onResetFilters}>
            <RotateCcw size={16} />
            <span>Reset Search & Show All Recipes</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {foodData.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onSelectRecipe={onSelectRecipe}
          isFavorite={isFav(recipe.id)}
          onToggleFavorite={onToggleFavorite}
          onAddIngredientsToShopping={onAddIngredientsToShopping}
          mealPlanner={mealPlanner}
          onShowToast={onShowToast}
        />
      ))}
    </div>
  );
}
