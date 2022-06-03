// routes
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import DashboardLayout from './layouts/dashboard';
import Login from './pages/Login';
// eslint-disable-next-line import/named
import ProtectedRoute from './ProtectedRoutes';
import PersistLogin from './PersistLogin';
import RequireAuth from './RequireAuth';
import NoAuth from './NoAuth';
import Blog from './pages/Blog/Blog';
import AddBlog from './pages/Blog/Add';
import EditBlog from './pages/Blog/Edit';
import AddCase from './pages/CaseLaw/Add';
import CaseLaw from './pages/CaseLaw/CaseLaw';
import EditCase from './pages/CaseLaw/Edit';
import DashboardApp from './pages/DashboardApp';
import AddDictionary from './pages/Dictionary/AddDictionary';
import Dictionary from './pages/Dictionary/Dictionary';
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
import ServiceTypes from './pages/ServiceType/ServiceTypes';
// ----------------------------------------------------------------------

export default function App() {
  const protectedRoutes = [
    { path: '/app', element: <DashboardApp /> },
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
    { path: 'serviceTypes', element: <ServiceTypes /> },
    { path: 'addServiceType', element: <AddServiceType /> },
  ];
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />

      <Routes>
        <Route element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route element={<NoAuth />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<DashboardLayout />}>
                {protectedRoutes.map((route) => (
                  // eslint-disable-next-line react/jsx-key
                  <Route path={route.path} element={route.element} />
                ))}
              </Route>
            </Route>
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
