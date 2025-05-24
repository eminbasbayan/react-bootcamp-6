import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { toast, Zoom } from 'react-toastify';

// Form doğrulama şeması
const contactSchema = yup.object({
  name: yup.string().required('Ad ve soyad zorunludur'),
  email: yup.string().email('Geçerli bir e-posta girin').required('E-posta zorunludur'),
  subject: yup.string().required('Konu zorunludur'),
  message: yup.string().required('Mesaj zorunludur').min(10, 'Mesaj en az 10 karakter olmalıdır')
});

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(contactSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // API çağrısını simüle ediyoruz
    try {
      // Gerçek uygulamada burada bir API çağrısı yapılacak
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form data:', data);
      
      toast.success('Mesajınız başarıyla gönderildi!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
      
      reset(); // Formu temizle
    } catch (error) {
      toast.error('Mesajınız gönderilirken bir hata oluştu!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">İletişim</h1>
      
      {/* İletişim Bilgileri ve Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* İletişim Bilgileri */}
        <div>
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Bize Ulaşın</h2>
            <p className="text-gray-600 mb-6">
              Sorularınız, önerileriniz veya geri bildirimleriniz için bizimle iletişime geçebilirsiniz.
              Size en kısa sürede dönüş yapacağız.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <MapPin className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Adres</h3>
                  <p className="text-gray-600">Teknoloji Caddesi, No: 42, İstanbul</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Phone className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Telefon</h3>
                  <p className="text-gray-600">+90 (212) 123 45 67</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Mail className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">E-posta</h3>
                  <p className="text-gray-600">info@eticaret.com</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Clock className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Çalışma Saatleri</h3>
                  <p className="text-gray-600">Pazartesi - Cuma: 09:00 - 18:00</p>
                  <p className="text-gray-600">Cumartesi: 10:00 - 14:00</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sosyal Medya */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Sosyal Medyada Biz</h2>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-100 hover:bg-blue-200 p-3 rounded-full transition duration-300">
                <Facebook className="text-blue-600" size={24} />
              </a>
              <a href="#" className="bg-blue-100 hover:bg-blue-200 p-3 rounded-full transition duration-300">
                <Twitter className="text-blue-600" size={24} />
              </a>
              <a href="#" className="bg-blue-100 hover:bg-blue-200 p-3 rounded-full transition duration-300">
                <Instagram className="text-blue-600" size={24} />
              </a>
              <a href="#" className="bg-blue-100 hover:bg-blue-200 p-3 rounded-full transition duration-300">
                <Linkedin className="text-blue-600" size={24} />
              </a>
            </div>
          </div>
        </div>
        
        {/* İletişim Formu */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Mesaj Gönderin</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ad Soyad
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Adınız ve soyadınız"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-posta
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="E-posta adresiniz"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Konu
              </label>
              <input
                type="text"
                {...register("subject")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mesajınızın konusu"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mesaj
              </label>
              <textarea
                {...register("message")}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mesajınızı yazın..."
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Gönderiliyor...' : (
                <>
                  <Send className="mr-2" size={18} />
                  Mesaj Gönder
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      
      {/* Harita */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Konum</h2>
        <div className="rounded-lg overflow-hidden border border-gray-200 h-[400px] bg-gray-100 flex items-center justify-center">
          {/* Gerçek uygulamada buraya Google Maps veya başka bir harita servisi entegre edilebilir */}
          <div className="text-center text-gray-500">
            <MapPin size={48} className="mx-auto mb-2 text-blue-500" />
            <p>E-Ticaret Mağazası Konumu</p>
            <p className="text-sm">Teknoloji Caddesi, No: 42, İstanbul</p>
          </div>
        </div>
      </div>
      
      {/* SSS Bölümü */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Sık Sorulan Sorular</h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="font-medium text-lg mb-2">Siparişim ne zaman kargoya verilir?</h3>
            <p className="text-gray-600">Siparişleriniz genellikle aynı gün içerisinde kargoya verilir ve 1-3 iş günü içerisinde teslim edilir.</p>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="font-medium text-lg mb-2">İade koşulları nelerdir?</h3>
            <p className="text-gray-600">Ürünlerimizi, teslim tarihinden itibaren 14 gün içerisinde herhangi bir sebep belirtmeden iade edebilirsiniz.</p>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="font-medium text-lg mb-2">Kargo ücreti ne kadardır?</h3>
            <p className="text-gray-600">100₺ üzeri alışverişlerde kargo ücretsizdir. 100₺ altındaki siparişlerde kargo ücreti 15₺'dir.</p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Hangi ödeme yöntemlerini kullanabilirim?</h3>
            <p className="text-gray-600">Kredi kartı, havale, EFT ve kapıda ödeme seçeneklerimiz mevcuttur. Tüm kredi kartlarına taksit imkanı sunulmaktadır.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;