import api from "../api/api";

export const listarIteracoesPorProjeto = async (idProjeto) => {

    const response = await api.get(`iteracao/listar/${encodeURIComponent(idProjeto)}/`)
    return response 
}