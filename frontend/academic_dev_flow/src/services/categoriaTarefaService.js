import api from "../api/api";
import { handleError, handleSuccess } from "./utils";
import { 
    ERROR_MESSAGE_ON_CREATION, 
    ERROR_MESSAGE_ON_DELETION, 
    ERROR_MESSAGE_ON_SEARCHING, 
    ERROR_MESSAGE_ON_UPDATE, 
    SUCCESS_MESSAGE_ON_CREATION, 
    SUCCESS_MESSAGE_ON_DELETION, 
    SUCCESS_MESSAGE_ON_UPDATE } from "./messages";

export const cadastrarCategoriaTarefa = async (sendData) => {
    try {
        const response = await api.post('tarefa/categoria/cadastrar/', sendData)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_CREATION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_CREATION)
    }
}

export const atualizarCategoriaTarefa = async (idTarefa, sendData) => {
    try {
        const response = await api.patch(`tarefa/categoria/atualizar/?id_categoria_tarefa=${encodeURIComponent(idTarefa)}`, sendData)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_UPDATE)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_UPDATE)
    }
}

export const buscarCategoriaTarefaPeloNome = async (nomeCategoriaTarefa) => {
    try {
        const response = await api.get('tarefa/categoria/buscar-pelo-nome/', {params: {nome_categoria_tarefa: nomeCategoriaTarefa}})
        return response 
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const buscarCategoriaTarefaPeloID = async (idCategoriaTarefa) => {
    try {
        const response = await api.get('tarefa/categoria/buscar-pelo-id/', {params: {id_categoria_tarefa: idCategoriaTarefa}})
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const listarCategoriaTarefa = async () => {
    try {
        const response = await api.get('tarefa/categoria/listar/')
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const excluirCategoriaTarefa = async (idsCategoriaTarefa) => {
    try {
        const response = await api.delete('tarefa/categoria/excluir/', {data: {ids_categoria_tarefa: idsCategoriaTarefa}})
        return handleSuccess(response, SUCCESS_MESSAGE_ON_DELETION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_DELETION)
    }
}