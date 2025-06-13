import AdminLayout from '../layouts/AdminLayout';

const adminRoutes = [
  {
    path: '/admin',
    element: <AdminLayout />,
    index: true,
    /*  children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          }
        ] */
  },
];

export default adminRoutes;
