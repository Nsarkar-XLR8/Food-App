import React from "react";
import { Calendar, Trash2, Plus, Clock, Users, ArrowRight, Sparkles } from "lucide-react";
import styles from "./WeeklyMealPlanner.module.css";

export default function WeeklyMealPlanner({
  mealPlanner,
  onSelectRecipe,
  onOpenExplore,
}) {
  const { mealPlan, DAYS, MEALS, removeRecipeFromSlot, clearPlanner, countTotalPlanned } = mealPlanner;
  const totalPlanned = countTotalPlanned();

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.iconBg}>
            <Calendar size={28} className={styles.calIcon} />
          </div>
          <div>
            <h1 className={styles.title}>Weekly Meal Planner</h1>
            <p className={styles.subtitle}>
              Organize your breakfast, lunch, and dinner recipes for the entire week.
            </p>
          </div>
        </div>

        {totalPlanned > 0 && (
          <button className={styles.clearBtn} onClick={clearPlanner}>
            <Trash2 size={16} />
            <span>Clear Week</span>
          </button>
        )}
      </div>

      {/* Stats Summary Bar */}
      <div className={styles.statsBar}>
        <div className={styles.statPill}>
          <Sparkles size={16} className={styles.sparkleIcon} />
          <span><strong>{totalPlanned}</strong> / 21 meals planned this week</span>
        </div>
      </div>

      {/* Monday - Sunday Days Grid */}
      <div className={styles.daysGrid}>
        {DAYS.map((day) => {
          const dayMeals = mealPlan[day] || { breakfast: null, lunch: null, dinner: null };

          return (
            <div key={day} className={styles.dayCard}>
              <div className={styles.dayHeader}>
                <h3>{day}</h3>
              </div>

              <div className={styles.mealsList}>
                {MEALS.map((mealType) => {
                  const recipe = dayMeals[mealType];

                  return (
                    <div key={mealType} className={styles.mealSlot}>
                      <div className={styles.slotLabel}>
                        {mealType === "breakfast" && "🌅 Breakfast"}
                        {mealType === "lunch" && "☀️ Lunch"}
                        {mealType === "dinner" && "🌙 Dinner"}
                      </div>

                      {recipe ? (
                        <div className={styles.recipeTile} onClick={() => onSelectRecipe(recipe.id)}>
                          <img src={recipe.image} alt={recipe.title} className={styles.tileImg} />
                          <div className={styles.tileInfo}>
                            <h4 className={styles.tileTitle}>{recipe.title}</h4>
                            <span className={styles.tileTime}>
                              <Clock size={12} /> {recipe.readyInMinutes || 25}m
                            </span>
                          </div>

                          <button
                            className={styles.removeBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              removeRecipeFromSlot(day, mealType);
                            }}
                            title="Remove meal"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <button className={styles.emptySlotBtn} onClick={onOpenExplore}>
                          <Plus size={14} />
                          <span>Add Recipe</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
