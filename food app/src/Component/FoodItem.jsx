import styles from "./foodItem.module.css";

export default function ({ food,setFoodId }) {
  return (
    <div className={styles.foodCart}>
      <img className={styles.imageItem} src={food.image} alt="" />
      <div className={styles.contentItem}>
        {" "}
        <p className={styles.nameItem}>{food.title}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={()=> {console.log(food.id); setFoodId(food.id);}
          
        } className={styles.buttonItem}>View Recipe</button>
      </div>
    </div>
  );
}
