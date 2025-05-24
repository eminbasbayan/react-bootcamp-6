import { useState } from "react";
import { CartContext } from "./CartContext";
import { Bounce, toast, Zoom } from "react-toastify";

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const fullName = "Emin Başbayan";

  function addToCart(productItem) {
    setCartItems((prevState) => [productItem, ...prevState]);
    toast.success("Ürün sepete eklendi!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  }

  return (
    <CartContext.Provider
      value={{
        fullName,
        addToCart,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
