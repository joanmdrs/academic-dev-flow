import api from "./api";

const AuthService = {
  login: async (username, password) => {
    try {
      const response = await api.post("myauth/login/", {username, password})

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        return { success: true, data };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, error: 'Internal Server Error' };
    }
  },
};

export default AuthService;
