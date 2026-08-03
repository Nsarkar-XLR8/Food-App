import React from "react";
import { Search, X, Sparkles, ChevronDown, RotateCcw, Filter } from "lucide-react";
import styles from "./SearchHeader.module.css";

const DIET_OPTIONS = [
  { label: "All Diets", value: "" },
  { label: "🥦 Vegetarian", value: "vegetarian" },
  { label: "🌱 Vegan", value: "vegan" },
  { label: "🌾 Gluten Free", value: "gluten free" },
  { label: "🥑 Ketogenic", value: "ketogenic" },
  { label: "🥩 Paleo", value: "paleo" },
];


const CUISINE_OPTIONS = [
  "All Cuisines", "Italian", "Asian", "Mexican", "Mediterranean", 
  "Indian", "American", "Greek", "French", "Japanese"
];

const TYPE_OPTIONS = [
  "All Dish Types", "main course", "breakfast", "dessert", 
  "salad", "soup", "appetizer", "snack"
];

const TIME_OPTIONS = [
  { label: "Any Prep Time", value: "" },
  { label: "⏱️ Under 15 mins", value: "15" },
  { label: "⏱️ Under 30 mins", value: "30" },
  { label: "⏱️ Under 45 mins", value: "45" },
  { label: "⏱️ Under 60 mins", value: "60" },
];

const SORT_OPTIONS = [
  { label: "Default Sort", value: "" },
  { label: "⭐ Health & Rating", value: "healthiness" },
  { label: "⚡ Quickest Prep Time", value: "quickest" },
  { label: "💲 Lowest Price", value: "price" },
];

export default function SearchHeader({
  query,
  setQuery,
  diet,
  setDiet,
  cuisine,
  setCuisine,
  type,
  setType,
  maxReadyTime,
  setMaxReadyTime,
  sort,
  setSort,
  onRandomClick,
  resultsCount,
  onClearAllFilters,
}) {
  const hasActiveFilters = query || diet || cuisine || type || maxReadyTime || sort;

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.heroHeader}>
        <h1 className={styles.heroTitle}>
          Discover & Cook <span className={styles.titleGradient}>Extraordinary Meals</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Explore thousands of curated recipes, scale ingredients, calculate nutrition, and organize your week.
        </p>
      </div>

      {/* Main Search Bar */}
      <div className={styles.searchBarContainer}>
        <div className={styles.inputBox}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.inputField}
            placeholder="Search recipes, ingredients, or cuisines (e.g. Pasta, Tofu, Avocado)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className={styles.clearBtn} onClick={() => setQuery("")} title="Clear text search">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Surprise Me Button */}
        <button className={styles.surpriseBtn} onClick={onRandomClick} title="Pick a random chef recommendation!">
          <Sparkles size={18} />
          <span className={styles.surpriseText}>Surprise Me!</span>
        </button>
      </div>

      {/* Diet Chips */}
      <div className={styles.dietChips}>
        {DIET_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`${styles.chip} ${diet === opt.value ? styles.chipActive : ""}`}
            onClick={() => setDiet(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Filter Dropdowns Grid */}
      <div className={styles.selectGrid}>
        {/* Cuisine Select */}
        <div className={styles.selectWrapper}>
          <select
            className={styles.customSelect}
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value === "All Cuisines" ? "" : e.target.value)}
          >
            {CUISINE_OPTIONS.map((c) => (
              <option key={c} value={c === "All Cuisines" ? "" : c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className={styles.selectIcon} />
        </div>

        {/* Dish Type Select */}
        <div className={styles.selectWrapper}>
          <select
            className={styles.customSelect}
            value={type}
            onChange={(e) => setType(e.target.value === "All Dish Types" ? "" : e.target.value)}
          >
            {TYPE_OPTIONS.map((t) => (
              <option key={t} value={t === "All Dish Types" ? "" : t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className={styles.selectIcon} />
        </div>

        {/* Max Cooking Time Select */}
        <div className={styles.selectWrapper}>
          <select
            className={styles.customSelect}
            value={maxReadyTime}
            onChange={(e) => setMaxReadyTime(e.target.value)}
          >
            {TIME_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className={styles.selectIcon} />
        </div>

        {/* Sort Select */}
        <div className={styles.selectWrapper}>
          <select
            className={styles.customSelect}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className={styles.selectIcon} />
        </div>
      </div>

      {/* Active Filter Badges Bar */}
      {hasActiveFilters && (
        <div className={styles.activeFiltersBar}>
          <span className={styles.activeFilterLabel}>
            <Filter size={14} /> Active Filters:
          </span>

          <div className={styles.activeBadgesList}>
            {query && (
              <span className={styles.activeBadge}>
                Query: "{query}" <X size={12} onClick={() => setQuery("")} className={styles.removeTag} />
              </span>
            )}

            {diet && (
              <span className={styles.activeBadge}>
                Diet: {diet} <X size={12} onClick={() => setDiet("")} className={styles.removeTag} />
              </span>
            )}

            {cuisine && (
              <span className={styles.activeBadge}>
                Cuisine: {cuisine} <X size={12} onClick={() => setCuisine("")} className={styles.removeTag} />
              </span>
            )}

            {type && (
              <span className={styles.activeBadge}>
                Type: {type} <X size={12} onClick={() => setType("")} className={styles.removeTag} />
              </span>
            )}

            {maxReadyTime && (
              <span className={styles.activeBadge}>
                ≤ {maxReadyTime}m <X size={12} onClick={() => setMaxReadyTime("")} className={styles.removeTag} />
              </span>
            )}

            {sort && (
              <span className={styles.activeBadge}>
                Sort: {sort} <X size={12} onClick={() => setSort("")} className={styles.removeTag} />
              </span>
            )}

            <button className={styles.clearAllFiltersBtn} onClick={onClearAllFilters}>
              <RotateCcw size={12} /> Clear All
            </button>
          </div>
        </div>
      )}

      {resultsCount !== null && (
        <div className={styles.resultsMeta}>
          Showing <span className={styles.metaHighlight}>{resultsCount}</span> recipes
        </div>
      )}
    </div>
  );
}
