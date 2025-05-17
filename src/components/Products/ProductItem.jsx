import { useContext } from "react";
import Button from "../UI/Button";

import "./ProductItem.css";
import { CartContext } from "../../context/CartContext";

function ProductItem(props) {
  const { id, image, title, description, price, category, onDeleteItem } =
    props;
  const productItem = { id, image, title, description, price, category };
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-item">
      <div className="product-image">
        <img src={image} alt="Soda" />
      </div>
      <div className="product-info">
        <span className="product-category">{category}</span>
        <b className="product-title line-clamp-1">{title}</b>
        <span className="product-description  line-clamp-2">{description}</span>
        <span className="product-price">{price}₺</span>
        <Button
          color="primary"
          size="sm"
          onClick={() => addToCart(productItem)}
        >
          Sepete Ekle
        </Button>
        <Button color="danger" size="sm" onClick={() => onDeleteItem(id)}>
          Ürünü Sil
        </Button>
      </div>
    </div>
  );
}

export default ProductItem;
