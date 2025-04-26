import ProductItem from "./ProductItem";
import "./Products.css";

function Products() {
  return (
    <div className="products">
      <h1>Products Component</h1>
      <div className="products-wrapper">
        <ProductItem
          image={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREaXGeoatJyRmP9Aa-q4zaqgcUQim3bQHvjg&usqp=CAU"
          }
          title="Soda"
          price={10}
        />
        <ProductItem
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdZRDVij3RuXMIOrulPp9Z7CsEryJV8yeCIg&usqp=CAU"
          title="Tisört"
          price={500}
        />
      </div>
    </div>
  );
}

export default Products;
