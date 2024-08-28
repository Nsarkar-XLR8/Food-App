import { useState } from "react";
import Search from "./Component/Search";
import InnerContainer from "./Component/InnerContainer";
import FoodList from "./Component/FoodList";
import Nav from "./Component/Nav";
import Container from "./Component/Container";
import "./App.css";
import FoodDetails from "./Component/FoodDetails";
import Footer from "./Component/Footer";

function App() {
  const [foodData, setFoodData] = useState([]);
  const [foodId, setFoodId] = useState("");

  return (
    <div className="App">
      <Nav />
      <Search foodData={foodData} setFoodData={setFoodData} />

      <Container>
        <InnerContainer>
          <FoodList setFoodId={setFoodId} foodData={foodData} />
        </InnerContainer>
        <InnerContainer>
          <FoodDetails foodId={foodId} />
        </InnerContainer>
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
