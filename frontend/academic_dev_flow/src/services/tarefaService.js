import { NotificationManager } from "react-notifications";
import api from "../api/api";

export const listarTarefasPorProjeto = async (idProjeto) => {
    try {
        const response = await api.get(`tarefa/listar/${encodeURIComponent(idProjeto)}/`)

        if(response.status === 200){
            return response
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error("Falha ao buscar tarefas, contate o suporte!")
        return { error: "Erro ao buscar tarefas"};
    }
}
