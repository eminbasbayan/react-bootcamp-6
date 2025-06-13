import { useContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeContext } from './context/ThemeProvider';

import router from './routes/router';

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
      <div className="pt-4">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
