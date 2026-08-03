import React from "react";
import { Compass, Heart, ShoppingBag, Calendar, Shuffle } from "lucide-react";
import styles from "./MobileBottomNav.module.css";


export default function MobileBottomNav({
  activeView,
  setActiveView,
  favoritesCount,
  shoppingCount,
  plannedCount,
  onRandomClick,
}) {
  return (
    <nav className={styles.bottomNav}>
      <button
        className={`${styles.navItem} ${activeView === "explore" ? styles.active : ""}`}
        onClick={() => setActiveView("explore")}
      >
        <Compass size={20} />
        <span>Explore</span>
      </button>

      <button
        className={`${styles.navItem} ${activeView === "favorites" ? styles.active : ""}`}
        onClick={() => setActiveView("favorites")}
      >
        <div className={styles.iconWrapper}>
          <Heart size={20} />
          {favoritesCount > 0 && <span className={styles.badge}>{favoritesCount}</span>}
        </div>
        <span>Saved</span>
      </button>

      <button
        className={`${styles.navItem} ${activeView === "shopping" ? styles.active : ""}`}
        onClick={() => setActiveView("shopping")}
      >
        <div className={styles.iconWrapper}>
          <ShoppingBag size={20} />
          {shoppingCount > 0 && <span className={styles.badgeAmber}>{shoppingCount}</span>}
        </div>
        <span>Grocery</span>
      </button>

      <button
        className={`${styles.navItem} ${activeView === "mealplanner" ? styles.active : ""}`}
        onClick={() => setActiveView("mealplanner")}
      >
        <div className={styles.iconWrapper}>
          <Calendar size={20} />
          {plannedCount > 0 && <span className={styles.badgeEmerald}>{plannedCount}</span>}
        </div>
        <span>Planner</span>
      </button>

      <button className={styles.navItem} onClick={onRandomClick}>
        <Shuffle size={20} className={styles.spinIcon} />
        <span>Surprise</span>
      </button>
    </nav>
  );
}
