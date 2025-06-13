import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader } from 'lucide-react';

const ProtectedRoute = ({ 
  children, 
  requireAuth = true,
  requireEmailVerification = false,
  requirePermission = null,
  redirectTo = '/login'
}) => {
  const { user, loading, isAuthenticated, isEmailVerified, hasPermission } = useAuth();
  const location = useLocation();

  // Loading durumunda spinner göster
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin w-8 h-8 mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Giriş gerekli ama kullanıcı giriş yapmamış
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Kullanıcı aktif değil
  if (isAuthenticated && !user?.isActive) {
    return <Navigate to="/account-suspended" replace />;
  }

  // Email doğrulama gerekli ama doğrulanmamış
  if (requireEmailVerification && !isEmailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  // Özel yetki gerekli ama kullanıcıda yok
  if (requirePermission && !hasPermission(requirePermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute; 