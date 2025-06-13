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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
      <div className="pt-4">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
