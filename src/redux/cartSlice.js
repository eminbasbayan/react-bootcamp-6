import { createSlice } from "@reduxjs/toolkit";
import { toast, Zoom } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, { payload: productItem }) => {
      const findCartItem = state.cartItems.find(
        (item) => item.id === productItem.id
      );

      if (findCartItem) {
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === findCartItem.id) {
            return { ...findCartItem, quantity: findCartItem.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        state.cartItems = [...state.cartItems, { ...productItem, quantity: 1 }];
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
    },
    removeFromCart: (state, { payload: productId }) => {
      const filteredCartItems = state.cartItems.filter(
        (item) => item.id !== productId
      );

      state.cartItems = filteredCartItems;

      toast.success("Ürün sepetten silindi!", {
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
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
