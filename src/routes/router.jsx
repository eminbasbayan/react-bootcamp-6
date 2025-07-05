import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

// Pages
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import CartPage from "../pages/CartPage";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";

// Auth Pages
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

// Admin Pages (oluşturulacak)
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminProducts = lazy(() => import("../pages/admin/AdminProducts"));
const AdminUsers = lazy(() => import("../pages/admin/AdminUsers"));
const AdminOrders = lazy(() => import("../pages/admin/AdminOrders"));
const AdminReports = lazy(() => import("../pages/admin/AdminReports"));
const AdminSettings = lazy(() => import("../pages/admin/AdminSettings"));

// Route Guards
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import AdminRoute from "../components/Auth/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <div>Profil Sayfası</div>
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <div>Siparişlerim Sayfası</div>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminProducts />
          </Suspense>
        ),
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUsers />
          </Suspense>
        ),
      },
      {
        path: "orders",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminOrders />
          </Suspense>
        ),
      },
      {
        path: "reports",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminReports />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <AdminRoute requireSuperAdmin={true}>
            <Suspense fallback={<div>Loading...</div>}>
              <AdminSettings />
            </Suspense>
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
