import { useState } from "react";
import AddProduct from "./AddProduct";
import ProductItem from "./ProductItem";
import Modal from "../UI/Modal";

import { productsData } from "../../data/productsData";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState(productsData);
  const [isShowModal, setIsShowModal] = useState(false);

  function handleDeleteItem(productId) {
    const filteredProducts = products.filter((item) => item.id !== productId);
    setProducts(filteredProducts);
  }

  return (
    <div className="products">
      <h1 className="text-2xl font-bold">Products Component</h1>
      <AddProduct setProducts={setProducts} setIsShowModal={setIsShowModal} />
      {isShowModal && (
        <Modal
          setIsShowModal={setIsShowModal}
          title="Bu bir title örneğidir"
          desc="Bu bir modal içerik örneğidir."
        />
      )}
      <div className="products-wrapper">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            description={product.description}
            category={product.category}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
