import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/Auth/RegisterForm';
import { ShoppingBag, ShieldCheck } from 'lucide-react';

const RegisterPage = () => {
  return (
    <div className="register-page min-h-[80vh] py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Sol Taraf - Tanıtım Alanı */}
        <div className="bg-gradient-to-br from-green-600 to-blue-700 p-8 text-white flex flex-col relative hidden md:flex">
          <div className="flex items-center mb-6">
            <ShoppingBag size={32} />
            <span className="text-2xl font-bold ml-2">E-Ticaret</span>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">Aramıza Katılın!</h2>
          <p className="mb-6">
            Hesabınızı oluşturarak e-ticaret deneyiminizi kişiselleştirin. 
            Hemen üye olun ve avantajlı alışveriş dünyasına adım atın.
          </p>
          
          <div className="mt-auto">
            <h3 className="text-xl font-bold mb-3">Üyelik Avantajları</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="bg-green-500 rounded-full p-1 mr-2">✓</div>
                İlk siparişinize özel %10 indirim
              </li>
              <li className="flex items-center">
                <div className="bg-green-500 rounded-full p-1 mr-2">✓</div>
                Özel kampanyalardan öncelikli haberdar olma
              </li>
              <li className="flex items-center">
                <div className="bg-green-500 rounded-full p-1 mr-2">✓</div>
                Sipariş geçmişi ve favoriler listesi
              </li>
              <li className="flex items-center">
                <div className="bg-green-500 rounded-full p-1 mr-2">✓</div>
                Hızlı ödeme ve adres kaydetme
              </li>
            </ul>
          </div>
          
          <div className="absolute bottom-6 right-6 opacity-20">
            <ShieldCheck size={120} />
          </div>
        </div>
        
        {/* Sağ Taraf - Form Alanı */}
        <div className="p-8">
          <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">
            Hesap Oluştur
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Bilgilerinizi girerek hemen üye olun
          </p>
          
          <RegisterForm />
          
          <div className="mt-6 text-center text-gray-600">
            Zaten hesabınız var mı?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Giriş yapın
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
