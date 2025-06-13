import { createBrowserRouter } from 'react-router-dom';
import mainRoutes from './MainRoutes';
import authRoutes from './AuthRoutes';
import adminRoutes from './AdminRoutes';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  ...mainRoutes,
  ...authRoutes,
  ...adminRoutes,
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
