import { useState } from "react";
import Button from "../UI/Button";

import "./ProductItem.css";

function ProductItem(props) {
  const { image, title, price, category } = props;
  const [localTitleState, setTitleLocalState] = useState(title);

  function handleTitleChange() {
    setTitleLocalState("Yüzük");
  }

  return (
    <div className="product-item">
      <div className="product-image">
        <img src={image} alt="Soda" />
      </div>
      <div className="product-info">
        <span className="product-category">{category}</span>
        <b className="product-title">{localTitleState}</b>
        <span className="product-price">{price}₺</span>
        <Button color="primary" size="sm" onClick={handleTitleChange}>
          Title Değiştir!
        </Button>
      </div>
    </div>
  );
}

export default ProductItem;
