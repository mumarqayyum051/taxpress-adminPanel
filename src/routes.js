import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import CaseLaw from './pages/CaseLaw/CaseLaw';
import AddCase from './pages/CaseLaw/Add';
import EditCase from './pages/CaseLaw/Edit';
import Statutes from './pages/Statutes/Statutes';
import AddStatutes from './pages/Statutes/Add';
import Dictionary from './pages/Dictionary/Dictionary';
import Notifications from './pages/Notifications/Notifications';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'caselaws', element: <CaseLaw /> },
        { path: 'addCase', element: <AddCase /> },
        { path: 'editCase', element: <EditCase /> },
        { path: 'statutes', element: <Statutes /> },
        { path: 'addStatue', element: <AddStatutes /> },
        { path: 'dictionary', element: <Dictionary /> },
        { path: 'notifications', element: <Notifications /> },
      ],
    },

    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
