import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import AddBlog from './pages/Blog/Add';
//
import Blog from './pages/Blog/Blog';
import EditBlog from './pages/Blog/Edit';
import AddCase from './pages/CaseLaw/Add';
import CaseLaw from './pages/CaseLaw/CaseLaw';
import EditCase from './pages/CaseLaw/Edit';
import DashboardApp from './pages/DashboardApp';
import AddDictionary from './pages/Dictionary/AddDictionary';
import Dictionary from './pages/Dictionary/Dictionary';
import Login from './pages/Login';
import AddNotification from './pages/Notifications/Add';
import Notifications from './pages/Notifications/Notifications';
import AddNotificationType from './pages/NotificationType/Add';
import NotificationType from './pages/NotificationType/NotificationType';
import AddOrdinance from './pages/Ordinance/Add';
import Ordinance from './pages/Ordinance/Ordinance';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import AddServiceType from './pages/ServiceType/Add';
import AddStatutes from './pages/Statutes/Add';
import EditStatute from './pages/Statutes/Edit';
import Statutes from './pages/Statutes/Statutes';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'blog', element: <Blog /> },
        { path: 'addBlog', element: <AddBlog /> },
        { path: 'editBlog', element: <EditBlog /> },
        { path: 'caselaws', element: <CaseLaw /> },
        { path: 'addCase', element: <AddCase /> },
        { path: 'editCase', element: <EditCase /> },
        { path: 'statutes', element: <Statutes /> },
        { path: 'addStatute', element: <AddStatutes /> },
        { path: 'editStatute', element: <EditStatute /> },
        { path: 'dictionary', element: <Dictionary /> },
        { path: 'addDictionary', element: <AddDictionary /> },
        { path: 'notifications', element: <Notifications /> },
        { path: 'addNotification', element: <AddNotification /> },
        { path: 'notificationsType', element: <NotificationType /> },
        { path: 'addNotificationType', element: <AddNotificationType /> },
        { path: 'addOrdinance', element: <AddOrdinance /> },
        { path: 'ordinance', element: <Ordinance /> },
        { path: 'serviceTypes', element: <AddServiceType /> },
        { path: 'addServiceType', element: <AddServiceType /> },
      ],
    },

    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
