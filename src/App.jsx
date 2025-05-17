import { useState } from "react";
import Header from "./components/Layout/Header";
import Products from "./components/Products/Products";

function App() {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(productItem) {
    setCartItems((prevState) => [productItem, ...prevState]);
  }

  return (
    <div className="app container mx-auto">
      <Header cartItems={cartItems} />
      <div className="pt-4">
        <Products addToCart={addToCart} />
      </div>
    </div>
  );
}

export default App;
