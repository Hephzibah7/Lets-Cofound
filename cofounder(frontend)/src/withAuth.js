// withAuth.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (Component) => {
  const isAuthenticated = localStorage.getItem('token');

  const AuthComponent = (props) => {
    return isAuthenticated ? <Component {...props} /> : <Navigate to="/login" replace />;
  };

  return AuthComponent;
};

export default withAuth;
