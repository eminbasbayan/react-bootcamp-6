import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  ShoppingBag,
  Star,
  ChevronLeft,
  Truck,
  RefreshCw,
  Shield,
  Heart,
  Share2,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";
import { addToCart } from "../redux/cartSlice";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Simulating an API call with timeout
    setLoading(true);

    // Find product by ID from productsData

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // Add product to cart with selected quantity
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Ürün bulunamadı</h1>
        <p className="text-gray-600 mb-6">
          Aradığınız ürün mevcut değil veya kaldırılmış olabilir.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Tüm Ürünlere Dön
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-page container mx-auto py-6 px-4">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-600 transition">
          Anasayfa
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <Link to="/products" className="hover:text-blue-600 transition">
          Ürünler
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <Link
          to={`/products?category=${product.category}`}
          className="hover:text-blue-600 transition"
        >
          {product.category}
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-700 font-medium truncate">
          {product.title}
        </span>
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition group"
      >
        <ChevronLeft
          size={20}
          className="mr-1 group-hover:-translate-x-1 transition-transform"
        />
        Geri Dön
      </button>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Product Images */}
        <div className="product-images">
          <div className="bg-white p-4 rounded-xl shadow-md mb-4 overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[400px] object-contain transition-transform hover:scale-105"
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`
                  bg-white p-2 rounded-lg shadow-sm cursor-pointer border-2 
                  ${
                    selectedImage === index
                      ? "border-blue-600"
                      : "border-transparent"
                  }
                `}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={product.image}
                  alt={`${product.title}-${index}`}
                  className="h-16 w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="mb-4">
            <span className="text-sm font-semibold uppercase text-blue-600">
              {product.category}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {product.title}
          </h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              <Star className="text-yellow-400 fill-yellow-400" size={20} />
              <span className="ml-1 font-medium">
                {product.rating?.rate || "4.5"}
              </span>
            </div>
            <span className="text-gray-500">
              ({product.rating?.count || "120"} değerlendirme)
            </span>
          </div>

          <div className="text-3xl font-bold text-gray-900 mb-6">
            {product.price.toFixed(2)}₺
            <span className="text-sm text-gray-500 line-through ml-2">
              {(product.price * 1.2).toFixed(2)}₺
            </span>
            <span className="text-sm text-green-600 ml-2">%20 İndirim</span>
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  className="px-3 py-2 text-gray-600 hover:text-blue-600 transition"
                  onClick={decrementQuantity}
                >
                  <Minus size={18} />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  className="px-3 py-2 text-gray-600 hover:text-blue-600 transition"
                  onClick={incrementQuantity}
                >
                  <Plus size={18} />
                </button>
              </div>
              <button
                onClick={() => handleAddToCart()}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                <ShoppingBag size={20} className="mr-2" />
                Sepete Ekle
              </button>
              <button className="p-3 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition">
                <Heart size={20} />
              </button>
              <button className="p-3 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start">
                <Truck className="text-blue-600 mt-1" size={20} />
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">Ücretsiz Kargo</h3>
                  <p className="text-sm text-gray-500">
                    100₺ üzeri siparişlerde
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <RefreshCw className="text-blue-600 mt-1" size={20} />
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">14 Gün İade</h3>
                  <p className="text-sm text-gray-500">Kolay iade imkanı</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="text-blue-600 mt-1" size={20} />
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">Güvenli Ödeme</h3>
                  <p className="text-sm text-gray-500">
                    Şifrelenmiş ödeme sistemi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-12">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 font-medium text-sm border-b-2 ${
                activeTab === "description"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Ürün Detayları
            </button>
            <button
              className={`py-4 px-1 font-medium text-sm border-b-2 ${
                activeTab === "specifications"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("specifications")}
            >
              Teknik Özellikler
            </button>
            <button
              className={`py-4 px-1 font-medium text-sm border-b-2 ${
                activeTab === "reviews"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Değerlendirmeler ({product.rating?.count || "120"})
            </button>
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <p className="text-gray-700">{product.description}</p>
              <p className="text-gray-700 mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                quam velit, vulputate eu pharetra nec, mattis ac neque. Duis
                vulputate commodo lectus, ac blandit elit tincidunt id. Sed
                rhoncus, tortor sed eleifend tristique, tortor mauris molestie
                elit, et lacinia ipsum quam nec dui.
              </p>
              <p className="text-gray-700 mt-4">
                Quisque nec nisi tortor. Etiam at mauris sit amet magna suscipit
                hend rerit non sed ligula. Vivamus purus odio, mollis ut
                sagittis vel, feugiat et nulla. Aenean id felis sed ligula
                varius scelerisque.
              </p>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/4">
                      Kategori
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {product.category}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                      Marka
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      Premium {product.category}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                      Malzeme
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      Yüksek Kalite
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                      Boyutlar
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      22cm x 14cm x 5cm
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                      Ağırlık
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      0.5kg
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                      Garanti
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      2 Yıl
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Müşteri Değerlendirmeleri
                  </h3>
                  <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition text-sm">
                    Değerlendirme Yaz
                  </button>
                </div>

                <div className="flex mb-6">
                  <div className="mr-8">
                    <div className="text-5xl font-bold text-gray-900 text-center">
                      {product.rating?.rate || "4.5"}
                    </div>
                    <div className="flex justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={
                            i < Math.floor(product.rating?.rate || 4)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 text-center mt-1">
                      {product.rating?.count || "120"} değerlendirme
                    </div>
                  </div>

                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center mb-2">
                        <div className="w-8 text-sm text-gray-600">
                          {rating}
                        </div>
                        <Star size={16} className="text-yellow-400 mr-2" />
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{
                              width: `${
                                rating === 5
                                  ? 70
                                  : rating === 4
                                  ? 20
                                  : 10 / (6 - rating)
                              }%`,
                            }}
                          ></div>
                        </div>
                        <div className="w-12 text-xs text-gray-500 text-right ml-2">
                          {rating === 5
                            ? 70
                            : rating === 4
                            ? 20
                            : 10 / (6 - rating)}
                          %
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="py-6">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-100 text-blue-800 font-semibold rounded-full w-10 h-10 flex items-center justify-center">
                          {["AK", "BY", "CD"][index]}
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium text-gray-900">
                            {["Ahmet K.", "Burak Y.", "Ceren D."][index]}
                          </h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <time dateTime="2023-01-15">
                              {
                                [
                                  "15 Ocak 2023",
                                  "3 Mart 2023",
                                  "22 Nisan 2023",
                                ][index]
                              }
                            </time>
                          </div>
                        </div>
                      </div>

                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < [5, 4, 5][index]
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>

                      <p className="text-gray-700">
                        {
                          [
                            "Çok güzel bir ürün, beklediğimden daha kaliteli çıktı. Hızlı kargo için de teşekkürler.",
                            "Fiyatına göre gayet iyi bir ürün. Tavsiye ederim.",
                            "Uzun zamandır kullanıyorum, gayet memnunum. Bu fiyata alınabilecek en iyi ürünlerden.",
                          ][index]
                        }
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button className="text-blue-600 font-medium hover:text-blue-800 transition text-sm">
                    Daha fazla değerlendirme göster
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Benzer Ürünler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <Link to={`/products/${relatedProduct.id}`}>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="w-full h-full object-contain p-4 transition-transform hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/products/${relatedProduct.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-blue-600 transition">
                      {relatedProduct.title}
                    </h3>
                  </Link>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star
                        size={14}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      <span className="ml-1 text-sm text-gray-700">
                        {relatedProduct.rating?.rate || "4.5"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">
                      {relatedProduct.price.toFixed(2)}₺
                    </span>
                    <button
                      onClick={() => dispatch(addToCart(relatedProduct))}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
