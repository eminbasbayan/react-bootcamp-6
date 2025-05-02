import Button from "./components/UI/Button";
import Products from "./components/Products/Products";

function App() {
  return (
    <div>
      <Button title="Tıkla" color="primary" size="lg" addClass="flex" />
      <Button title="Silme Butonu" color="danger" size="lg" />
      <Button title="Yeni Ürün Oluştur" color="success" size="lg" />
      <Button title="Ürün Güncelle" color="secondary" size="sm" />
      <Products />
    </div>
  );
}

export default App;
