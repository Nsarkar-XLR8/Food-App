import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footerCard} >
      <div className={styles.paraGraph} >
        <p>
          😄 "Spoonacular: Where recipes meet nutrition. Your go-to platform for
          meal planning, healthy eating, and culinary inspiration." <br /> "Discover
          recipes, track nutrition, and create personalized meal plans with
          Spoonacular—your all-in-one food API." <br /> "From recipe discovery to
          detailed nutritional analysis, Spoonacular turns ingredients into
          insights." <br /> "Spoonacular: Bridging the gap between tasty recipes and
          mindful eating."
        </p>
      </div>
      <div  className={styles.contactDetails} >
        <p>📧 Contact Us</p>
        <p>😎 Nayem Sarkar</p>

      </div>
    </div>
  );
}
