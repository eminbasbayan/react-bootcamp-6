import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import ProductItem from "./ProductItem";
import Modal from "../UI/Modal";

import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function handleDeleteItem(productId) {
    const filteredProducts = products.filter((item) => item.id !== productId);
    setProducts(filteredProducts);
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        setProducts(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

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
      {isLoading && <p>Ürünler yükleniyor...</p>}
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
