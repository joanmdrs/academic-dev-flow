import api from "../api/api";

export const alterarSenha = async (dados) => {
    try {
        const response = await api.post("/auth/change-password/", dados);
        return response.data;
    } catch (error) {
        return { error: true };
    }
};