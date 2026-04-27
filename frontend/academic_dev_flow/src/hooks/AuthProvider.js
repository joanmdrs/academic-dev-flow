import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const buildUser = (userData) => {
        let role = null;

        if (userData.groups.includes("Administradores")) {
            role = "admin";
        } else if (userData.groups.includes("Discentes")) {
            role = "aluno";
        } else if (userData.groups.includes("Docentes")) {
            role = "professor";
        }

        return {
            id: userData.id,
            username: userData.username,
            groups: userData.groups,
            role
        };
    };

    const redirectToLogin = (role) => {
        switch (role) {
            case "admin":
                navigate("/home", { replace: true });
                break;
            case "aluno":
                navigate("/home", { replace: true });
                break;
            case "professor":
                navigate("/home", { replace: true });
                break;
            default:
                NotificationManager.error("Grupo de usuário desconhecido.");
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const loginAction = async (username, password) => {
        try {
            const response = await api.post("/auth/login/", { username, password });

            if (response.status === 200) {
                const data = response.data;

                const userBuilt = buildUser(data.user);

                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(userBuilt));

                setUser(userBuilt);

                redirectToLogin(userBuilt.role);

                NotificationManager.success("Login realizado com sucesso!");
            }
        } catch (error) {
            if (!error.response) {
                NotificationManager.error("Erro ao conectar com o servidor.");
                return;
            }

            const { status, data } = error.response;

            if (status === 403 && data.code === "USER_NOT_ASSOCIATED") {
                NotificationManager.error("Usuário sem perfil de acesso.");
            } else if (status === 401) {
                NotificationManager.error("Usuário/senha inválidos!");
            } else {
                NotificationManager.error("Erro desconhecido.");
            }
        }
    };

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/", { replace: true });
    };

    return (
        <AuthContext.Provider value={{ user, loginAction, logOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;