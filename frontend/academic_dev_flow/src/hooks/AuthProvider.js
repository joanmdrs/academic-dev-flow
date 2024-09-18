import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { decodeToken } from "react-jwt";
import { NotificationManager } from "react-notifications";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const redirectUser = (decodedUser) => {
    if (decodedUser.groups.includes("Administradores")) {
      navigate("/admin/home");
    } else if (decodedUser.groups.includes("Discentes")) {
      navigate("/aluno/home");
    } else if (decodedUser.groups.includes("Docentes")) {
      navigate("/professor/home");
    }
  };

  const waitForToken = () =>
    new Promise((resolve) => {
      const checkToken = () => {
        const newToken = localStorage.getItem("token");
        if (newToken) {
          resolve(newToken);
        } else {
          setTimeout(checkToken, 500);
        }
      };

      checkToken();
    });

  const loginAction = async (username, password) => {
    try {
      const response = await api.post("/auth/login/", { username, password });

      if (response.status === 200) {
        const data = await response.data;
        localStorage.setItem("token", data.token);

        const newToken = await waitForToken();

        if (newToken) {
          try {
            const decodedUser = await decodeToken(newToken);
            redirectUser(decodedUser);
            NotificationManager.success("Login realizado com sucesso !");
          } catch (decodeError) {
            console.error("Erro ao decodificar o token:", decodeError);
            logOut(); 
          }
        } else {
          NotificationManager.error("Token não disponível");
        }
      } else {
        NotificationManager.error("Usuário/senha inválidos !");
      }
    } catch (err) {
      console.error("Erro durante o login:", err);
      NotificationManager.error("Usuário/senha inválidos !");
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/", {replace: true});
  };

  return (
    <AuthContext.Provider value={{ loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
