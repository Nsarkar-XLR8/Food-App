import React, { useState } from "react";
import { Clock, Users, Heart, Activity, ArrowRight, ShoppingBag, Calendar, Check } from "lucide-react";
import styles from "./RecipeCard.module.css";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";

export default function RecipeCard({
  recipe,
  onSelectRecipe,
  isFavorite,
  onToggleFavorite,
  onAddIngredientsToShopping,
  mealPlanner,
  onShowToast,
}) {
  const {
    id,
    title,
    image,
    readyInMinutes,
    servings,
    healthScore,
    vegetarian,
    vegan,
    glutenFree,
    extendedIngredients,
  } = recipe;

  const [showMealPicker, setShowMealPicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedMeal, setSelectedMeal] = useState("dinner");

  const getRecipeImageUrl = (r) => {
    if (!r) return FALLBACK_IMAGE;
    if (r.image) {
      if (typeof r.image === "string" && r.image.startsWith("http")) return r.image;
      return `https://spoonacular.com/recipeImages/${r.image}`;
    }
    if (r.id) {
      return `https://spoonacular.com/recipeImages/${r.id}-565x360.jpg`;
    }
    return FALLBACK_IMAGE;
  };

  const handleQuickAddMeal = (e) => {
    e.stopPropagation();
    if (mealPlanner?.addRecipeToSlot) {
      mealPlanner.addRecipeToSlot(selectedDay, selectedMeal, recipe);
      setShowMealPicker(false);
      if (onShowToast) onShowToast(`📅 Added to ${selectedDay} ${selectedMeal.toUpperCase()}!`);
    }
  };

  const handleQuickShopping = (e) => {
    e.stopPropagation();
    if (onAddIngredientsToShopping && extendedIngredients) {
      onAddIngredientsToShopping(title, extendedIngredients);
    }
  };

  return (
    <div className={styles.card}>
      {/* Image Header & Overlay Badges */}
      <div className={styles.imageContainer} onClick={() => onSelectRecipe(id)}>
        <img
          src={getRecipeImageUrl(recipe)}
          alt={title}
          className={styles.recipeImage}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = FALLBACK_IMAGE;
          }}
        />

        {/* Favorite Button */}
        <button
          className={`${styles.favoriteBtn} ${isFavorite ? styles.isFav : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(recipe);
          }}
          title={isFavorite ? "Remove from Favorites" : "Save to Favorites"}
          aria-label="Bookmark Recipe"
        >
          <Heart size={18} fill={isFavorite ? "#f43f5e" : "none"} color={isFavorite ? "#f43f5e" : "#ffffff"} />
        </button>

        {/* Health Score Pill */}
        {healthScore && (
          <div className={styles.healthBadge}>
            <Activity size={13} />
            <span>{healthScore}% Health</span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className={styles.content}>
        {/* Diet Badges */}
        <div className={styles.tagsRow}>
          {vegetarian && <span className={styles.tagVeg}>Vegetarian</span>}
          {vegan && <span className={styles.tagVegan}>Vegan</span>}
          {glutenFree && <span className={styles.tagGf}>Gluten-Free</span>}
        </div>

        {/* Title */}
        <h3 className={styles.title} onClick={() => onSelectRecipe(id)} title={title}>
          {title}
        </h3>

        {/* Quick Meta Stats */}
        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <Clock size={15} />
            <span>{readyInMinutes || 30} mins</span>
          </div>

          <div className={styles.metaItem}>
            <Users size={15} />
            <span>{servings || 4} serv</span>
          </div>
        </div>

        {/* Quick Action Icons Row */}
        <div className={styles.quickActionsBar}>
          {extendedIngredients && (
            <button
              className={styles.quickActionBtn}
              onClick={handleQuickShopping}
              title="Add ingredients to Grocery List"
            >
              <ShoppingBag size={15} />
              <span>Grocery</span>
            </button>
          )}

          <button
            className={styles.quickActionBtn}
            onClick={(e) => {
              e.stopPropagation();
              setShowMealPicker(!showMealPicker);
            }}
            title="Schedule in Meal Planner"
          >
            <Calendar size={15} />
            <span>Plan</span>
          </button>
        </div>

        {/* Quick Meal Plan Picker Overlay */}
        {showMealPicker && (
          <div className={styles.cardMealPicker} onClick={(e) => e.stopPropagation()}>
            <div className={styles.pickerRow}>
              <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                {mealPlanner?.DAYS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <select value={selectedMeal} onChange={(e) => setSelectedMeal(e.target.value)}>
                {mealPlanner?.MEALS.map((m) => (
                  <option key={m} value={m}>{m.toUpperCase()}</option>
                ))}
              </select>

              <button className={styles.pickerAddBtn} onClick={handleQuickAddMeal}>
                <Check size={14} />
              </button>
            </div>
          </div>
        )}

        {/* View Details Action Button */}
        <button className={styles.viewBtn} onClick={() => onSelectRecipe(id)}>
          <span>View Recipe</span>
          <ArrowRight size={16} className={styles.arrowIcon} />
        </button>
      </div>
    </div>
  );
}
