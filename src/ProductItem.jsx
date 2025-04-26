const productItemCSS = {
  border: "1px solid red",
  backgroundColor: "black",
  color: "white"
};

const productImageCSS = {
  width: "100px",
};

function ProductItem() {
  return (
    <div className="product-item" style={productItemCSS}>
      <div className="product-image">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREaXGeoatJyRmP9Aa-q4zaqgcUQim3bQHvjg&usqp=CAU"
          alt="Soda"
          style={productImageCSS}
        />
      </div>
      <div className="product-info">
        <b className="product-title">Soda</b>
        <span className="product-price">4₺</span>
      </div>
    </div>
  );
}

export default ProductItem;
