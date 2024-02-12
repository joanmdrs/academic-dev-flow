import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { decodeToken } from "react-jwt";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const loginAction = async (username, password) => {

    try {
      const response = await api.post("auth/login/", { username, password });
        
      if (response.statusText === "OK") {
        const data = await response.data
        localStorage.setItem("token", data.token);
        setUser(data.user)
        setToken(data.token)
        
        return { success: 'Login bem-sucedido' };

      } else {
        throw new Error(response.message || 'Falha no login');
      }
    } catch (err) {
      console.error('Erro durante o login:', err);
      throw new Error('Falha no login. Tente novamente mais tarde.');
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

