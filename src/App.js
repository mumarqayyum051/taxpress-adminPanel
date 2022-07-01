// routes
import { Navigate, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Layout';
// theme
import ThemeProvider from './theme';
// components
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import ScrollToTop from './components/ScrollToTop';
import DashboardLayout from './layouts/dashboard';
import NoAuth from './NoAuth';
import Aboutus from './pages/Aboutus/Aboutus';
import AddAboutus from './pages/Aboutus/Add';
import Appointments from './pages/Appointments/Appointments';
import AddSlot from './pages/AppointmentSlots/Add';
import AppointmentSlots from './pages/AppointmentSlots/AppointmentSlots';
import AddBackground from './pages/Backgrounds/Add';
import Backgrounds from './pages/Backgrounds/Backgrounds';
import AddBlog from './pages/Blog/Add';
import Blog from './pages/Blog/Blog';
import EditBlog from './pages/Blog/Edit';
import AddCase from './pages/CaseLaw/Add';
import CaseLaw from './pages/CaseLaw/CaseLaw';
import EditCase from './pages/CaseLaw/Edit';
import AddClient from './pages/Clients/Add';
import Clients from './pages/Clients/Clients';
import DashboardApp from './pages/DashboardApp';
import AddDictionary from './pages/Dictionary/AddDictionary';
import Dictionary from './pages/Dictionary/Dictionary';
import AddHeroSection from './pages/HeroSection/Add';
import HeroSection from './pages/HeroSection/HeroSection';
import AddInsight from './pages/Insights/Add';
import Insights from './pages/Insights/Insights';
import Login from './pages/Login';
import AddNotification from './pages/Notifications/Add';
import Notifications from './pages/Notifications/Notifications';
import AddNotificationType from './pages/NotificationType/Add';
import NotificationType from './pages/NotificationType/NotificationType';
import AddOrdinance from './pages/Ordinance2/Add';
import Ordinance from './pages/Ordinance2/Ordinance2';
import AddOrdinanceDetails from './pages/OrdinanceDetails/Add';
import OrdinanceDetail from './pages/OrdinanceDetails/OrdinanceDetail';
import NotFound from './pages/Page404';
import AddServiceDetail from './pages/ServiceDetail/Add';
import ServiceDetail from './pages/ServiceDetail/ServiceDetail';
import AddServices from './pages/Services/Add';
import Services from './pages/Services/Services';
import AddServiceType from './pages/ServiceType/Add';
import ServiceTypes from './pages/ServiceType/ServiceTypes';
import AddStatutes from './pages/Statutes/Add';
import EditStatute from './pages/Statutes/Edit';
import Statutes from './pages/Statutes/Statutes';
import AddMember from './pages/Team/Add';
import EditMember from './pages/Team/Edit';
import Team from './pages/Team/Team';
import PersistLogin from './PersistLogin';
import RequireAuth from './RequireAuth';

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
    { path: 'serviceDetails', element: <ServiceDetail /> },
    { path: 'serviceDetails/:superCategory/:type', element: <ServiceDetail /> },
    { path: 'serviceTypes/addServiceDetail', element: <AddServiceDetail /> },
    { path: 'serviceTypes/addServiceDetail/:superCategory/:type', element: <AddServiceDetail /> },
    { path: 'appointmentSlots', element: <AppointmentSlots /> },
    { path: 'appointmentSlots/addSlot', element: <AddSlot /> },
    { path: 'appointments', element: <Appointments /> },
    { path: 'backgrounds', element: <Backgrounds /> },
    { path: 'backgrounds/addBackground', element: <AddBackground /> },
    { path: 'heroSection', element: <HeroSection /> },
    { path: 'heroSection/addHeroSection', element: <AddHeroSection /> },
    { path: 'aboutus', element: <Aboutus /> },
    { path: 'aboutus/addAboutus', element: <AddAboutus /> },
    { path: 'clients', element: <Clients /> },
    { path: 'clients/addClient', element: <AddClient /> },
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
