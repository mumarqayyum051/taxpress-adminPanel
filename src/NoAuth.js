import { Navigate, useLocation, Outlet } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import AuthService from './services/AuthService';
import useAuth from './hooks/useAuth';

const NoAuth = () => {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    console.log(isAuthenticated);
    console.log('triggered');
  }, []);
  const location = useLocation();
  console.log(isAuthenticated);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};

export default NoAuth;
