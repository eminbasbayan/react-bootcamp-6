import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/auth/registerSchema";
import { Eye, EyeOff, UserPlus, Mail, User, Phone, Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import { registerUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const result = await registerUser(data);
      
      if (result.success) {
        toast.success(result.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored"
        });
        
        reset(); // Formu temizle
        
        // Başarılı kayıttan sonra login sayfasına yönlendir
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        
      } else {
        toast.error(result.error, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored"
        });
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Ad Soyad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ad Soyad
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              className={`w-full pl-10 pr-4 py-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              {...register("fullName")}
              placeholder="Ad ve soyadınız"
              disabled={isSubmitting}
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>
        
        {/* E-posta */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-posta
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail size={18} className="text-gray-500" />
            </div>
            <input
              type="email"
              className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              {...register("email")}
              placeholder="ornek@email.com"
              disabled={isSubmitting}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        
        {/* Telefon */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefon
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Phone size={18} className="text-gray-500" />
            </div>
            <input
              type="tel"
              className={`w-full pl-10 pr-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              {...register("phone")}
              placeholder="5XX XXX XX XX"
              disabled={isSubmitting}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>
        
        {/* Şifre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Şifre
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full pr-10 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              {...register("password")}
              placeholder="Güçlü bir şifre girin"
              disabled={isSubmitting}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        
        {/* Şifre Tekrar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Şifre Tekrar
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className={`w-full pr-10 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              {...register("confirmPassword")}
              placeholder="Şifrenizi tekrar girin"
              disabled={isSubmitting}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition-colors"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isSubmitting}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        
        {/* Kullanım Şartları */}
        <div className="flex items-start mt-4">
          <input
            type="checkbox"
            id="terms"
            className="h-4 w-4 mt-1 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            {...register("terms")}
            disabled={isSubmitting}
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
            <span className={errors.terms ? "text-red-500" : ""}>
              Kullanım şartlarını ve gizlilik politikasını kabul ediyorum
            </span>
          </label>
        </div>
        {errors.terms && (
          <p className="mt-1 text-sm text-red-500">
            {errors.terms.message}
          </p>
        )}
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSubmitting ? (
            <>
              <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
              Kaydediliyor...
            </>
          ) : (
            <>
              <UserPlus className="-ml-1 mr-3 h-5 w-5" />
              Hesap Oluştur
            </>
          )}
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
