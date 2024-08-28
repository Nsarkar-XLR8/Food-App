import { useEffect, useState } from "react";
import styles from "./Search.module.css";

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "bf430a85e36f4355b716059f8142770d";

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("");
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
      const data = await res.json();
      setFoodData(data.results);
    }
    fetchFood();
  }, [query]);

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.inputSearch}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
        placeholder="Enter Search .."
      />
    </div>
  );
}
