import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { decodeToken } from 'react-jwt';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoutes = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [decodedToken, setDecodedToken] = useState(null);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const decodeAsync = async () => {
            try {
                const decoded = await decodeToken(token);
                setDecodedToken(decoded);
                // Remova o atraso (setTimeout) se não for mais necessário
                setTimeout(() => setShouldRender(true), 2000); // Atraso de 2 segundos
            } catch (error) {
                console.error('Erro ao decodificar o token:', error);
            }
        };

        if (token) {
            decodeAsync();
        }
    }, [token]);

    if (!shouldRender) {
        // Aguarda o atraso antes de renderizar o componente
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Spin
                    indicator={
                        <LoadingOutlined
                            style={{
                                fontSize: 40,
                            }}
                            spin
                        />
                    }
                />
            </div>
        )
    }

    console.log(decodedToken);

    if (!(decodedToken && decodedToken.groups.includes('Administradores'))) {
        // Se o token decodificado não existir ou o usuário não for um administrador, redirecione para o login
        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
};

export default AdminRoutes;
