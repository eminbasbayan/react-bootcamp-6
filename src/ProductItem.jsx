import "./ProductItem.css";

function ProductItem(props) {
  const { image, globalTitle, setGlobalTitle, title, price } = props;

  console.log(props);

  function handleTitleChange() {
    setGlobalTitle("Yüzük");
  }

  console.log("component render edildi!");

  return (
    <div className="product-item">
      <div className="product-image">
        <img src={image} alt="Soda" />
      </div>
      <div className="product-info">
        <b className="product-title">
          {globalTitle !== "" ? globalTitle : title}
        </b>
        <span className="product-price">{price}₺</span>
        <button onClick={handleTitleChange}>Title Değiştir!</button>
      </div>
    </div>
  );
}

export default ProductItem;
