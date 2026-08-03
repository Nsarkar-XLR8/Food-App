import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MobileBottomNav from "./components/MobileBottomNav";
import SearchHeader from "./components/SearchHeader";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import ShoppingListModal from "./components/ShoppingListModal";
import WeeklyMealPlanner from "./components/WeeklyMealPlanner";

import { searchRecipes, getRecipeDetails, getRandomRecipes } from "./services/spoonacularApi";
import { useDebounce } from "./hooks/useDebounce";
import { useFavorites } from "./hooks/useFavorites";
import { useShoppingList } from "./hooks/useShoppingList";
import { useRecipeNotes } from "./hooks/useRecipeNotes";
import { useMealPlanner } from "./hooks/useMealPlanner";
import { MOCK_RECIPES } from "./data/mockRecipes";

function App() {
  // Navigation & View State
  const [activeView, setActiveView] = useState("explore"); // "explore" | "favorites" | "shopping" | "mealplanner"
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("culinaryhub_theme") === "dark";
  });

  // Search & Filter State
  const [query, setQuery] = useState("");
  const [diet, setDiet] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [type, setType] = useState("");
  const [maxReadyTime, setMaxReadyTime] = useState("");
  const [sort, setSort] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  // Recipe Data State
  const [recipes, setRecipes] = useState(MOCK_RECIPES);
  const [isLoading, setIsLoading] = useState(false);

  // Selected Recipe Details Modal State
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [selectedRecipeDetail, setSelectedRecipeDetail] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  // Custom Hooks
  const { favorites, toggleFavorite } = useFavorites();
  const shoppingList = useShoppingList();
  const recipeNotes = useRecipeNotes();
  const mealPlanner = useMealPlanner();

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleClearAllFilters = () => {
    setQuery("");
    setDiet("");
    setCuisine("");
    setType("");
    setMaxReadyTime("");
    setSort("");
    showToast("🧹 All search filters reset");
  };

  // Sync Dark Theme Class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("culinaryhub_theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("culinaryhub_theme", "light");
    }
  }, [darkMode]);

  // Fetch Recipes when search terms change
  useEffect(() => {
    async function loadRecipes() {
      setIsLoading(true);
      const results = await searchRecipes({
        query: debouncedQuery,
        diet,
        cuisine,
        type,
        maxReadyTime,
        sort,
      });
      setRecipes(results);
      setIsLoading(false);
    }

    loadRecipes();
  }, [debouncedQuery, diet, cuisine, type, maxReadyTime, sort]);

  // Fetch Details when recipe selected
  useEffect(() => {
    async function loadDetails() {
      if (!selectedFoodId) {
        setSelectedRecipeDetail(null);
        return;
      }
      setIsLoadingDetail(true);
      const detail = await getRecipeDetails(selectedFoodId);
      setSelectedRecipeDetail(detail);
      setIsLoadingDetail(false);
    }

    loadDetails();
  }, [selectedFoodId]);

  // Handle Surprise Me Random Button
  const handleRandomClick = async () => {
    setIsLoading(true);
    const randoms = await getRandomRecipes(6);
    setRecipes(randoms);
    setIsLoading(false);
    setActiveView("explore");
    showToast("🎲 Random chef picks loaded!");
  };

  // Add ingredients to shopping list
  const handleAddIngredientsToShopping = (recipeTitle, ingredientsList) => {
    shoppingList.addIngredientsFromRecipe(recipeTitle, ingredientsList);
    showToast(`🛒 Added ${ingredientsList.length} ingredients to Shopping List!`);
  };

  const currentDisplayList = activeView === "favorites" ? favorites : recipes;

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        favoritesCount={favorites.length}
        shoppingCount={shoppingList.items.length}
        plannedCount={mealPlanner.countTotalPlanned()}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Explore View Header */}
        {activeView === "explore" && (
          <SearchHeader
            query={query}
            setQuery={setQuery}
            diet={diet}
            setDiet={setDiet}
            cuisine={cuisine}
            setCuisine={setCuisine}
            type={type}
            setType={setType}
            maxReadyTime={maxReadyTime}
            setMaxReadyTime={setMaxReadyTime}
            sort={sort}
            setSort={setSort}
            onRandomClick={handleRandomClick}
            resultsCount={recipes ? recipes.length : 0}
            onClearAllFilters={handleClearAllFilters}
          />
        )}

        {/* Favorites View Header */}
        {activeView === "favorites" && (
          <div style={{ textAlign: "center", padding: "2.5rem 1.5rem 1.5rem" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)" }}>
              Your Saved <span style={{ color: "var(--accent-rose)" }}>Cookbook</span>
            </h1>
            <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
              {favorites.length} bookmarked recipes ready for your next culinary creation.
            </p>
          </div>
        )}

        {/* Shopping List View */}
        {activeView === "shopping" && (
          <ShoppingListModal shoppingList={shoppingList} />
        )}

        {/* Weekly Meal Planner View */}
        {activeView === "mealplanner" && (
          <WeeklyMealPlanner
            mealPlanner={mealPlanner}
            onSelectRecipe={(id) => setSelectedFoodId(id)}
            onOpenExplore={() => setActiveView("explore")}
          />
        )}

        {/* Recipe Cards Grid (for Explore & Favorites views) */}
        {(activeView === "explore" || activeView === "favorites") && (
          <RecipeList
            foodData={currentDisplayList}
            isLoading={isLoading}
            onSelectRecipe={(id) => setSelectedFoodId(id)}
            favorites={favorites}
            onToggleFavorite={(recipe) => {
              toggleFavorite(recipe);
              showToast("❤️ Favorite updated");
            }}
            onAddIngredientsToShopping={handleAddIngredientsToShopping}
            mealPlanner={mealPlanner}
            onShowToast={showToast}
            onResetFilters={handleClearAllFilters}
            isFavoriteView={activeView === "favorites"}
          />
        )}
      </main>

      {/* Recipe Detail Modal */}
      {selectedFoodId && (
        <RecipeDetails
          recipe={selectedRecipeDetail}
          isLoading={isLoadingDetail}
          onClose={() => setSelectedFoodId(null)}
          isFavorite={favorites.some((f) => String(f.id) === String(selectedFoodId))}
          onToggleFavorite={(recipe) => toggleFavorite(recipe)}
          onAddIngredientsToShopping={handleAddIngredientsToShopping}
          recipeNotes={recipeNotes}
          mealPlanner={mealPlanner}
          onShowToast={showToast}
        />
      )}

      {/* Notification Toast */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "5.5rem",
            right: "1.5rem",
            zIndex: 90,
            background: "var(--text-primary)",
            color: "var(--bg-primary)",
            padding: "0.85rem 1.35rem",
            borderRadius: "9999px",
            boxShadow: "var(--shadow-lg)",
            fontWeight: 700,
            fontSize: "0.92rem",
            animation: "fadeIn 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeView={activeView}
        setActiveView={setActiveView}
        favoritesCount={favorites.length}
        shoppingCount={shoppingList.items.length}
        plannedCount={mealPlanner.countTotalPlanned()}
        onRandomClick={handleRandomClick}
      />
    </div>
  );
}

export default App;
