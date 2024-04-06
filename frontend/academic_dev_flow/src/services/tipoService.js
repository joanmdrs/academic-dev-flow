import api from "../api/api";
import { handleError, handleResponse } from "./utils";
import { 
    ERROR_MESSAGE_ON_CREATION, 
    ERROR_MESSAGE_ON_DELETION, 
    ERROR_MESSAGE_ON_SEARCHING, 
    ERROR_MESSAGE_ON_UPDATE, 
    SUCCESS_MESSAGE_ON_CREATION, 
    SUCCESS_MESSAGE_ON_DELETION, 
    SUCCESS_MESSAGE_ON_UPDATE } from "./messages";


export const criarTipo = async (dados) => {
    try {
        const response = await api.post('tipo/cadastrar/', dados);
        return handleResponse(response, SUCCESS_MESSAGE_ON_CREATION);
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_CREATION);
    }
};

export const buscarTipo = async (parametro) => {
    try {
        const response = await api.get('tipo/buscar/nome/', {params: {nome: parametro}})
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const atualizarTipo = async (idTipo, dados) => {
    try {
        const response = await api.patch(`tipo/atualizar/${encodeURIComponent(idTipo)}/`, dados)
        return handleResponse(response, SUCCESS_MESSAGE_ON_UPDATE)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_UPDATE)
    }
}

export const excluirTipo = async (idTipo) => {
    try {
        const response = await api.delete(`tipo/excluir/${encodeURIComponent(idTipo)}/`)
        return handleResponse(response, SUCCESS_MESSAGE_ON_DELETION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_DELETION)
    }
}

export const listarTipos = async () => {
    try {
        const response = await api.get('tipo/listar/')
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}