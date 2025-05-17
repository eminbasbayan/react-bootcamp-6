import { useContext } from "react";
import Header from "./components/Layout/Header";
import Products from "./components/Products/Products";
import { ThemeContext } from "./context/ThemeProvider";

function App() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div
      className="app container mx-auto"
      style={{
        backgroundColor: `${darkMode ? "black" : "white"}`,
        color: `${darkMode ? "white" : "black"}`,
      }}
    >
      <Header />
      <div className="pt-4">
        <Products />
      </div>
    </div>
  );
}

export default App;
