import api from "../api/api";
import { ERROR_MESSAGE_ON_CREATION, ERROR_MESSAGE_ON_DELETION, ERROR_MESSAGE_ON_SEARCHING, ERROR_MESSAGE_ON_UPDATE, SUCCESS_MESSAGE_ON_CREATION, SUCCESS_MESSAGE_ON_DELETION, SUCCESS_MESSAGE_ON_UPDATE } from "./messages";
import { handleError, handleSuccess } from "./utils";

export const cadastrarFeedback = async (formData) => {
    try {
        const response = await api.post('/feedback/cadastrar/', formData)
        return handleSuccess(response, 'Feedback cadastrado com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar cadastrar o feedback!')
    }
}

export const atualizarFeedback = async (idFeedback, formData) => {
    try {
        const response = await api.patch('/feedback/atualizar/', formData, {params: {id_feedback: idFeedback}})
        return handleSuccess(response, 'Feedback atualizado com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar atualizar o feedback!')
    }
}

export const buscarFeedbackPeloID = async (idFeedback) => {
    try {
        const response = await api.get('/feedback/buscar_pelo_id/', {params: {id_feedback: idFeedback}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar os dados do feedback!')
    }
}

export const listarFeedback = async () => {
    try {
        const response = await api.get('/feedback/listar/')
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar listar os feedbacks!')
    }
}

export const filtrarFeedbackByCreated = async () => {
    try {
        const response = await api.get('/feedback/filtrar_por_created_by/')
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar listar os feedbacks do usuário!')
    }
}