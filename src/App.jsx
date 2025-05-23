import { useContext } from 'react';
import Header from './components/Layout/Header';
import Products from './components/Products/Products';
import { ThemeContext } from './context/ThemeProvider';
import Cart from './components/Cart/Cart';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className="app container mx-auto"
      style={{
        backgroundColor: `${darkMode ? 'black' : 'white'}`,
        color: `${darkMode ? 'white' : 'black'}`,
      }}
    >
      <Header />
      <div className="pt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
