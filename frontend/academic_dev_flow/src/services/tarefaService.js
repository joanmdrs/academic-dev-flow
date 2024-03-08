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

export const listarTarefasPorIteracao = async (idIteracao) => {
    try {
        const response = await api.get(`tarefa/listar/iteracao/${encodeURIComponent(idIteracao)}/`)
        return response
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao buscar as tarefas, contate o suporte!')
        return { error: "Erro ao buscar as tarefas"}
    }
}

export const atualizarTarefa = async (id, dados) => {
    try {
        const response = await api.patch(`tarefa/atualizar/${encodeURIComponent(id)}/`, dados)
        if (response.status === 200){
            NotificationManager.success('Tarefa atualizada com sucesso !')
            return response
        }
        
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao atualizar a tarefa, contate o suporte!')
        return {error: 'Erro ao atualizar a tarefa!'}
    }
}

export const excluirTarefas = async (ids) => {
    try {
        const response = await api.delete('tarefa/excluir/',{params: {ids: ids}})
        if (response.status === 204){
            NotificationManager.success('Tarefa(s) excluída(s) com sucesso!')
            return response
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao excluir a(s) tarefa(s), contate o suporte!')
        return {error: 'Erro ao excluir a(s) tarefa(s)!'}
    }
}

export const concluirTarefas = async (ids) => {
    console.log(ids)
    try {
        const response = await api.patch('tarefa/concluir/', {ids})
        if (response.status === 200){
            NotificationManager.success('Tarefa(s) concluída(s) com sucesso!')
            return response
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao concluir a(s) tarefa(s), contate o suporte!')
        return {error: 'Erro ao concluir a(s) tarefa(s)!'}
    }
}

export const reabrirTarefas = async (ids) => {
    try {
        const response = await api.patch('tarefa/reabrir/', {ids})
        if (response.status === 200){
            NotificationManager.success('Tarefa(s) reaberta(s) com sucesso!')
            return response
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao reabrir a(s) tarefa(s), contate o suporte!')
        return {error: 'Erro ao reabrir a(s) tarefa(s)!'}
    }
}