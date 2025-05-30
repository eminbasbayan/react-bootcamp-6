import { Moon, ShoppingCart, Sun } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { ThemeContext } from "../../context/ThemeProvider";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md sticky top-0">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">E-Ticaret</div>

        {/* Menü */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Anasayfa
          </Link>
          <Link
            to="/products"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Ürünler
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Hakkımızda
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            İletişim
          </Link>
        </nav>
        <div className="flex gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300  transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {/* Sepet Butonu */}
          <button
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition relative"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart size={20} />
                     {/* Sepet öğe sayısı için küçük rozet */}
          <span className="absolute top-0 right-0 -mt-2 -mr-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
            <span>Sepet</span>
          </button>
 
        </div>
      </div>
    </header>
  );
};

export default Header;
