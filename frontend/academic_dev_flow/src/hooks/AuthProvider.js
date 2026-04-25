import React, {createContext, useContext, useState} from "react";
import api from "../api/api";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const redirectToLogin = (userGroup) => {
        if (userGroup.includes("Administradores")) {
            navigate("/admin/dashboard", {replace: true});
        } else if (userGroup.includes("Discentes")) {
            navigate("/aluno/home", {replace: true});
        } else if (userGroup.includes("Docentes")) {
            navigate("/professor/home", {replace: true});
        } else {
            NotificationManager.error("Grupo de usuário desconhecido. Contate o administrador do sistema.");
        }
    }

    const loginAction = async (username, password) => {
        try {
            const response = await api.post("/auth/login/", { username, password });

            if (response.status === 200){
                const data = response.data;
                localStorage.setItem("token", data.token);
                setUser(data.user);
                redirectToLogin(data.user.groups);
                NotificationManager.success("Login realizado com sucesso!");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403 && error.response.data.code === "USER_NOT_ASSOCIATED") {
                    NotificationManager.error("Este usuário não possui um perfil de acesso. Contate o administrador do sistema !");
                } else if (error.response.status === 401) {
                    NotificationManager.error("Usuário/senha inválidos!");
                } else {
                    NotificationManager.error("Erro desconhecido durante o login.");
                }
            } else {
                console.error("Erro durante o login:", error);
                NotificationManager.error("Erro ao conectar com o servidor.");
            }
        }
    }

    const logOut = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/", {replace: true});
    }

    return (
        <AuthContext.Provider value={{ user, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
