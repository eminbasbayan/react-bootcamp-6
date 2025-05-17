import { useContext } from "react";
import Header from "./components/Layout/Header";
import Products from "./components/Products/Products";
import { ThemeContext } from "./context/ThemeProvider";
import BackwardCounter from "./components/Counter/BackwardCounter";
import ForwardCounter from "./components/Counter/ForwardCounter";
import useCounter from "./hooks/useCounter";

function App() {
  const { darkMode } = useContext(ThemeContext);
  const count = useCounter(false);

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
        {count}
        <Products />
      </div>
    </div>
  );
}

export default App;
