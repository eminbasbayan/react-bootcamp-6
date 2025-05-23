import { useContext } from 'react';
import Header from './components/Layout/Header';
import Products from './components/Products/Products';
import { ThemeContext } from './context/ThemeProvider';
import Cart from './components/Cart/Cart';

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
        <Cart />
      </div>
    </div>
  );
}

export default App;
