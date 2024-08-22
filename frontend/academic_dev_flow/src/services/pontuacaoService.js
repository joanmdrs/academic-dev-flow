import api from "../api/api";
import { NotificationManager } from "react-notifications";

export const registrarPontuacao = async (dados) => {
    try {
        const response = await api.post('/academicflow-api/pontuacao/cadastrar/', dados)
        if (response.status === 200){
            NotificationManager.success('Pontuação registrada com sucesso !')
            return response
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao registrar a pontuação, contate o suporte!')
        return {error: 'Falha ao registrar a pontuação!'}
    }   
}

export const buscarPontuacaoPeloId = async (id) => {
    try {
        const response = await api.get(`/academicflow-api/pontuacao/buscar/${encodeURIComponent(id)}/`)
        if (response.status === 200){
            return response
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao buscar os dados, contate o suporte!')
        return {error: 'Falha ao buscar os dados'}
    }
}

export const atualizarPontuacao = async (id, dados) => {
    try {
        const response = await api.patch(`/academicflow-api/pontuacao/atualizar/${encodeURIComponent(id)}/`, dados)
        if (response.status === 200){
            NotificationManager.success('Pontuação atualizada com sucesso!')
            return response
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao atualizar a pontuação, contate o suporte!')
        return {error: 'Falha ao atualizar a pontuação!'}
    }
}

export const excluirPontuacao = async (id) => {
    try {
        const response = await api.delete(`/academicflow-api/pontuacao/excluir/${encodeURIComponent(id)}/`)
        if (response.status === 204){
            NotificationManager.success("Pontuação excluída com sucesso!")
            return response
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao excluir a pontuação, contate o suporte!')
        return {error: 'Falha ao excluir a pontuação!'}
    }
}