import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthService from './services/AuthService';
import useAuth from './hooks/useAuth';
import JWTService from './services/JWTService';
import Loader from './components/Loader';

const PersistLogin = () => {
  const { _userContext } = AuthService;
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useAuth();
  const { _setToken, _destroyToken } = JWTService;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await _userContext();
        setUser(response.data);
        setIsAuthenticated(true);
        _setToken(response.data.token);
      } catch (error) {
        console.log(error);
        setUser({});
        setIsAuthenticated(false);
        _destroyToken();
      } finally {
        setIsLoading(false);
      }
    };
    // eslint-disable-next-line no-unused-expressions
    !isAuthenticated ? verifyToken() : setIsLoading(false);
  }, []);
  useEffect(() => {
    console.log({ isAuthenticated });
    console.log({ user });
    console.log({ isLoading });
  }, [isLoading]);

  return <>{isLoading ? <Loader /> : <Outlet />}</>;
};

export default PersistLogin;
