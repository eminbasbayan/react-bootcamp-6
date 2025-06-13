import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 text-center">
        {/* Icon ve Başlık */}
        <div className="relative">
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto">
            <ShieldAlert className="w-16 h-16 sm:w-20 sm:h-20 text-red-600" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Yetkisiz Erişim
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Bu sayfaya erişmek için gerekli yetkilere sahip değilsiniz. 
            Lütfen yöneticinizle iletişime geçin.
          </p>
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
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Geri Dön
          </button>
        </div>

        <div className="pt-8 text-sm text-gray-500">
          <p>
            Sorun devam ederse{' '}
            <Link 
              to="/contact" 
              className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
            >
              destek ekibiyle iletişime geçin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized; 