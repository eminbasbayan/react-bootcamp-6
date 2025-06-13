import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, RefreshCw } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 text-center">
        {/* 404 Büyük Numara */}
        <div className="relative">
          <h1 className="text-9xl sm:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-full shadow-lg flex items-center justify-center">
              <Search className="w-16 h-16 sm:w-20 sm:h-20 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Başlık ve Açıklama */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Sayfa Bulunamadı
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Aradığınız sayfa silinmiş, taşınmış veya hiç var olmamış olabilir. 
            Lütfen URL'yi kontrol edin veya ana sayfaya dönün.
          </p>
        </div>

        {/* Öneriler */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ne yapabilirsiniz?
          </h3>
          <ul className="text-left space-y-3 text-gray-600">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              URL'yi doğru yazdığınızdan emin olun
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              Tarayıcınızı yenileyin
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              Ana sayfadan tekrar deneyin
            </li>
          </ul>
        </div>

        {/* Aksiyon Butonları */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Ana Sayfaya Dön
          </Link>
          
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Geri Dön
          </button>
        </div>

        {/* Yenile Butonu */}
        <div className="pt-4">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 group"
          >
            <RefreshCw className="w-4 h-4 mr-1 group-hover:rotate-180 transition-transform duration-300" />
            Sayfayı Yenile
          </button>
        </div>

        {/* Alt Bilgi */}
        <div className="pt-8 text-sm text-gray-500">
          <p>
            Sorun devam ederse{' '}
            <Link 
              to="/contact" 
              className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
            >
              bizimle iletişime geçin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;