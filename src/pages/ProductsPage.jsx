import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Search, Filter, ChevronDown } from 'lucide-react';
import Products from '../components/Products/Products';
import { productsData } from '../data/productsData';
import { addToCart } from '../redux/cartSlice';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Gerçek bir API'den veri çekmek yerine productsData kullanıyoruz
    setProducts(productsData);
    setFilteredProducts(productsData);
    
    // Benzersiz kategorileri çıkar
    const uniqueCategories = [...new Set(productsData.map(product => product.category))];
    setCategories(uniqueCategories);
  }, []);

  useEffect(() => {
    // Filtreleme ve sıralama işlemleri
    let result = [...products];
    
    // Kategori filtresi
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Arama filtresi
    if (searchTerm) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sıralama
    switch(sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, searchTerm, sortBy]);

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  return (
    <div className="products-page container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Tüm Ürünler</h1>
      
      {/* Arama ve Filtre Bölümü */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Ürün ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <button 
              onClick={toggleFilterMenu}
              className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter size={18} />
              <span>Filtreler</span>
              <ChevronDown size={16} />
            </button>
            
            {isFilterMenuOpen && (
              <div className="absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Kategoriler</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="all"
                        name="category"
                        checked={selectedCategory === 'all'}
                        onChange={() => setSelectedCategory('all')}
                        className="mr-2"
                      />
                      <label htmlFor="all">Tümü</label>
                    </div>
                    
                    {categories.map(category => (
                      <div key={category} className="flex items-center">
                        <input
                          type="radio"
                          id={category}
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="mr-2"
                        />
                        <label htmlFor={category}>{category}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Sıralama</option>
            <option value="price-low">Fiyat: Düşükten Yükseğe</option>
            <option value="price-high">Fiyat: Yüksekten Düşüğe</option>
            <option value="rating">Puana Göre</option>
          </select>
        </div>
      </div>
      
      {/* Aktif Filtreler */}
      {(selectedCategory !== 'all' || searchTerm || sortBy !== 'default') && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedCategory !== 'all' && (
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
              Kategori: {selectedCategory}
              <button 
                onClick={() => setSelectedCategory('all')} 
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                &times;
              </button>
            </div>
          )}
          
          {searchTerm && (
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
              Arama: {searchTerm}
              <button 
                onClick={() => setSearchTerm('')} 
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                &times;
              </button>
            </div>
          )}
          
          {sortBy !== 'default' && (
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
              {sortBy === 'price-low' && 'Fiyat: Düşükten Yükseğe'}
              {sortBy === 'price-high' && 'Fiyat: Yüksekten Düşüğe'}
              {sortBy === 'rating' && 'Puana Göre'}
              <button 
                onClick={() => setSortBy('default')} 
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                &times;
              </button>
            </div>
          )}
          
          <button 
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
              setSortBy('default');
            }}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300"
          >
            Filtreleri Temizle
          </button>
        </div>
      )}
      
      {/* Sonuç Sayısı */}
      <div className="mb-4 text-gray-600">
        {filteredProducts.length} ürün bulundu
      </div>
      
      {/* Ürünler */}
      {filteredProducts.length === 0 ? (
        <div className="bg-gray-100 py-16 px-4 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Ürün bulunamadı</h2>
          <p className="text-gray-600 mb-4">Lütfen farklı arama kriterleri deneyiniz.</p>
          <button 
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
              setSortBy('default');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Tüm Ürünleri Göster
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-blue-600 uppercase font-semibold tracking-wide mb-1">
                  {product.category}
                </div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-3">{product.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold">{product.price.toFixed(2)}₺</span>
                  <div className="flex items-center text-yellow-500">
                    <span className="text-sm font-medium ml-1">{product.rating.rate} / 5 ({product.rating.count})</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => dispatch(addToCart(product))}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Sepete Ekle
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;