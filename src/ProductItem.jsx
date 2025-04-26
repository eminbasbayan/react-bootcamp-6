function ProductItem() {
  return (
    <div className="product-item">
      <div className="product-image">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREaXGeoatJyRmP9Aa-q4zaqgcUQim3bQHvjg&usqp=CAU"
          alt="Soda"
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
