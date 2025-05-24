import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeContext } from "./context/ThemeProvider";
import Header from "./components/Layout/Header";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ContactPage from "./pages/ContactPage";

function App() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className="app container mx-auto"
      style={{
        backgroundColor: `${darkMode ? "black" : "white"}`,
        color: `${darkMode ? "white" : "black"}`,
      }}
    >
      <ToastContainer />
      <Header />
      <div className="pt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
