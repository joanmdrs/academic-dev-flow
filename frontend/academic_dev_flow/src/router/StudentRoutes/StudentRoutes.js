import React, { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import { Navigate, Outlet } from 'react-router-dom';

const StudentRoutes = ({children}) => {  

    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [decodedToken, setDecodedToken] = useState(null)
    
    useEffect(() => {
      const decodeAsync = async () => {
        try {
          const decoded = await decodeToken(token);
          setDecodedToken(decoded);
        } catch (error) {
          console.error('Erro ao decodificar o token:', error);
        }
      };
  
      if (token) {
        decodeAsync();
      }
    }, [token]);

    if (!(!!decodedToken && decodedToken.groups.includes('Alunos'))) {
        return <Navigate to="/" replace />;
    }


    return children ? children : <Outlet />;
};

export default StudentRoutes;
