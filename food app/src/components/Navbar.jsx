import React from "react";
import { UtensilsCrossed, Heart, ShoppingBag, Moon, Sun, Compass, Calendar } from "lucide-react";
import styles from "./Navbar.module.css";


export default function Navbar({
  activeView,
  setActiveView,
  darkMode,
  setDarkMode,
  favoritesCount,
  shoppingCount,
  plannedCount,
}) {
  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        {/* Brand Logo */}
        <div className={styles.brand} onClick={() => setActiveView("explore")}>
          <div className={styles.logoIcon}>
            <UtensilsCrossed size={22} className={styles.utensilIcon} />
          </div>
          <span className={styles.brandName}>
            Culinary<span className={styles.brandHighlight}>Hub</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <button
            className={`${styles.navBtn} ${activeView === "explore" ? styles.active : ""}`}
            onClick={() => setActiveView("explore")}
          >
            <Compass size={18} />
            <span>Explore</span>
          </button>

          <button
            className={`${styles.navBtn} ${activeView === "favorites" ? styles.active : ""}`}
            onClick={() => setActiveView("favorites")}
          >
            <Heart size={18} />
            <span>Saved Recipes</span>
            {favoritesCount > 0 && <span className={styles.badge}>{favoritesCount}</span>}
          </button>

          <button
            className={`${styles.navBtn} ${activeView === "shopping" ? styles.active : ""}`}
            onClick={() => setActiveView("shopping")}
          >
            <ShoppingBag size={18} />
            <span>Shopping List</span>
            {shoppingCount > 0 && <span className={styles.badgeAmber}>{shoppingCount}</span>}
          </button>

          <button
            className={`${styles.navBtn} ${activeView === "mealplanner" ? styles.active : ""}`}
            onClick={() => setActiveView("mealplanner")}
          >
            <Calendar size={18} />
            <span>Meal Planner</span>
            {plannedCount > 0 && <span className={styles.badgeEmerald}>{plannedCount}</span>}
          </button>
        </nav>

        {/* Right Actions */}
        <div className={styles.actions}>
          <button
            className={styles.themeToggle}
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={20} className={styles.sunIcon} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
