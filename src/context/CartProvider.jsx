import { useState } from "react";
import { CartContext } from "./CartContext";
import { Bounce, toast, Zoom } from "react-toastify";

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const fullName = "Emin Başbayan";

  console.log(cartItems);

  // 1, 2, 3, 4, 5
  function addToCart(productItem) {
    const findCartItem = cartItems.find((item) => item.id === productItem.id);

    if (findCartItem) {
      setCartItems((prevCartItems) => {
        return prevCartItems.map((item) => {
          if (item.id === findCartItem.id) {
            return { ...findCartItem, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      });
    } else {
      setCartItems((prevState) => [
        { ...productItem, quantity: 1 },
        ...prevState,
      ]);
    }

    toast.success("Ürün sepete eklendi!", {
      position: "bottom-right",
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
