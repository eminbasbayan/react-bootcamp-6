import { useState } from "react";
import "./ProductItem.css";
import Button from "../UI/Button";

function ProductItem(props) {
  const { image, title, price } = props;
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
