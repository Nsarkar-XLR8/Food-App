import React from "react";
import { ShoppingBag, Check, Trash2, X, Plus, Sparkles } from "lucide-react";
import styles from "./ShoppingListModal.module.css";

export default function ShoppingListModal({ shoppingList, onClose }) {
  const { items, toggleItem, removeItem, clearCompleted, clearAll } = shoppingList;
  const completedCount = items.filter((i) => i.completed).length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.iconBg}>
            <ShoppingBag size={24} className={styles.bagIcon} />
          </div>
          <div>
            <h2 className={styles.title}>Grocery Shopping List</h2>
            <p className={styles.subtitle}>
              {items.length > 0
                ? `${completedCount} of ${items.length} items checked`
                : "Your shopping cart is empty"}
            </p>
          </div>
        </div>

        {onClose && (
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close Modal">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Action Bar */}
      {items.length > 0 && (
        <div className={styles.actionBar}>
          <button className={styles.actionBtn} onClick={clearCompleted}>
            <Check size={14} />
            <span>Clear Completed ({completedCount})</span>
          </button>
          <button className={styles.clearAllBtn} onClick={clearAll}>
            <Trash2 size={14} />
            <span>Clear All</span>
          </button>
        </div>
      )}

      {/* Items List */}
      {items.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIconWrapper}>
            <Sparkles size={40} className={styles.sparkleIcon} />
          </div>
          <h3>No Shopping Items Yet</h3>
          <p>Open any recipe details and tap "Add to Shopping List" to save ingredients here!</p>
        </div>
      ) : (
        <div className={styles.itemsList}>
          {items.map((item) => (
            <div
              key={item.id}
              className={`${styles.itemRow} ${item.completed ? styles.completedRow : ""}`}
              onClick={() => toggleItem(item.id)}
            >
              <div className={`${styles.checkbox} ${item.completed ? styles.checked : ""}`}>
                {item.completed && <Check size={14} color="#ffffff" />}
              </div>

              <div className={styles.itemInfo}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemMeta}>
                  {item.amount} {item.unit} • <span className={styles.recipeTag}>{item.recipeTitle}</span>
                </span>
              </div>

              <button
                className={styles.deleteBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(item.id);
                }}
                aria-label="Remove item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
