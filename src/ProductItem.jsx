import "./ProductItem.css";

function ProductItem(props) {
  console.log(props);
  console.log(props.image);
  console.log(props.price);
  console.log(props.title);
  
  return (
    <div className="product-item">
      <div className="product-image">
        <img src={props.image} alt="Soda" />
      </div>
      <div className="product-info">
        <b className="product-title">{props.title}</b>
        <span className="product-price">{props.price}₺</span>
      </div>
    </div>
  );
}

export default ProductItem;
