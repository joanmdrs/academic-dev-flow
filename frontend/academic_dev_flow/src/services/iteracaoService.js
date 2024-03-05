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
        NotificationManager.error('Falha na operação, contate o suporte !')
    }

    const response = await api.post('iteracao/cadastrar/', {dados})
    return response
}

export const listarIteracoesPorProjeto = async (idProjeto) => {

    const response = await api.get(`iteracao/listar/${encodeURIComponent(idProjeto)}/`)
    return response 
}