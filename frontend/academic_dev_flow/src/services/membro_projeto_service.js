import api from "../api/api"

export const criarMembroProjeto = async (dados) => {
    const resposta = await api.post('membro_projeto/cadastrar/', {membros: dados})
    return resposta
}

export const excluirMembroProjetoOne = async (id) => {
    const resposta = await api.delete(`membro_projeto/excluir/one/${encodeURIComponent(id)}/`)
    return resposta
}

export const excluirMembroProjetoMany = async (id_projeto, lista_membros, grupo) => {
    const ids_membros = lista_membros
    .filter(membroProjeto => membroProjeto.grupo === grupo)  
    .map(membroProjeto => membroProjeto.membro);

    console.log(ids_membros)
    const resposta = await api.delete(`membro_projeto/excluir/many/${encodeURIComponent(id_projeto)}/`, {
        data: { ids_membros: ids_membros },
    });
    return resposta
}



export const listarMembrosPorProjeto = async (idProjeto) => {
    const resposta = await api.get(`membro_projeto/buscar/${encodeURIComponent(idProjeto)}/`)
    return resposta
}