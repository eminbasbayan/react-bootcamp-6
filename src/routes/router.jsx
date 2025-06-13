import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout';

// Pages
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import CartPage from '../pages/CartPage';
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

// Admin Pages (oluşturulacak)
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminProducts from '../pages/admin/AdminProducts';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminOrders from '../pages/admin/AdminOrders';
import AdminReports from '../pages/admin/AdminReports';
import AdminSettings from '../pages/admin/AdminSettings';

// Route Guards
import ProtectedRoute from '../components/Auth/ProtectedRoute';
import AdminRoute from '../components/Auth/AdminRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'products',
        element: <ProductsPage />
      },
      {
        path: 'products/:id',
        element: <ProductDetailsPage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'contact',
        element: <ContactPage />
      },
      {
        path: 'cart',
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <div>Profil Sayfası</div>
          </ProtectedRoute>
        )
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute>
            <div>Siparişlerim Sayfası</div>
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      }
    ]
  },
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      {
        path: 'dashboard',
        element: <AdminDashboard />
      },
      {
        path: 'products',
        element: <AdminProducts />
      },
      {
        path: 'users',
        element: <AdminUsers />
      },
      {
        path: 'orders',
        element: <AdminOrders />
      },
      {
        path: 'reports',
        element: <AdminReports />
      },
      {
        path: 'settings',
        element: (
          <AdminRoute requireSuperAdmin={true}>
            <AdminSettings />
          </AdminRoute>
        )
      }
    ]
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;
