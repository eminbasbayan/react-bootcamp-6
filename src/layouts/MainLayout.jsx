import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
