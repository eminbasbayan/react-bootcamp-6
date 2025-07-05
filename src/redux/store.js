import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    product: productReducer,
  },
});

export default store;
