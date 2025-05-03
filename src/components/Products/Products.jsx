import { useState } from "react";
import AddProduct from "./AddProduct";
import ProductItem from "./ProductItem";
import { productsData } from "../../data/productsData";
import "./Products.css";

function Products() {
 const [globalTitle, setGlobalTitle] = useState("");

  return (
    <div className="products">
      <h1>Products Component</h1>
      <AddProduct />
      <div className="products-wrapper">
        {productsData.map((product) => (
          <ProductItem
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            globalTitle={globalTitle}
            setGlobalTitle={setGlobalTitle}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
