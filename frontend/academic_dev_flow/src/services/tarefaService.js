import { NotificationManager } from "react-notifications";
import api from "../api/api";
import { handleError, handleInfo, handleSuccess } from "./utils";
import { 
    ERROR_MESSAGE_ON_SEARCHING, 
    ERROR_MESSAGE_ON_SYNC, 
    INFO_MESSAGE_MANDATORY_PARAMETERS, 
    INFO_MESSAGE_ON_SEARCHING, 
    SUCCESS_MESSAGE_ON_CREATION,
    SUCCESS_MESSAGE_ON_SYNC_ISSUES } from "./messages";

export const criarTarefa = async (formData, issueData) => {

    const sendData = {
        nome: formData.nome,
        descricao: formData.descricao,
        data_inicio: formData.data_inicio,
        data_termino: formData.data_termino,
        status: formData.status,
        id_issue: issueData ? issueData.issue_id : null,
        number_issue: issueData ? issueData.issue_number : null,
        url_issue: issueData ? issueData.issue_url : null,
        projeto: formData.projeto,
        membros: formData.membros,
        iteracao: formData.iteracao,
        categoria: formData.categoria
    }
    
    try {
        const response = await api.post('tarefa/cadastrar/', sendData)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_CREATION)
    } catch (error) {
        return handleError(error, 'Falha ao tentar criar a tarefa !')
    }
}

export const atualizarTarefa = async (idTarefa, formData, issueData) => {
    const sendData = {
        nome: formData.nome,
        descricao: formData.descricao,
        data_inicio: formData.data_inicio,
        data_termino: formData.data_termino,
        status: formData.status,
        id_issue: issueData ? issueData.issue_id : null,
        number_issue: issueData ? issueData.issue_number : null,
        url_issue: issueData ? issueData.issue_url : null,
        projeto: formData.projeto,
        membros: formData.membros,
        iteracao: formData.iteracao,
        categoria: formData.categoria
    }
    
    try {
        const response = await api.patch(`tarefa/atualizar/`,sendData, {params: {id_tarefa: idTarefa}})
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

export const atualizarStatusTarefa = async (idTarefa, data) => {
    try {
        const response = await api.patch('/tarefa/atualizar-status/', data, {params: {id_tarefa: idTarefa}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar atualizar o status da tarefa')
    }
}

export const vincularIteracaoAsTarefas = async (idsTarefas, idIteracao) => {
    const sendData = {
        ids_tarefas: idsTarefas,
        id_iteracao: idIteracao
    }
    try {
        const response = await api.patch('tarefa/atualizar-iteracao/', sendData)
        return handleSuccess(response, 'Atribuição de tarefas a iteração realizada com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha durante a atribuição das tarefas a iteração, contate o suporte!')
    }
}

export const buscarTarefaPeloId = async (idTarefa) => {
    try {
        const response = await api.get(`tarefa/buscar-pelo-id/`, {params: {id_tarefa: idTarefa}})
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const BuscarTarefasPeloNomeEPeloProjeto = async (nomeTarefa, idProjeto) => {
    try {
        const response = await api.get(
            'tarefa/buscar-pelo-nome-e-pelo-projeto/', {params: {nome_tarefa: nomeTarefa, id_projeto: idProjeto}})
        if (response.status === 204) {
            return handleInfo(response, INFO_MESSAGE_ON_SEARCHING)
        }
        return response 
    } catch (error) {
        return handleError(error, INFO_MESSAGE_MANDATORY_PARAMETERS)

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

export const listarTarefasPorProjeto = async (idProjeto) => {
    try {
        const response = await api.get('tarefa/listar-por-projeto', {params: {id_projeto: idProjeto}})

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
        const response = await api.get('tarefa/listar-por-iteracao/', {params: {id_iteracao: idIteracao}})
        return response
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao buscar as tarefas, contate o suporte!')
        return { error: "Erro ao buscar as tarefas"}
    }
}

export const excluirTarefas = async (idsTarefas) => {
    try {
        const response = await api.delete('tarefa/excluir/', {data: { ids_tarefas: idsTarefas}})
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

export const iniciarContagemTempo = async (sendData) => {
    try {
        const response = await api.post('tarefa/iniciar-contagem-tempo/', sendData)
        return handleSuccess(response, 'Você está iniciando uma tarefa !')
    } catch (error) {
        return handleError(error, 'Falha ao tentar iniciar a tarefa, contate o suporte!')
    }
}

export const pararContagemTempo = async (sendData) => {
    try {
        const response = await api.post('tarefa/parar-contagem-tempo/', sendData)
        return handleSuccess(response, 'Você está pausando uma tarefa !')
    } catch (error) {
        return handleError(error, 'Falha ao tentar pausar a tarefa, contate o suporte!')
    }
}


export const concluirTarefas = async (ids) => {
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

export const sicronizarIssues = async (dados) => {
    try {
        const response = await api.post('/tarefa/sicronizar-issues/', dados)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_SYNC_ISSUES)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SYNC)
    } 
}

export const listarTarefasDoMembro = async (idMembro) => {
    try {
        const response = await api.get('/tarefa/listar-por-membro/', { params: { id_membro: idMembro } })

        // Verifica se a resposta contém o código "MEMBRO_SEM_PROJETO"
        if (response.data?.code === 'MEMBRO_SEM_PROJETO') {
            // Trate o caso específico onde o membro não está vinculado a nenhum projeto
            return {
                message: 'O membro não está vinculado a nenhum projeto',
                empty: true, // Define um indicador customizado para que o frontend saiba que não há projetos
            };
        }

        // Retorna os dados normais se não for o caso acima
        return response;
        
    } catch (error) {
        return handleError(error, 'Falha ao listar as suas tarefas !');
    }
}
