import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-page container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Hakkımızda</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Biz Kimiz?</h2>
        <p className="mb-4">
          2023 yılında kurulan E-Ticaret sitemiz, müşterilerimize en kaliteli ürünleri en uygun fiyatlarla 
          sunmayı amaçlıyor. Elektronikten giyime, ev eşyalarından aksesuarlara kadar geniş ürün yelpazemizle 
          tüm ihtiyaçlarınızı karşılamak için buradayız.
        </p>
        <p>
          Müşteri memnuniyetini her zaman ön planda tutarak, güvenilir alışveriş deneyimi sunmayı ilke edindik. 
          Hızlı teslimat, kolay iade ve 7/24 müşteri desteği ile her zaman yanınızdayız.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Misyonumuz</h2>
          <p>
            Teknoloji ile geleneksel alışveriş deneyimini bir araya getirerek, 
            müşterilerimize kolay, güvenli ve keyifli bir alışveriş deneyimi sunmak. 
            Her bütçeye uygun kaliteli ürünlerle herkesin hayatına değer katmak.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Vizyonumuz</h2>
          <p>
            Türkiye'nin lider e-ticaret platformu olarak, sektörde öncü uygulamalarla 
            standartları belirleyen, müşteri deneyimini sürekli iyileştiren ve dijital 
            alışveriş kültürüne yön veren bir marka olmak.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Değerlerimiz</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Güvenilirlik:</strong> Müşterilerimize her zaman dürüst ve şeffaf bir alışveriş deneyimi sunuyoruz.</li>
          <li><strong>Kalite:</strong> Sunduğumuz her ürün ve hizmette en yüksek kaliteyi hedefliyoruz.</li>
          <li><strong>İnovasyon:</strong> Teknolojik gelişmeleri takip ederek sürekli kendimizi yeniliyoruz.</li>
          <li><strong>Müşteri Odaklılık:</strong> Müşterilerimizin ihtiyaç ve beklentilerini anlamak ve karşılamak önceliğimizdir.</li>
          <li><strong>Sürdürülebilirlik:</strong> Çevreye duyarlı iş modelleri geliştirerek geleceğe yatırım yapıyoruz.</li>
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">İletişim</h2>
        <p className="mb-4">
          Sorularınız veya önerileriniz için bizimle iletişime geçebilirsiniz:
        </p>
        <ul className="space-y-2">
          <li><strong>Email:</strong> info@eticaret.com</li>
          <li><strong>Telefon:</strong> +90 (212) 123 45 67</li>
          <li><strong>Adres:</strong> Teknoloji Caddesi, No: 42, İstanbul</li>
        </ul>
        <p className="mt-4">
          Sosyal medya hesaplarımızdan da bizi takip edebilirsiniz:
        </p>
        <div className="flex space-x-4 mt-2">
          <a href="#" className="text-blue-600 hover:text-blue-800">Facebook</a>
          <a href="#" className="text-blue-600 hover:text-blue-800">Twitter</a>
          <a href="#" className="text-blue-600 hover:text-blue-800">Instagram</a>
          <a href="#" className="text-blue-600 hover:text-blue-800">LinkedIn</a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;