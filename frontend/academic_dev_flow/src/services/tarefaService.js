import { NotificationManager } from "react-notifications";
import api from "../api/api";
import { handleError, handleInfo, handleSuccess } from "./utils";
import { ERROR_MESSAGE_ON_CREATION_THE_LABELS, ERROR_MESSAGE_ON_SEARCHING, ERROR_MESSAGE_ON_SYNC, INFO_MESSAGE_MANDATORY_PARAMETERS, INFO_MESSAGE_ON_SEARCHING, SUCCESS_MESSAGE_ON_CREATION, SUCCESS_MESSAGE_ON_CREATION_THE_LABELS, SUCCESS_MESSAGE_ON_SYNC_ISSUES } from "./messages";

export const criarTarefa = async (dadosForm, dadosIssue) => {

    const dadosEnviar = {
        nome: dadosForm.nome,
        data_inicio: dadosForm.data_inicio,
        data_termino: dadosForm.data_termino,
        status: dadosForm.status,
        descricao: dadosForm.descricao,
        id_issue: dadosIssue.issue_id,
        number_issue: dadosIssue.issue_number,
        url_issue: dadosIssue.issue_url,
        tipo: dadosForm.tipo,
        labels: dadosForm.labels,
        projeto: dadosForm.projeto,
        membros: dadosForm.membros,
        iteracao: dadosForm.iteracao
    }
    
    try {
        const response = await api.post('tarefa/cadastrar/', dadosEnviar)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_CREATION)
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

export const listarTarefas = async () => {
    try {
        const response = await api.get('tarefa/listar/')
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const filtrarTarefasPeloNomeEPeloProjeto = async (nomeTarefa, idProjeto) => {
    try {
        const response = await api.get('tarefa/filtrar/nome-projeto/', {params: {nome_tarefa: nomeTarefa, id_projeto: idProjeto}})
        if (response.status === 204) {
            return handleInfo(response, INFO_MESSAGE_ON_SEARCHING)
        }
        return response 
    } catch (error) {
        return handleError(error, INFO_MESSAGE_MANDATORY_PARAMETERS)

    }
}

export const verificarExistenciaIssue = async (parametro) => {
    try {
        const response = await api.get('tarefa/verificar-existencia/', {params: {id_issue: parametro}})
        return response
    } catch (error) {
        if (error.response && error.response.status === 400){
            return handleError(error, 'Parâmetro não informado!')
        } else {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }
    }
}

export const criarLabels = async (dados) => {
    try {
        const response = await api.post('tarefa/labels/cadastrar/', {labels: dados})
        return handleSuccess(response, SUCCESS_MESSAGE_ON_CREATION_THE_LABELS)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_CREATION_THE_LABELS)
    }
}

export const buscarLabelPeloId = async (id) => {
    try {
        const response = await api.get(`tarefa/labels/buscar/${encodeURIComponent(id)}/`)
        return response
        
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const listarLabelsPorProjeto = async (id_projeto) => {
    try {
        const response = await api.get(`tarefa/labels/listar-por-projeto/${encodeURIComponent(id_projeto)}/`)
        return response
    } catch (error) {
        handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const sicronizarIssues = async (dados) => {
    try {
        const response = await api.post('/tarefa/sicronizar-issues/', dados)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_SYNC_ISSUES)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SYNC)
    } 
}

export const iniciarContagemTempo = async (parametros) => {
    try {
        const response = await api.post('tarefa/iniciar-contagem-tempo/', parametros)
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar iniciar a tarefa, contate o suporte!')
    }
}

export const pararContagemTempo = async (parametros) => {
    try {
        const response = await api.post('tarefa/parar-contagem-tempo/', parametros)
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar pausar a tarefa, contate o suporte!')
    }
}