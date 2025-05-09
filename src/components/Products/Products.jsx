import { useState } from "react";
import AddProduct from "./AddProduct";
import ProductItem from "./ProductItem";
import Modal from "../UI/Modal";

import { productsData } from "../../data/productsData";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState(productsData);
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <div className="products">
      <h1>Products Component</h1>
      <AddProduct setProducts={setProducts} setIsShowModal={setIsShowModal} />
      {isShowModal && <Modal setIsShowModal={setIsShowModal} />}
      <div className="products-wrapper">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
