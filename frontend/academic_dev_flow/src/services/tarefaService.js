import { NotificationManager } from "react-notifications";
import api from "../api/api";

export const criarTarefa = async (dados) => {
    try {
        const response = await api.post('tarefa/cadastrar/', dados)
        
        if (response.status === 200){
            NotificationManager.success('Tarefa cadastrada com sucesso !')
            return response
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao cadastrar a tarefa !')
        return {error: 'erro ao cadastrar a tarefa'}
    }
}


export const listarTarefasPorProjeto = async (idProjeto) => {
    try {
        const response = await api.get(`tarefa/listar/projeto/${encodeURIComponent(idProjeto)}/`)

        if(response.status === 200){
            return response
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error("Falha ao buscar tarefas, contate o suporte!")
        return { error: "Erro ao buscar tarefas"};
    }
}
