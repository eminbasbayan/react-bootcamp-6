import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Products from "../components/Products/Products";
import { ShoppingBag, Truck, CreditCard, Headphones } from "lucide-react";

import { fetchProducts } from "../redux/productSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  console.log("products:", products);
  console.log("loading:", loading);
  console.log("error:", error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="home-page container mx-auto py-6 px-4">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl p-8 mb-10 shadow-lg">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            En İyi Ürünler En Uygun Fiyatlarla
          </h1>
          <p className="text-lg mb-6">
            Elektronikten giyime, ev eşyalarından aksesuarlara kadar binlerce
            ürün sizleri bekliyor. Hemen alışverişe başlayın!
          </p>
          <button className="bg-white text-blue-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition">
            Hemen Alışverişe Başla
          </button>
        </div>
      </div>

      {/* Özellikler Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
          <ShoppingBag className="text-blue-600 mb-3" size={32} />
          <h3 className="font-bold text-lg mb-2">Geniş Ürün Yelpazesi</h3>
          <p className="text-gray-600">
            Binlerce ürün kategorisiyle ihtiyacınız olan her şey tek bir yerde.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
          <Truck className="text-blue-600 mb-3" size={32} />
          <h3 className="font-bold text-lg mb-2">Hızlı Teslimat</h3>
          <p className="text-gray-600">
            Siparişleriniz aynı gün kargoya verilir ve en hızlı şekilde size
            ulaştırılır.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
          <CreditCard className="text-blue-600 mb-3" size={32} />
          <h3 className="font-bold text-lg mb-2">Güvenli Ödeme</h3>
          <p className="text-gray-600">
            Kredi kartı, havale ve kapıda ödeme seçenekleriyle güvenli alışveriş
            yapın.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
          <Headphones className="text-blue-600 mb-3" size={32} />
          <h3 className="font-bold text-lg mb-2">7/24 Destek</h3>
          <p className="text-gray-600">
            Sorularınız için müşteri hizmetlerimiz her zaman yanınızda.
          </p>
        </div>
      </div>

      {/* Öne Çıkan Ürünler Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-6">Öne Çıkan Ürünler</h2>
        <div className="border-b border-gray-200 mb-6"></div>
        <Products />
      </div>

      {/* Kampanyalar Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold mb-2">
            Elektronik Ürünlerde %20 İndirim
          </h3>
          <p className="mb-4">Sınırlı süreyle geçerli fırsatları kaçırmayın!</p>
          <button className="bg-white text-purple-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition">
            Detaylar
          </button>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold mb-2">
            100₺ Üzeri Alışverişlerde Kargo Bedava
          </h3>
          <p className="mb-4">
            Fırsattan yararlanmak için hemen alışverişe başlayın.
          </p>
          <button className="bg-white text-green-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition">
            Alışverişe Başla
          </button>
        </div>
      </div>

      {/* Hakkımızda Kısa Bilgi */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Türkiye'nin En Güvenilir Online Alışveriş Sitesi
        </h2>
        <p className="text-gray-700 mb-3">
          2023 yılında kurulan E-Ticaret sitemiz, müşterilerimize en kaliteli
          ürünleri en uygun fiyatlarla sunmayı amaçlıyor. Müşteri memnuniyetini
          her zaman ön planda tutarak, güvenilir alışveriş deneyimi sunmayı ilke
          ediniyoruz.
        </p>
        <p className="text-gray-700">
          Hızlı teslimat, kolay iade ve 7/24 müşteri desteği ile her zaman
          yanınızdayız.
        </p>
      </div>

      {/* Üyelik Çağrısı */}
      <div className="bg-blue-100 rounded-xl p-8 text-center mb-6">
        <h3 className="text-2xl font-bold mb-3 text-blue-800">
          Hemen Üye Ol, Fırsatları Kaçırma!
        </h3>
        <p className="mb-6 text-blue-700">
          İlk alışverişinize özel %10 indirim ve düzenli kampanya
          bilgilendirmeleri için üye olun.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <input
            type="email"
            className="px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E-posta adresiniz"
          />
          <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            Üye Ol
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
