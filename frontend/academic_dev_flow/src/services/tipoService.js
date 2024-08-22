import api from "../api/api";
import { handleError, handleInfo, handleSuccess } from "./utils";
import { 
    ERROR_MESSAGE_ON_CREATION, 
    ERROR_MESSAGE_ON_DELETION, 
    ERROR_MESSAGE_ON_SEARCHING, 
    ERROR_MESSAGE_ON_UPDATE, 
    INFO_MESSAGE_ON_SEARCHING, 
    SUCCESS_MESSAGE_ON_CREATION, 
    SUCCESS_MESSAGE_ON_DELETION, 
    SUCCESS_MESSAGE_ON_UPDATE } from "./messages";


export const criarTipo = async (dados) => {
    try {
        const response = await api.post('/academicflow-api/tipo/cadastrar/', dados);
        return handleSuccess(response, SUCCESS_MESSAGE_ON_CREATION);
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_CREATION);
    }
};

export const buscarTipo = async (parametro) => {
    try {
        const response = await api.get('/academicflow-api/tipo/buscar/nome/', {params: {nome: parametro}})
        if (response.status === 204) {
            return handleInfo(response, INFO_MESSAGE_ON_SEARCHING)
        }
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const atualizarTipo = async (idTipo, dados) => {
    try {
        const response = await api.patch(`/academicflow-api/tipo/atualizar/${encodeURIComponent(idTipo)}/`, dados)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_UPDATE)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_UPDATE)
    }
}

export const excluirTipo = async (idTipo) => {
    try {
        const response = await api.delete(`/academicflow-api/tipo/excluir/${encodeURIComponent(idTipo)}/`)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_DELETION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_DELETION)
    }
}

export const listarTipos = async () => {
    try {
        const response = await api.get('/academicflow-api/tipo/listar/')
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}