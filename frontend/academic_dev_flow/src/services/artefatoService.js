import api from "../api/api" 
import { ERROR_MESSAGE_ON_CREATION, ERROR_MESSAGE_ON_DELETION, ERROR_MESSAGE_ON_SEARCHING, ERROR_MESSAGE_ON_UPDATE, SUCCESS_MESSAGE_ON_CREATION, SUCCESS_MESSAGE_ON_DELETION, SUCCESS_MESSAGE_ON_UPDATE } from "./messages"
import { handleError, handleSuccess } from "./utils"

export const criarArtefato = async (dados) => {
    try {
        const response = await api.post('/artefato/cadastrar/', dados)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_CREATION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_CREATION)
    }   
}

export const buscarArtefatoPeloNome =  async (parametro) => {
    try {
        const response = await api.get('artefato/buscar/', {params: {nome: parametro}})
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const atualizarArtefato = async (id, dados) => {
    try {
        const response = await api.patch(`/artefato/atualizar/${encodeURIComponent(id)}/`, dados)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_UPDATE)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_UPDATE)
    }
}

export const excluirArtefato = async (id) => {
    try {
        const response = await api.delete(`/artefato/excluir/${encodeURIComponent(id)}/`)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_DELETION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_DELETION)
    }
}

export const listarArtefatos = async () => {
    try {
        const response = await api.get('/artefato/listar/')
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}