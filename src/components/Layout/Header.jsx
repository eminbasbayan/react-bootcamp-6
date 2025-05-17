import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  
  return (
    <header className="bg-white shadow-md sticky top-0">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">E-Ticaret</div>

        {/* Menü */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-blue-600 transition">
            Anasayfa
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition">
            Ürünler
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition">
            Hakkımızda
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition">
            İletişim
          </a>
        </nav>

        {/* Sepet Butonu */}
        <div className="relative">
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
            <ShoppingCart size={20} />
            <span>Sepet</span>
          </button>
          {/* Sepet öğe sayısı için küçük rozet */}
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
