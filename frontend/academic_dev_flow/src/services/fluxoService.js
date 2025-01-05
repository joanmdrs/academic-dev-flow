import api from "../api/api"
import { 
    ERROR_MESSAGE_ON_CREATION, 
    ERROR_MESSAGE_ON_DELETION, 
    ERROR_MESSAGE_ON_SEARCHING, 
    ERROR_MESSAGE_ON_UPDATE, 
    SUCCESS_MESSAGE_ON_CREATION, 
    SUCCESS_MESSAGE_ON_DELETION, 
    SUCCESS_MESSAGE_ON_UPDATE } from "./messages"
import { handleError, handleSuccess } from "./utils"

export const criarFluxo = async (dados) => {
    try {
        const response = await api.post("/fluxo/cadastrar/", dados)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_CREATION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_CREATION)
    }
}

export const buscarFluxoPeloNome = async (parametro) => {
    try {
        const response = await api.get(`/fluxo/buscar-por-nome/?nome_fluxo=${encodeURIComponent(parametro)}`)
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar os fluxos, contate o suporte!')
    }
}

export const buscarFluxoPeloId =  async (fluxo_id) => {
    try {
        const response = await api.get(`fluxo/buscar/${encodeURIComponent(fluxo_id)}/`) 
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const atualizarFluxo = async (dadosFluxo, idFluxo) => {
    try {
        const response = await api.patch(`fluxo/atualizar/?id_fluxo=${encodeURIComponent(idFluxo)}`, dadosFluxo)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_UPDATE)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_UPDATE)
    }
    
}

export const excluirFluxo = async (idFluxo) => {
    try {
        const response = await api.delete(`fluxo/excluir/?id_fluxo=${encodeURIComponent(idFluxo)}/`)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_DELETION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_DELETION)
    }
}

export const listarFluxos = async () => {
    try {
        const response = await api.get('fluxo/listar/')
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}
