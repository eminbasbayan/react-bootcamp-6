import { Moon, ShoppingCart, Sun, User, LogOut, UserPlus, LogIn, Mail, MailCheck, Settings } from "lucide-react";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { ThemeContext } from "../../context/ThemeProvider";
import { useAuth } from "../../context/AuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoutUser, resendEmailVerification, checkEmailVerification } from "../../services/authService";
import { toast } from 'react-toastify';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { user, isAuthenticated, isEmailVerified, isAdmin, userRole } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await logoutUser();
      if (result.success) {
        toast.success('Başarıyla çıkış yaptınız!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored"
        });
        setShowUserMenu(false);
        navigate('/');
      } else {
        toast.error('Çıkış yaparken bir hata oluştu.', {
          position: "bottom-right",
          autoClose: 3000,
          theme: "colored"
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Beklenmeyen bir hata oluştu.', {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored"
      });
    }
  };

  const handleResendVerification = async () => {
    try {
      const result = await resendEmailVerification();
      if (result.success) {
        toast.success(result.message, {
          position: "bottom-right",
          autoClose: 5000,
          theme: "colored"
        });
      } else {
        toast.error(result.error, {
          position: "bottom-right",
          autoClose: 3000,
          theme: "colored"
        });
      }
    } catch (error) {
      toast.error('Doğrulama e-postası gönderilemedi.', {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored"
      });
    }
  };

  const handleCheckVerification = async () => {
    try {
      const result = await checkEmailVerification();
      if (result.success && result.emailVerified) {
        toast.success('E-postanız doğrulandı!', {
          position: "bottom-right",
          autoClose: 3000,
          theme: "colored"
        });
      } else {
        toast.info('E-posta henüz doğrulanmamış.', {
          position: "bottom-right",
          autoClose: 3000,
          theme: "colored"
        });
      }
    } catch (error) {
      toast.error('Doğrulama durumu kontrol edilemedi.', {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored"
      });
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
          E-Ticaret
        </Link>

        {/* Menü */}
        <nav className="hidden md:flex space-x-6">
          <NavLink 
            to="/" 
            className={({isActive})=> isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600 transition"}
          >
            Anasayfa
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600 transition"
            }
          >
            Ürünler
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600 transition"
            }
          >
            Hakkımızda
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600 transition"
            }
          >
            İletişim
          </NavLink>
          
          {/* Admin Link - Sadece adminler için */}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? "text-red-600 font-semibold" : "text-red-600 hover:text-red-700 transition"
              }
            >
              Admin Panel
            </NavLink>
          )}
        </nav>

        {/* Sağ Taraf - Butonlar */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            title={darkMode ? 'Açık tema' : 'Koyu tema'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Sepet Butonu */}
          <button
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors relative"
            onClick={() => navigate("/cart")}
            title="Sepeti Görüntüle"
          >
            <ShoppingCart size={20} />
            <span className="hidden sm:block">Sepet</span>
            {/* Sepet öğe sayısı için küçük rozet */}
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Kullanıcı Menüsü */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Kullanıcı Menüsü"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center relative">
                  <span className="text-white text-sm font-semibold">
                    {user?.displayName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                  {/* Role Badge */}
                  {isAdmin && (
                    <div className="absolute -top-1 -left-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <Settings size={8} className="text-white" />
                    </div>
                  )}
                  {/* Email doğrulama durumu göstergesi */}
                  {isEmailVerified ? (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <MailCheck size={10} className="text-white" />
                    </div>
                  ) : (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                      <Mail size={10} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <span className="text-sm font-medium text-gray-700 block">
                    {user?.displayName || 'Kullanıcı'}
                  </span>
                  {isAdmin && (
                    <span className="text-xs text-red-600 capitalize">
                      {userRole === 'super_admin' ? 'Süper Admin' : 'Admin'}
                    </span>
                  )}
                </div>
              </button>

              {/* Dropdown Menü */}
              {showUserMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center relative">
                          <span className="text-white font-semibold">
                            {user?.displayName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                          </span>
                          {isAdmin && (
                            <div className="absolute -top-1 -left-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                              <Settings size={10} className="text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {user?.displayName || 'Kullanıcı'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user?.email}
                          </p>
                          {isAdmin && (
                            <span className="inline-block mt-1 px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full capitalize">
                              {userRole === 'super_admin' ? 'Süper Admin' : 'Admin'}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Email doğrulama durumu */}
                      {isEmailVerified ? (
                        <div className="flex items-center mt-3 text-xs text-green-600">
                          <MailCheck size={12} className="mr-1" />
                          E-posta doğrulandı
                        </div>
                      ) : (
                        <div className="mt-3">
                          <div className="flex items-center text-xs text-orange-600 mb-2">
                            <Mail size={12} className="mr-1" />
                            E-posta doğrulanmadı
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={handleCheckVerification}
                              className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                            >
                              Kontrol Et
                            </button>
                            <button
                              onClick={handleResendVerification}
                              className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded hover:bg-orange-200 transition-colors"
                            >
                              Yeniden Gönder
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          navigate('/profile');
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <User size={16} className="mr-3" />
                        Profil
                      </button>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          navigate('/orders');
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <ShoppingCart size={16} className="mr-3" />
                        Siparişlerim
                      </button>
                      
                      {/* Admin Panel Linki */}
                      {isAdmin && (
                        <>
                          <hr className="my-1" />
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              navigate('/admin');
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Settings size={16} className="mr-3" />
                            Admin Panel
                          </button>
                        </>
                      )}
                      
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} className="mr-3" />
                        Çıkış Yap
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            // Giriş yapmamış kullanıcılar için
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Giriş Yap"
              >
                <LogIn size={18} />
                <span className="hidden sm:block text-sm font-medium">Giriş</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                title="Kayıt Ol"
              >
                <UserPlus size={18} />
                <span className="hidden sm:block text-sm font-medium">Kayıt</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
