import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuth from './context/AuthProvider';

const RequireAuth = () => {
  // @ts-ignore
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  console.log(isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
