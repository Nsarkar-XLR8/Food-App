import styles from "./Item.module.css";

export default function Item({ item }) {
  return (
    <div>
      <div className={styles.itemContainer} key={item.id}>
        <div className={styles.imageContainer} >
          <img className={styles.image}
            src={
              `https://spoonacular.com/cdn/ingredients_100x100/` + item.image
            }
            alt=""
          />
        </div>
        <div className={styles.nameContainer}>
          <div className={styles.names}>{item.name}</div>
          <div className={styles.amountUnit}>
            {" "}
            {item.amount} {item.unit}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
