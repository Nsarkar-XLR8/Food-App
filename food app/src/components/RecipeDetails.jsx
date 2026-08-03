import React, { useState, useEffect } from "react";
import {
  X, Clock, Users, Heart, Share2, Printer, Check, Plus, DollarSign,
  Activity, ShieldAlert, Sparkles, ChefHat, Scale, BookOpen, Calendar, Edit3, Save, Info, PieChart, Flame
} from "lucide-react";
import KitchenTimerWidget from "./KitchenTimerWidget";
import KitchenTeleprompterModal from "./KitchenTeleprompterModal";
import { useKitchenTimer } from "../hooks/useKitchenTimer";
import styles from "./RecipeDetails.module.css";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80";

export default function RecipeDetails({
  recipe,
  isLoading,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddIngredientsToShopping,
  recipeNotes,
  mealPlanner,
  onShowToast,
}) {
  const [servings, setServings] = useState(4);
  const [unitSystem, setUnitSystem] = useState("metric");
  const [activeTab, setActiveTab] = useState("ingredients");
  const [nutritionMode, setNutritionMode] = useState("perServing");
  const [checkedSteps, setCheckedSteps] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showTeleprompter, setShowTeleprompter] = useState(false);

  // Personal Notes State
  const { saveNote, getNote } = recipeNotes || {};
  const [noteText, setNoteText] = useState("");
  const [isSavedNote, setIsSavedNote] = useState(false);

  // Meal Planner Modal State
  const [showMealPlanPicker, setShowMealPlanPicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedMealType, setSelectedMealType] = useState("dinner");

  const kitchenTimer = useKitchenTimer(recipe?.readyInMinutes || 10);

  // Lock Body Scroll & Handle Escape Key
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (recipe) {
      setServings(recipe.servings || 4);
      setCheckedSteps([]);
      setCheckedIngredients([]);
      if (getNote) {
        setNoteText(getNote(recipe.id));
      }
    }
  }, [recipe]);

  if (!recipe || isLoading) {
    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.loadingContainer}>
            <div className={`${styles.loadingImg} animate-pulse`} />
            <div className={`${styles.loadingLine} animate-pulse`} />
            <div className={`${styles.loadingLineShort} animate-pulse`} />
          </div>
        </div>
      </div>
    );
  }

  // Get reliable image URL
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

  const initialServings = recipe.servings || 4;
  const scaleRatio = servings / initialServings;

  const toggleStep = (idx) => {
    setCheckedSteps((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const toggleIngredient = (idx) => {
    setCheckedIngredients((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: `Check out this recipe for ${recipe.title}!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePrint = () => window.print();

  const handleSavePersonalNote = () => {
    if (saveNote) {
      saveNote(recipe.id, noteText);
      setIsSavedNote(true);
      if (onShowToast) onShowToast("📝 Personal recipe notes saved!");
      setTimeout(() => setIsSavedNote(false), 2000);
    }
  };

  const handleAddMealPlan = () => {
    if (mealPlanner?.addRecipeToSlot) {
      mealPlanner.addRecipeToSlot(selectedDay, selectedMealType, recipe);
      setShowMealPlanPicker(false);
      if (onShowToast) {
        onShowToast(`📅 Scheduled for ${selectedDay} ${selectedMealType.toUpperCase()}!`);
      }
    }
  };

  // Helper to extract clean instructions
  const getStructuredInstructions = () => {
    if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0) {
      const steps = recipe.analyzedInstructions[0].steps;
      if (steps && steps.length > 0) return steps;
    }

    if (recipe.instructions) {
      const cleanText = recipe.instructions.replace(/<[^>]*>?/gm, "").trim();
      const sentences = cleanText
        .split(/(?<=[.!?])\s+/)
        .filter((s) => s.length > 5);
      if (sentences.length > 0) {
        return sentences.map((s, idx) => ({ number: idx + 1, step: s }));
      }
    }

    if (recipe.summary) {
      const cleanSummary = recipe.summary.replace(/<[^>]*>?/gm, "").trim();
      const sentences = cleanSummary
        .split(/(?<=[.!?])\s+/)
        .filter((s) => s.length > 10);
      return sentences.map((s, idx) => ({ number: idx + 1, step: s }));
    }

    return [];
  };

  // Robust Nutrition per Serving & Total Batch Parser
  const parseNutritionData = () => {
    let cal = 0;
    let prot = 0;
    let carb = 0;
    let fat = 0;
    let fib = 0;
    let sug = 0;

    if (recipe.nutrition) {
      if (Array.isArray(recipe.nutrition.nutrients)) {
        recipe.nutrition.nutrients.forEach((n) => {
          const name = n.name.toLowerCase();
          if (name === "calories") cal = Math.round(n.amount);
          if (name === "protein") prot = Math.round(n.amount);
          if (name === "carbohydrates" || name === "carbs") carb = Math.round(n.amount);
          if (name === "fat") fat = Math.round(n.amount);
          if (name === "fiber") fib = Math.round(n.amount);
          if (name === "sugar") sug = Math.round(n.amount);
        });
      } else {
        cal = recipe.nutrition.calories ? parseInt(recipe.nutrition.calories, 10) : 0;
        prot = recipe.nutrition.protein ? parseInt(recipe.nutrition.protein, 10) : 0;
        carb = recipe.nutrition.carbs ? parseInt(recipe.nutrition.carbs, 10) : 0;
        fat = recipe.nutrition.fat ? parseInt(recipe.nutrition.fat, 10) : 0;
        fib = recipe.nutrition.fiber ? parseInt(recipe.nutrition.fiber, 10) : 0;
      }
    }

    if (!cal) {
      cal = recipe.healthScore ? Math.round(320 + recipe.healthScore * 1.8) : 420;
      prot = 18;
      carb = 52;
      fat = 14;
      fib = 5;
    }

    return {
      perServing: {
        calories: cal,
        protein: prot,
        carbs: carb,
        fat: fat,
        fiber: fib,
        sugar: sug,
      },
      totalBatch: {
        calories: Math.round(cal * scaleRatio),
        protein: Math.round(prot * scaleRatio),
        carbs: Math.round(carb * scaleRatio),
        fat: Math.round(fat * scaleRatio),
        fiber: Math.round(fib * scaleRatio),
        sugar: Math.round(sug * scaleRatio),
      },
    };
  };

  const ingredients = recipe.extendedIngredients || [];
  const instructions = getStructuredInstructions();
  const nutritionData = parseNutritionData();
  const activeNutrition = nutritionMode === "perServing" ? nutritionData.perServing : nutritionData.totalBatch;

  const completedStepsCount = checkedSteps.length;
  const stepProgress = instructions.length > 0 ? (completedStepsCount / instructions.length) * 100 : 0;
  const cleanSummaryText = recipe.summary ? recipe.summary.replace(/<[^>]*>?/gm, "") : "";

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header & Hero Image */}
        <div className={styles.heroSection}>
          <img
            src={getRecipeImageUrl(recipe)}
            alt={recipe.title}
            className={styles.heroImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = FALLBACK_IMAGE;
            }}
          />
          <div className={styles.heroOverlay} />

          {/* Top Actions Row */}
          <div className={styles.topActions}>
            <button className={styles.circleBtn} onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>

            <div className={styles.rightActions}>
              <button className={styles.circleBtn} onClick={handleShare} title="Share Recipe">
                <Share2 size={18} />
              </button>
              <button className={styles.circleBtn} onClick={handlePrint} title="Print Recipe">
                <Printer size={18} />
              </button>
              <button
                className={`${styles.circleBtn} ${isFavorite ? styles.favActive : ""}`}
                onClick={() => onToggleFavorite(recipe)}
                title="Bookmark Recipe"
              >
                <Heart size={18} fill={isFavorite ? "#f43f5e" : "none"} color={isFavorite ? "#f43f5e" : "#ffffff"} />
              </button>
            </div>
          </div>

          {copiedLink && <div className={styles.toast}>Link copied to clipboard!</div>}

          <div className={styles.heroTitleWrapper}>
            <h1 className={styles.recipeTitle}>{recipe.title}</h1>
          </div>
        </div>

        {/* Navigation Tabs Header */}
        <div className={styles.tabNav}>
          <button
            className={`${styles.tabBtn} ${activeTab === "ingredients" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("ingredients")}
          >
            <ChefHat size={16} />
            <span>Ingredients ({ingredients.length})</span>
          </button>

          <button
            className={`${styles.tabBtn} ${activeTab === "instructions" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("instructions")}
          >
            <Sparkles size={16} />
            <span>Cooking Steps ({instructions.length})</span>
          </button>

          <button
            className={`${styles.tabBtn} ${activeTab === "nutrition" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("nutrition")}
          >
            <PieChart size={16} />
            <span>Nutrition ({nutritionData.perServing.calories} kcal/serv)</span>
          </button>

          <button
            className={`${styles.tabBtn} ${activeTab === "notes" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("notes")}
          >
            <Edit3 size={16} />
            <span>Chef Notes</span>
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className={styles.bodyContent}>
          {/* PER SERVING NUTRITION QUICK BAR (Always Visible at Top!) */}
          <div className={styles.perServingQuickBar}>
            <div className={styles.quickBarTitle}>
              <Flame size={18} className={styles.flameIcon} />
              <span>Nutrition Per Serving:</span>
            </div>
            <div className={styles.quickPillsList}>
              <span className={styles.qPillCal}>🔥 <strong>{nutritionData.perServing.calories}</strong> kcal</span>
              <span className={styles.qPillProt}>💪 <strong>{nutritionData.perServing.protein}g</strong> Protein</span>
              <span className={styles.qPillCarb}>🌾 <strong>{nutritionData.perServing.carbs}g</strong> Carbs</span>
              <span className={styles.qPillFat}>🥑 <strong>{nutritionData.perServing.fat}g</strong> Fat</span>
            </div>
          </div>

          {/* Summary Overview */}
          {cleanSummaryText && (
            <div className={styles.summaryBox}>
              <Info size={16} className={styles.summaryIcon} />
              <p className={styles.summaryText}>{cleanSummaryText}</p>
            </div>
          )}

          {/* Quick Action Bar (Teleprompter & Meal Planner) */}
          <div className={styles.actionPillsRow}>
            <button className={styles.teleprompterTriggerBtn} onClick={() => setShowTeleprompter(true)}>
              <BookOpen size={18} />
              <span>Start Hands-Free Cooking Mode</span>
            </button>

            <button className={styles.mealPlanTriggerBtn} onClick={() => setShowMealPlanPicker(true)}>
              <Calendar size={18} />
              <span>Add to Meal Planner</span>
            </button>
          </div>

          {/* Meal Plan Picker Modal Popup */}
          {showMealPlanPicker && (
            <div className={styles.mealPickerCard}>
              <div className={styles.mealPickerHeader}>
                <h4>Schedule this recipe</h4>
                <button onClick={() => setShowMealPlanPicker(false)} className={styles.smallClose}>
                  <X size={16} />
                </button>
              </div>

              <div className={styles.mealPickerForm}>
                <label>
                  Day:
                  <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                    {mealPlanner?.DAYS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Meal:
                  <select value={selectedMealType} onChange={(e) => setSelectedMealType(e.target.value)}>
                    {mealPlanner?.MEALS.map((m) => (
                      <option key={m} value={m}>{m.toUpperCase()}</option>
                    ))}
                  </select>
                </label>

                <button className={styles.confirmPlanBtn} onClick={handleAddMealPlan}>
                  Save to Schedule
                </button>
              </div>
            </div>
          )}

          {/* Quick Meta Grid */}
          <div className={styles.metaGrid}>
            <div className={styles.metaBox}>
              <Clock size={20} className={styles.iconEmerald} />
              <div>
                <span className={styles.metaLabel}>Prep Time</span>
                <span className={styles.metaVal}>{recipe.readyInMinutes || 25} mins</span>
              </div>
            </div>

            <div className={styles.metaBox}>
              <Users size={20} className={styles.iconAmber} />
              <div>
                <span className={styles.metaLabel}>Servings</span>
                <div className={styles.servingsControl}>
                  <button onClick={() => setServings(Math.max(1, servings - 1))} className={styles.scaleBtn}>-</button>
                  <span className={styles.metaVal}>{servings}</span>
                  <button onClick={() => setServings(servings + 1)} className={styles.scaleBtn}>+</button>
                </div>
              </div>
            </div>

            <div className={styles.metaBox}>
              <Activity size={20} className={styles.iconEmerald} />
              <div>
                <span className={styles.metaLabel}>Health Score</span>
                <span className={styles.metaVal}>{recipe.healthScore || 85}%</span>
              </div>
            </div>

            {recipe.pricePerServing && (
              <div className={styles.metaBox}>
                <DollarSign size={20} className={styles.iconAmber} />
                <div>
                  <span className={styles.metaLabel}>Est. Price</span>
                  <span className={styles.metaVal}>${(recipe.pricePerServing / 100).toFixed(2)} / serv</span>
                </div>
              </div>
            )}
          </div>

          {/* Diet & Allergen Badges */}
          <div className={styles.badgesRow}>
            {recipe.vegetarian && <span className={styles.badgeVeg}>🥕 Vegetarian</span>}
            {recipe.vegan && <span className={styles.badgeVegan}>🌱 Vegan</span>}
            {recipe.glutenFree && <span className={styles.badgeGf}>🌾 Gluten-Free</span>}
            {recipe.dairyFree && <span className={styles.badgeDf}>🥛 Dairy-Free</span>}
          </div>

          {/* TAB 1: INGREDIENTS */}
          {activeTab === "ingredients" && (
            <div className={styles.tabSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleGroup}>
                  <ChefHat size={22} className={styles.sectionIcon} />
                  <h2>Scaled Ingredients</h2>
                </div>

                <div className={styles.unitToggle}>
                  <button
                    className={`${styles.unitBtn} ${unitSystem === "metric" ? styles.unitActive : ""}`}
                    onClick={() => setUnitSystem("metric")}
                  >
                    Metric
                  </button>
                  <button
                    className={`${styles.unitBtn} ${unitSystem === "us" ? styles.unitActive : ""}`}
                    onClick={() => setUnitSystem("us")}
                  >
                    US Imperial
                  </button>
                </div>
              </div>

              <button
                className={styles.addGroceryBtn}
                onClick={() => onAddIngredientsToShopping(recipe.title, ingredients)}
              >
                <Plus size={16} />
                <span>Add All Ingredients to Shopping List</span>
              </button>

              <div className={styles.ingredientsList}>
                {ingredients.map((ing, idx) => {
                  const amountValue = unitSystem === "us" && ing.usAmount ? ing.usAmount : ing.amount;
                  const unitValue = unitSystem === "us" && ing.usUnit ? ing.usUnit : ing.unit;
                  const displayAmount = (amountValue * scaleRatio).toFixed(1).replace(/\.0$/, "");
                  const isChecked = checkedIngredients.includes(idx);

                  const imgThumb = ing.image
                    ? ing.image.startsWith("http")
                      ? ing.image
                      : `https://spoonacular.com/cdn/ingredients_100x100/${ing.image}`
                    : null;

                  return (
                    <div
                      key={idx}
                      className={`${styles.ingRow} ${isChecked ? styles.ingChecked : ""}`}
                      onClick={() => toggleIngredient(idx)}
                    >
                      <div className={`${styles.checkbox} ${isChecked ? styles.checkedBox : ""}`}>
                        {isChecked && <Check size={14} color="#ffffff" />}
                      </div>

                      {imgThumb && (
                        <img src={imgThumb} alt={ing.name} className={styles.ingThumb} />
                      )}

                      <span className={styles.ingName}>{ing.name}</span>

                      <span className={styles.ingAmount}>
                        {displayAmount} {unitValue}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: INSTRUCTIONS */}
          {activeTab === "instructions" && (
            <div className={styles.tabSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleGroup}>
                  <Sparkles size={22} className={styles.sectionIcon} />
                  <h2>Step-by-Step Cooking Guide</h2>
                </div>
                {instructions.length > 0 && (
                  <span className={styles.progressLabel}>
                    {completedStepsCount} of {instructions.length} completed
                  </span>
                )}
              </div>

              {/* Embedded Kitchen Timer */}
              <KitchenTimerWidget timer={kitchenTimer} />

              {/* Step Progress Bar */}
              {instructions.length > 0 && (
                <div className={styles.progressTrack}>
                  <div className={styles.progressBar} style={{ width: `${stepProgress}%` }} />
                </div>
              )}

              <div className={styles.instructionsList}>
                {instructions.length === 0 ? (
                  <p className={styles.noSteps}>No detailed instructions found for this recipe.</p>
                ) : (
                  instructions.map((step, idx) => {
                    const isStepDone = checkedSteps.includes(idx);
                    return (
                      <div
                        key={idx}
                        className={`${styles.stepBox} ${isStepDone ? styles.stepDone : ""}`}
                        onClick={() => toggleStep(idx)}
                      >
                        <div className={styles.stepNumCol}>
                          <div className={`${styles.stepCircle} ${isStepDone ? styles.stepCircleDone : ""}`}>
                            {isStepDone ? <Check size={14} /> : step.number || idx + 1}
                          </div>
                        </div>

                        <div className={styles.stepText}>{step.step}</div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 3: NUTRITION & MACROS */}
          {activeTab === "nutrition" && (
            <div className={styles.tabSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleGroup}>
                  <Flame size={22} className={styles.sectionIcon} />
                  <h2>Nutritional Breakdown</h2>
                </div>

                {/* Per Serving vs Total Batch Mode Switcher */}
                <div className={styles.unitToggle}>
                  <button
                    className={`${styles.unitBtn} ${nutritionMode === "perServing" ? styles.unitActive : ""}`}
                    onClick={() => setNutritionMode("perServing")}
                  >
                    Per Serving
                  </button>
                  <button
                    className={`${styles.unitBtn} ${nutritionMode === "totalBatch" ? styles.unitActive : ""}`}
                    onClick={() => setNutritionMode("totalBatch")}
                  >
                    Total Batch ({servings} Servings)
                  </button>
                </div>
              </div>

              {/* Sub-header notification */}
              <div className={styles.nutritionModeNotice}>
                Showing nutrition calculations <strong>{nutritionMode === "perServing" ? "per 1 individual serving" : `scaled for ${servings} servings`}</strong>:
              </div>

              {/* Macros Dashboard Cards */}
              <div className={styles.nutritionGrid}>
                <div className={`${styles.nutriCard} ${styles.nutriCal}`}>
                  <span className={styles.nutriVal}>{activeNutrition.calories} kcal</span>
                  <span className={styles.nutriLabel}>Calories</span>
                </div>

                <div className={`${styles.nutriCard} ${styles.nutriProtein}`}>
                  <span className={styles.nutriVal}>{activeNutrition.protein}g</span>
                  <span className={styles.nutriLabel}>Protein</span>
                </div>

                <div className={`${styles.nutriCard} ${styles.nutriCarbs}`}>
                  <span className={styles.nutriVal}>{activeNutrition.carbs}g</span>
                  <span className={styles.nutriLabel}>Carbohydrates</span>
                </div>

                <div className={`${styles.nutriCard} ${styles.nutriFat}`}>
                  <span className={styles.nutriVal}>{activeNutrition.fat}g</span>
                  <span className={styles.nutriLabel}>Total Fat</span>
                </div>

                <div className={`${styles.nutriCard} ${styles.nutriFiber}`}>
                  <span className={styles.nutriVal}>{activeNutrition.fiber}g</span>
                  <span className={styles.nutriLabel}>Dietary Fiber</span>
                </div>

                {activeNutrition.sugar > 0 && (
                  <div className={styles.nutriCard}>
                    <span className={styles.nutriVal}>{activeNutrition.sugar}g</span>
                    <span className={styles.nutriLabel}>Sugar</span>
                  </div>
                )}
              </div>

              {/* Equipment Needed */}
              {recipe.equipment && recipe.equipment.length > 0 && (
                <div className={styles.equipmentSection}>
                  <h3>Required Kitchen Equipment</h3>
                  <div className={styles.equipmentTags}>
                    {recipe.equipment.map((eq, i) => (
                      <span key={i} className={styles.eqPill}>{eq}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CHEF NOTES */}
          {activeTab === "notes" && (
            <div className={styles.tabSection}>
              <div className={styles.personalNotesCard}>
                <div className={styles.notesHeader}>
                  <Edit3 size={18} className={styles.notesIcon} />
                  <h3>My Private Chef Notes & Tweaks</h3>
                </div>
                <textarea
                  className={styles.notesTextarea}
                  placeholder="Add your personal notes (e.g., 'Bake 3 mins longer', 'Sub olive oil for butter')..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
                <button className={styles.saveNotesBtn} onClick={handleSavePersonalNote}>
                  <Save size={16} />
                  <span>{isSavedNote ? "Saved!" : "Save Notes"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hands-Free Teleprompter Modal */}
      {showTeleprompter && (
        <KitchenTeleprompterModal
          recipe={recipe}
          onClose={() => setShowTeleprompter(false)}
        />
      )}
    </div>
  );
}
