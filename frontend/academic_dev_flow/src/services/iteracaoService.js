import { NotificationManager } from "react-notifications";
import api from "../api/api";
import { handleError } from "./utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "./messages";

export const criarIteracao = async (dados) => {
    try {
        const response = await api.post('iteracao/cadastrar/', dados)

        if (response.status === 200){
            NotificationManager.success('Iteração criada com sucesso !')
            return response
        }
        
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao cadastrar a iteração, contate o suporte !')
        return { error: "Erro ao cadastrar a iteração"};
    }
}

export const listarIteracoesPorProjeto = async (idProjeto) => {

    const response = await api.get(`iteracao/listar/${encodeURIComponent(idProjeto)}/`)
    return response 
}

export const atualizarIteracao = async (id, dados) => {

    try {
        const response = await api.patch(`iteracao/atualizar/${encodeURIComponent(id)}/`, dados)
        
        if (response.status === 200){
            NotificationManager.success('Iteração atualizada com sucesso !')
            return response
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha na operação, contate o suporte !')
        return { error: "Erro ao atualizar a iteração"};
    }
}

export const excluirIteracoes = async (ids) => {
    try {
        const response = await api.delete('/iteracao/excluir/',{params: {ids: ids}})
        if (response.status === 204){
            NotificationManager.success('Iteração(oes) excluída(s) com sucesso!')
            return response
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao excluir a(s) iteração(oes), contate o suporte!')
        return {error: 'Erro ao excluir a(s) iteração(oes)!'}
    }
}

export const listarIteracoes = async () => {
    try {
        const response = api.get('/iteracao/listar/')
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}