import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../schemas/auth/loginSchema';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Facebook, LogIn, Mail, Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/authService';

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const result = await loginUser(data.email, data.password);

      if (result.success) {
        toast.success('Başarıyla giriş yaptınız!', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });

        reset(); // Formu temizle

        navigate('/');
      } else {
        toast.error(result.error, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
              className={`w-full pl-10 pr-4 py-3 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              {...register('email')}
              placeholder="ornek@email.com"
              disabled={isSubmitting}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Şifre
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-blue-600 hover:underline"
            >
              Şifremi unuttum
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`w-full pr-10 py-3 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              {...register('password')}
              placeholder="Şifreniz"
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

        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember-me"
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            disabled={isSubmitting}
          />
          <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
            Beni hatırla
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSubmitting ? (
            <>
              <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Giriş Yapılıyor...
            </>
          ) : (
            <>
              <LogIn size={18} className="mr-2" />
              Giriş Yap
            </>
          )}
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">veya</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <button
          className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white py-2.5 px-4 rounded-lg hover:bg-[#166FE5] transition duration-300 disabled:opacity-50"
          disabled={isSubmitting}
        >
          <Facebook size={20} />
          Facebook ile giriş yap
        </button>
        <button
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50 transition duration-300 disabled:opacity-50"
          disabled={isSubmitting}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
            />
            <path
              fill="#34A853"
              d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970244 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
            />
            <path
              fill="#4A90E2"
              d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.7272727 L18.4363636,14.7272727 C18.1187732,16.6574066 17.2662994,18.2921832 16.0407269,19.0125889 L19.834192,20.9995801 Z"
            />
            <path
              fill="#FBBC05"
              d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
            />
          </svg>
          Google ile giriş yap
        </button>
      </div>
    </>
  );
};

export default LoginForm;
