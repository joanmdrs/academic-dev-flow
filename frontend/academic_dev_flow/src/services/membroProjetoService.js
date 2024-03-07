import { NotificationManager } from "react-notifications"
import api from "../api/api"

export const criarMembroProjeto = async (dados) => {
    const resposta = await api.post('membro_projeto/cadastrar/', {membros: dados})
    return resposta
}

export const buscarProjetosDoMembro =  async (idMembro) => {

    try {
        const response = await api.get(`membro_projeto/buscar/projetos/${encodeURIComponent(idMembro)}/`)
        return response
    } catch (error) {
        console.log(error)
        NotificationManager.error('Erro na operação, contate o suporte!')
    }
}

export const excluirMembroProjetoOne = async (id) => {
    const resposta = await api.delete(`membro_projeto/excluir/one/${encodeURIComponent(id)}/`)
    return resposta
}

export const excluirMembroProjetoMany = async (id_projeto, lista_membros, grupo) => {
    const ids_membros = lista_membros
    .filter(membroProjeto => membroProjeto.grupo === grupo)  
    .map(membroProjeto => membroProjeto.membro);

    const resposta = await api.delete(`membro_projeto/excluir/many/${encodeURIComponent(id_projeto)}/`, {
        data: { ids_membros: ids_membros },
    });
    return resposta
}

export const listarMembrosPorProjeto = async (idProjeto) => {
    const resposta = await api.get(`membro_projeto/buscar/${encodeURIComponent(idProjeto)}/`)
    return resposta
}

export const buscarQuantidadeMembrosPorProjeto = async (idProjeto) => {
    try {
        const response = await api.get(`membro_projeto/buscar/membros/quantidade/${encodeURIComponent(idProjeto)}/`)
        return response
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha na operação, contate o suporte !')
    }
}

export const listarMembrosPorListaIds = async (listaIds) => {
    try {
        const response = api.get(`membro_projeto/listar/`, {params: {ids: listaIds}})
        return response
        
    } catch (error) {
        NotificationManager.error('Falha ao buscar os dados')
        return {error: 'Falha ao executar a operação'}
    }
}