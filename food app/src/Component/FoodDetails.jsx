import { useEffect, useState } from "react";
import styles from "./FoodDetails.module.css";
import ItemFood from "./ItemFood";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = `bf430a85e36f4355b716059f8142770d`;

  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();

      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);

  return (
    <div>
      <div className={styles.recipeCard}>
        <h2 className={styles.recipeName}>{food.title}</h2>

        <img className={styles.recipeImage} src={food.image} alt="" />
        <div className={styles.recipeDetails}>
          <span>
            <strong> 🕝{food.readyInMinutes} Minutes </strong>
          </span>
          <span>
            👨‍👩‍👧‍👦 <strong>Serves {food.servings}</strong>
          </span>
          <span>
            <strong>
              {" "}
              {food.vegetarian ? " 🥕 Vegetarian" : "🥩 Non-Vegetarian"}{" "}
            </strong>
          </span>
          <span>
            {" "}
            <strong>{food.vegan ? "🐮Vegan" : "🥦Non-Vegan"}</strong>
          </span>
        </div>
        <div>
          💲
          <span>
            {" "}
            <strong>
              {food.pricePerServing} {""}
              Per Serving{" "}
            </strong>
          </span>
        </div>

         <h2>Ingredients</h2>
      <ItemFood food={food} />
        <h2>Instructions</h2>

        <div className={styles.recipeInstruction}>
          <ol>
            {isLoading ? (
              <p> Loading ..</p>
            ) : (
              food.analyzedInstructions[0].steps.map((step) => (
                <li>{step.step}</li>
              ))
            )}

            {/* {food.analyzedInstructions && food.analyzedInstructions.length > 0 && (
          <ul>
            {food.analyzedInstructions[0].steps.map((step, index) => (
              <li key={index}>{step.step}</li>
            ))}
          </ul>
        )} */}
          </ol>
        </div>
      </div>
    </div>
  );
}
