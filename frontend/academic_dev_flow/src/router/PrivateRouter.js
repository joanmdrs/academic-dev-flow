import React from 'react';
import { NotificationManager } from 'react-notifications';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAllowed, children }) => {  

  if (!isAllowed) {

    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
