import { NotificationManager } from "react-notifications"
import api from "../api/api"
import { handleError, handleInfo, handleSuccess } from "./utils"
import { ERROR_MESSAGE_ON_CREATION, ERROR_MESSAGE_ON_SEARCHING, INFO_MESSAGE_ON_SEARCHING, SUCCESS_MESSAGE_ON_CREATION } from "./messages"

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
    try {
        const response = await api.get(`membro_projeto/buscar/${encodeURIComponent(idProjeto)}/`)

        if (response.status === 204) {
            return handleInfo(response, INFO_MESSAGE_ON_SEARCHING)
        } 
        return response

    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
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

export const listarMembrosPeloIdProjeto = async (idProjeto) => {

    try {
        const response = await api.get(`membro_projeto/listar/projeto/${encodeURIComponent(idProjeto)}/`)
        return response
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao buscar os dados dos membros, contate o suporte!')
        return {error: 'Erro ao buscar os dados'}
    }
}

export const buscarMembroProjetoPeloUsuarioGithub = async (parametros) => {
    try {
        const response = await api.get('membro_projeto/buscar/usuario_github/', {params: parametros})
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const cadastrarFuncoes = async (dados) => {
    try {
        const response = await api.post('membro_projeto/funcoes/cadastrar/', {funcoes: dados})
        return handleSuccess(response, SUCCESS_MESSAGE_ON_CREATION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_CREATION)
    }
}

export const cadastrarFuncaoAtual = async (dados) => {
    try {
        const response = await api.post('membro_projeto/cadastrar-funcao-atual/', dados)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_CREATION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_CREATION)
    }
}