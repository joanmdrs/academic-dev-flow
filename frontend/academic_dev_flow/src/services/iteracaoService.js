import { NotificationManager } from "react-notifications";
import api from "../api/api";

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

export const excluirIteracao = async (id) => {
    try {
        const response = await api.delete(`iteracao/excluir/${encodeURIComponent(id)}/`)

        if (response.status === 204){
            NotificationManager.success('Iteração excluída com sucesso !')
            return response
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao excluir a iteração')
        return {error: 'Erro ao excluir a iteração'}
    }
}