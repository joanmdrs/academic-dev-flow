import api from "./api";

const AuthService = {
  login: async (username, password) => {
    try {
      const response = await api.post("myauth/login/", { username, password });

      if (response.status === 200) {
        const data = response.data; // Não precisa chamar response.json() porque o dado já está no formato JSON
        localStorage.setItem('token', data.token);
        return { success: true, data };
      } else {
        const errorData = response.data; // Mesma lógica aqui
        return { success: false, error: errorData };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, error: 'Internal Server Error' };
    }
  },
};

export default AuthService;
