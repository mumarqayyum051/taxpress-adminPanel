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

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />

      <Routes>
        <Route element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<DashboardLayout />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
