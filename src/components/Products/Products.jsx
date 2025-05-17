import { useEffect, useReducer } from "react";
import AddProduct from "./AddProduct";
import ProductItem from "./ProductItem";
import Modal from "../UI/Modal";

import { reducerFunction, initialState } from "./productReducer";
import "./Products.css";

function Products({ addToCart }) {
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  function handleDeleteItem(productId) {
    dispatch({ type: "DELETE_PRODUCT", payload: productId });
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        dispatch({ type: "SET_PRODUCT", payload: data });
      } catch (err) {
        console.log(err);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="products">
      <h1 className="text-2xl font-bold">Products Component</h1>
      <AddProduct
        setProducts={(newProduct) =>
          dispatch({ type: "ADD_PRODUCT", payload: newProduct })
        }
        setIsShowModal={() => dispatch({ type: "SHOW_MODAL" })}
      />
      {state.isShowModal && (
        <Modal
          setIsShowModal={() => dispatch({ type: "HIDE_MODAL" })}
          title="Bu bir title örneğidir"
          desc="Bu bir modal içerik örneğidir."
        />
      )}
      {state.isLoading && <p>Ürünler yükleniyor...</p>}
      <div className="products-wrapper">
        {state.products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            description={product.description}
            category={product.category}
            onDeleteItem={handleDeleteItem}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
