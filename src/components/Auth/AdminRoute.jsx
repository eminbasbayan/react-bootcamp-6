import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader, ShieldAlert } from 'lucide-react';

const AdminRoute = ({ children, requireSuperAdmin = false }) => {
  const { user, loading, isAuthenticated, isAdmin, userRole } = useAuth();
  const location = useLocation();

  // Loading durumunda spinner göster
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader className="animate-spin w-10 h-10 mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 text-lg">Admin paneli yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Giriş yapılmamış
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Email doğrulanmamış
  if (!user?.emailVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <ShieldAlert className="w-16 h-16 mx-auto mb-4 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Doğrulama Gerekli</h2>
          <p className="text-gray-600 mb-6">
            Admin paneline erişmek için önce e-posta adresinizi doğrulamanız gerekiyor.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  // Admin değil
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <ShieldAlert className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Yetkisiz Erişim</h2>
          <p className="text-gray-600 mb-6">
            Bu sayfaya erişmek için admin yetkilerine sahip olmanız gerekiyor.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  // Super admin gerekli ama kullanıcı normal admin
  if (requireSuperAdmin && userRole !== 'super_admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <ShieldAlert className="w-16 h-16 mx-auto mb-4 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Süper Admin Gerekli</h2>
          <p className="text-gray-600 mb-6">
            Bu sayfaya erişmek için süper admin yetkilerine sahip olmanız gerekiyor.
          </p>
          <button
            onClick={() => window.location.href = '/admin'}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Admin Paneline Dön
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute; 