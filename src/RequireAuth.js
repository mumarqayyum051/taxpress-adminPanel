import { Navigate, useLocation, Outlet } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import AuthService from './services/AuthService';
import useAuth from './hooks/useAuth';

const RequireAuth = () => {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    console.log(isAuthenticated);
    console.log('triggered');
  }, []);
  const location = useLocation();
  console.log(isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
