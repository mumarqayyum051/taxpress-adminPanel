// /*   -disable no-unused-expressions */
import React, { useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const { auth } = useAuth;
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         auth ? <Component {...rest} {...props} /> : <Navigate to="/login" replace />;
//       }}
//     />
//   );
// };

// export default ProtectedRoute;

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = true;
//   const { auth } = useAuth;
//   if (auth) {
//     return children;
//   }

//   return <Navigate to="/" />;
// };

// export default ProtectedRoute;

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const _auth = false;
  useEffect(() => {
    console.log(isAuthenticated);
  });
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
