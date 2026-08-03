import { MOCK_RECIPES } from "../data/mockRecipes";

const BASE_URL = "https://api.spoonacular.com/recipes";
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY || "9a9f317fed4b4ae68cff1be129119d62";

const recipeCache = new Map();





/**
 * Search recipes with query, diet, cuisine, dishType, maxReadyTime, sort
 */
export async function searchRecipes({
  query = "",
  diet = "",
  cuisine = "",
  type = "",
  maxReadyTime = "",
  sort = "",
}) {
  const cacheKey = `search:${query}:${diet}:${cuisine}:${type}:${maxReadyTime}:${sort}`;
  if (recipeCache.has(cacheKey)) {
    return recipeCache.get(cacheKey);
  }

  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      number: 12,
      addRecipeInformation: true,
      fillIngredients: true,
    });

    if (query.trim()) params.append("query", query.trim());
    if (diet) params.append("diet", diet);
    if (cuisine) params.append("cuisine", cuisine);
    if (type) params.append("type", type);
    if (maxReadyTime) params.append("maxReadyTime", maxReadyTime);
    if (sort) params.append("sort", sort);

    const res = await fetch(`${BASE_URL}/complexSearch?${params.toString()}`);

    if (!res.ok) {
      console.warn(`Spoonacular API status ${res.status}. Serving mock fallback.`);
      return filterMockRecipes({ query, diet, cuisine, type, maxReadyTime, sort });
    }

    const data = await res.json();
    const results = data.results || [];
    recipeCache.set(cacheKey, results);
    return results;
  } catch (err) {
    console.warn("API/Network error. Serving mock fallback:", err);
    return filterMockRecipes({ query, diet, cuisine, type, maxReadyTime, sort });
  }
}

/**
 * Get detailed recipe info by ID
 */
export async function getRecipeDetails(foodId) {
  if (!foodId) return null;

  const cacheKey = `details:${foodId}`;
  if (recipeCache.has(cacheKey)) {
    return recipeCache.get(cacheKey);
  }

  const mockMatch = MOCK_RECIPES.find((r) => String(r.id) === String(foodId));

  try {
    const res = await fetch(`${BASE_URL}/${foodId}/information?apiKey=${API_KEY}&includeNutrition=true`);

    if (!res.ok) {
      return mockMatch || MOCK_RECIPES[0];
    }

    const data = await res.json();
    recipeCache.set(cacheKey, data);
    return data;
  } catch (err) {
    return mockMatch || MOCK_RECIPES[0];
  }
}

/**
 * Get random recipes for hero/recommendations
 */
export async function getRandomRecipes(number = 6) {
  const cacheKey = `random:${number}`;
  if (recipeCache.has(cacheKey)) {
    return recipeCache.get(cacheKey);
  }

  try {
    const res = await fetch(`${BASE_URL}/random?apiKey=${API_KEY}&number=${number}`);
    if (!res.ok) return MOCK_RECIPES;
    const data = await res.json();
    const recipes = data.recipes || [];
    recipeCache.set(cacheKey, recipes);
    return recipes;
  } catch (err) {
    return MOCK_RECIPES;
  }
}

/**
 * Filter and sort mock recipes dataset
 */
function filterMockRecipes({ query, diet, cuisine, type, maxReadyTime, sort }) {
  let list = [...MOCK_RECIPES];

  if (query.trim()) {
    const q = query.toLowerCase();
    list = list.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.extendedIngredients?.some((i) => i.name.toLowerCase().includes(q))
    );
  }

  if (diet) {
    const d = diet.toLowerCase();
    if (d === "vegetarian") list = list.filter((r) => r.vegetarian);
    else if (d === "vegan") list = list.filter((r) => r.vegan);
    else if (d === "gluten free" || d === "gluten-free") list = list.filter((r) => r.glutenFree);
  }

  if (cuisine) {
    const c = cuisine.toLowerCase();
    list = list.filter((r) => r.cuisines?.some((cu) => cu.toLowerCase().includes(c)));
  }

  if (type) {
    const t = type.toLowerCase();
    list = list.filter((r) => r.dishTypes?.some((dt) => dt.toLowerCase().includes(t)));
  }

  if (maxReadyTime) {
    const maxTime = parseInt(maxReadyTime, 10);
    if (!isNaN(maxTime)) {
      list = list.filter((r) => r.readyInMinutes <= maxTime);
    }
  }

  if (sort) {
    if (sort === "healthiness" || sort === "healthScore") {
      list.sort((a, b) => (b.healthScore || 0) - (a.healthScore || 0));
    } else if (sort === "time" || sort === "quickest") {
      list.sort((a, b) => (a.readyInMinutes || 99) - (b.readyInMinutes || 99));
    } else if (sort === "price") {
      list.sort((a, b) => (a.pricePerServing || 0) - (b.pricePerServing || 0));
    }
  }

  return list;
}
