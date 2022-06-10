// routes
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Router from './routes';
import 'react-toastify/dist/ReactToastify.css';
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
import AddOrdinance from './pages/Ordinance2/Add';
import Ordinance from './pages/Ordinance2/Ordinance2';
import OrdinanceDetail from './pages/OrdinanceDetails/OrdinanceDetail';
import AddOrdinanceDetails from './pages/OrdinanceDetails/Add';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import AddServiceType from './pages/ServiceType/Add';
import AddStatutes from './pages/Statutes/Add';
import EditStatute from './pages/Statutes/Edit';
import Statutes from './pages/Statutes/Statutes';
import ServiceTypes from './pages/ServiceType/ServiceTypes';
import Team from './pages/Team/Team';
import AddMember from './pages/Team/Add';
import EditMember from './pages/Team/Edit';
import Insights from './pages/Insights/Insights';
import AddInsight from './pages/Insights/Add';
import Services from './pages/Services/Services';
import AddServices from './pages/Services/Add';
import ServiceDetail from './pages/ServiceDetail/ServiceDetail';
import AddServiceDetail from './pages/ServiceDetail/Add';
// ----------------------------------------------------------------------

export default function App() {
  const protectedRoutes = [
    { path: 'dashboard', element: <DashboardApp /> },
    { path: 'blog', element: <Blog /> },
    { path: 'blog/addBlog', element: <AddBlog /> },
    { path: 'blog/editBlog', element: <EditBlog /> },
    { path: 'team', element: <Team /> },
    { path: 'team/addMember', element: <AddMember /> },
    { path: 'team/editMember', element: <EditMember /> },
    { path: 'caselaws', element: <CaseLaw /> },
    { path: 'caselaws/addCase', element: <AddCase /> },
    { path: 'caselaws/editCase', element: <EditCase /> },
    { path: 'statutes', element: <Statutes /> },
    { path: 'addStatute', element: <AddStatutes /> },
    { path: 'editStatute', element: <EditStatute /> },
    { path: 'dictionary', element: <Dictionary /> },
    { path: 'addDictionary', element: <AddDictionary /> },
    { path: 'notifications', element: <Notifications /> },
    { path: 'notifications/addNotification', element: <AddNotification /> },
    { path: 'notificationsType', element: <NotificationType /> },
    { path: 'addNotificationType', element: <AddNotificationType /> },
    { path: 'ordinance/addOrdinance', element: <AddOrdinance /> },
    { path: 'ordinance', element: <Ordinance /> },
    { path: 'ordinanceDetail', element: <OrdinanceDetail /> },
    { path: 'ordinanceDetail/addOrdinanceDetails', element: <AddOrdinanceDetails /> },
    { path: 'serviceTypes', element: <ServiceTypes /> },
    { path: 'serviceTypes/addServiceType', element: <AddServiceType /> },
    { path: 'insights', element: <Insights /> },
    { path: 'insights/addInsight', element: <AddInsight /> },
    { path: 'services', element: <Services /> },
    { path: 'services/addService', element: <AddServices /> },
    { path: 'serviceTypes/serviceDetails', element: <ServiceDetail /> },
    { path: 'serviceTypes/addServiceDetail', element: <AddServiceDetail /> },
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
              <Route element={<DashboardLayout />}>
                {protectedRoutes.map((route) => (
                  // eslint-disable-next-line react/jsx-key
                  <Route path={route.path} element={route.element} />
                ))}
              </Route>
            </Route>
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
