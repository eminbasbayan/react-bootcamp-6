import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
// import Products from "./components/Products/Products";

function App() {
  return (
    <div className="app container mx-auto">
      {/* <Products /> */}
      <LoginForm />
      <RegisterForm />
    </div>
  );
}

export default App;
