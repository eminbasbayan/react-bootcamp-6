import Button from "../UI/Button";

import "./ProductItem.css";

function ProductItem(props) {
  const { id, image, title, description, price, category, onDeleteItem } = props;

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
        <Button color="danger" size="sm" onClick={()=> onDeleteItem(id)}>
          Ürünü Sil
        </Button>
      </div>
    </div>
  );
}

export default ProductItem;
