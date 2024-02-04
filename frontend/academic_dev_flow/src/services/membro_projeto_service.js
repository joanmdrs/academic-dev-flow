import api from "./api";

export const criarMembroProjeto = async (dados) => {
    const resposta = await api.post('membro_projeto/cadastrar/', {membros: dados})
    return resposta
}

export const excluirMembroProjetoOne = async (id) => {
    const resposta = await api.delete(`membro_projeto/excluir/one/${encodeURIComponent(id)}`)
    return resposta
}

export const excluirMembroProjetoMany = async (id_projeto, lista_membros, grupo) => {
    const ids_membros = lista_membros
    .filter(membro => membro.grupo === grupo)  
    .map(membro => membro.id);

    const resposta = await api.delete(`membro_projeto/excluir/many/${encodeURIComponent(id_projeto)}`, ids_membros)
    return resposta
}



export const listarMembrosPorProjeto = async (idProjeto) => {
    const resposta = await api.get(`membro_projeto/buscar/${encodeURIComponent(idProjeto)}/`)
    return resposta
}