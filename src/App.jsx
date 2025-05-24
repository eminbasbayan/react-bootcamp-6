import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeContext } from './context/ThemeProvider';
import Header from './components/Layout/Header';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import Counter from './components/Counter';

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
      <ToastContainer />
      <Header />
      <div className="pt-4">
        <Counter />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
