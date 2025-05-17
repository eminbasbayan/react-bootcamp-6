import Header from "./components/Layout/Header";
import Products from "./components/Products/Products";

function App() {
  return (
    <div className="app container mx-auto">
      <Header />
      <div className="pt-4">
        <Products  />
      </div>
    </div>
  );
}

export default App;
