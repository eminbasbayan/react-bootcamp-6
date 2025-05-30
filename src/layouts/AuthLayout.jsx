import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
