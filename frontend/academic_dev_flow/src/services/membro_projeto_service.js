import api from "./api";

export const criarMembroProjeto = async (dados) => {
    const resposta = await api.post('membro_projeto/cadastrar/', {membros: dados})
    return resposta
}

export const listarMembrosPorProjeto = async (idProjeto) => {
    const resposta = await api.get(`membro_projeto/buscar/${encodeURIComponent(idProjeto)}/`)
    return resposta
}