import api from "./api";

const AuthService = {
  login: async (username, password) => {
    try {
      const response = await api.post("api/login/", { username, password });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        return { success: true, data };
      } else {
        const errorData = response.data;
        return { success: false, error: errorData };
      }
    } catch (error) {
      console.error('Error during login:', error);

      if (error.response && error.response.status === 401) {
        return { success: false, error: 'Credenciais inválidas' };
      }

      return { success: false, error: 'Internal Server Error' };
    }
  },
};


export default AuthService;
