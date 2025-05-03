import React from "react";
import Button from "./components/UI/Button";
import Products from "./components/Products/Products";

function App() {
  return (
    <React.Fragment>
      <Button color="primary" size="lg">
        Tıkla
      </Button>
      <Button color="danger" size="lg">
        <b>Ürünü Sil</b>
      </Button>

      <Products />
    </React.Fragment>
  );
}

export default App;
