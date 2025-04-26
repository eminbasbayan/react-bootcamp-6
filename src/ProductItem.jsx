import "./ProductItem.css";

function ProductItem() {
  const image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREaXGeoatJyRmP9Aa-q4zaqgcUQim3bQHvjg&usqp=CAU";
  const title = "Soda";
  const price = 10;

  return (
    <div className="product-item">
      <div className="product-image">
        <img src={image} alt="Soda" />
      </div>
      <div className="product-info">
        <b className="product-title">{title}</b>
        <span className="product-price">{price}₺</span>
      </div>
    </div>
  );
}

export default ProductItem;
