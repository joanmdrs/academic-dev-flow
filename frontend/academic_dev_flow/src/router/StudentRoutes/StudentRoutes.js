import React, { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

const StudentRoutes = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [decodedToken, setDecodedToken] = useState(null);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const decodeAsync = async () => {
            try {
                const decoded = await decodeToken(token);
                setDecodedToken(decoded);
                setTimeout(() => setShouldRender(true), 2000);
            } catch (error) {
                console.error('Erro ao decodificar o token:', error);
            }
        };
        if (token) {
            decodeAsync();
        }
    }, [token]);

    if (!shouldRender) {
        return <Loading />
    }

    if (!(decodedToken && decodedToken.groups.includes('Discentes'))) {
        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
};

export default StudentRoutes;
