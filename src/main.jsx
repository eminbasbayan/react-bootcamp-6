import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import CartProvider from "./context/CartProvider";
import ThemeProvider from "./context/ThemeProvider";
import { AuthProvider } from './context/AuthContext';

import store from "./redux/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <CartProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CartProvider>
    </ThemeProvider>
  </Provider>
);
