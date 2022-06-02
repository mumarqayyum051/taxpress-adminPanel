// routes
import { Routes, Route, Navigate } from 'react-router-dom';
import RouterLayout from './RouterLayout';
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
import RequireAuth from './RequireAuth';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      {/* <Router /> */}

      <Routes>
        {/* <Route path="/">
          <Route
            index
            path="/dashboard"
            element={
              // Good! Do your composition here instead of wrapping <Route>.
              // This is really just inverting the wrapping, but it's a lot
              // more clear which components expect which props.
              <DashboardLayout />
            }
          />
        </Route> */}
        <Route element={<RouterLayout />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<DashboardLayout />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
