import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import { ShoppingBag } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="login-page min-h-[80vh] py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Sol Taraf - Tanıtım Alanı */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white flex flex-col relative hidden md:flex">
          <div className="flex items-center mb-6">
            <ShoppingBag size={32} />
            <span className="text-2xl font-bold ml-2">E-Ticaret</span>
          </div>

          <h2 className="text-3xl font-bold mb-4">Hoş Geldiniz!</h2>
          <p className="mb-6">
            Hesabınıza giriş yaparak özel fırsatlardan yararlanabilir,
            siparişlerinizi takip edebilir ve daha fazlasını yapabilirsiniz.
          </p>

          <div className="mt-auto">
            <h3 className="text-xl font-bold mb-3">Avantajlar</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="bg-blue-500 rounded-full p-1 mr-2">✓</div>
                Özel indirimler ve kampanyalar
              </li>
              <li className="flex items-center">
                <div className="bg-blue-500 rounded-full p-1 mr-2">✓</div>
                Hızlı ödeme seçenekleri
              </li>
              <li className="flex items-center">
                <div className="bg-blue-500 rounded-full p-1 mr-2">✓</div>
                Sipariş takibi ve geçmiş
              </li>
            </ul>
          </div>

          <div className="absolute bottom-6 right-6 opacity-20">
            <ShoppingBag size={120} />
          </div>
        </div>

        {/* Sağ Taraf - Form Alanı */}
        <div className="p-8">
          <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">
            Giriş Yap
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Hesabınıza erişmek için bilgilerinizi girin
          </p>

          <LoginForm />

          <div className="mt-6 text-center text-gray-600">
            Hesabınız yok mu?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Hemen kayıt olun
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
