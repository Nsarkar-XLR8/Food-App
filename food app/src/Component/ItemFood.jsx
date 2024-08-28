import Item from "./Item";


export default function ItemFood({food}) {
  return (
    <div>
      {food.extendedIngredients ? (
        food.extendedIngredients.map((item) => (
          <Item item={item} />
        ))
      ) : (
        <p>Loading ingredients...</p> // Optional: You can provide a loading or fallback message here
      )}
    </div>
  );
}
