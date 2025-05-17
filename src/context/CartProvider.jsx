import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  const fullName = "Emin Başbayan";

  return (
    <CartContext.Provider value={fullName}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
