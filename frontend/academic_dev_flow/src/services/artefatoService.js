import api from "../api/api" 
import { ERROR_MESSAGE_ON_CREATION, ERROR_MESSAGE_ON_DELETION, ERROR_MESSAGE_ON_SEARCHING, ERROR_MESSAGE_ON_SYNC, ERROR_MESSAGE_ON_UPDATE, INFO_MESSAGE_MANDATORY_PARAMETERS, INFO_MESSAGE_ON_SEARCHING, SUCCESS_MESSAGE_ON_CREATION, SUCCESS_MESSAGE_ON_DELETION, SUCCESS_MESSAGE_ON_SYNC_ARTIFACTS, SUCCESS_MESSAGE_ON_UPDATE } from "./messages"
import { handleError, handleInfo, handleSuccess } from "./utils"

export const criarArtefato = async (dados) => {

    const dadosEnviar = {
        nome: dados.nome,
        status: dados.status,
        descricao: dados.descricao,
        id_file: dados.id_file,
        path_file: dados.path_file,
        projeto: dados.projeto,
        iteracao: dados.iteracao
    }
    try {
        const response = await api.post('/academicflow-api/artefato/cadastrar/', dadosEnviar)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_CREATION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_CREATION)
    }   
}

export const buscarArtefatoPeloNome =  async (parametro) => {
    try {
        const response = await api.get('/academicflow-api/artefato/buscar/', {params: {nome: parametro}})
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const buscarArtefatoPeloId = async (id) => {
    try {
        const response = await api.get(`/academicflow-api/artefato/buscar/${encodeURIComponent(id)}/`)
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const atualizarArtefato = async (id, dados) => {
    try {
        const response = await api.patch(`/academicflow-api/artefato/atualizar/${encodeURIComponent(id)}/`, dados)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_UPDATE)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_UPDATE)
    }
}

export const excluirArtefato = async (id) => {
    try {
        const response = await api.delete(`/academicflow-api/artefato/excluir/${encodeURIComponent(id)}/`)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_DELETION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_DELETION)
    }
}

export const listarArtefatos = async () => {
    try {
        const response = await api.get('/academicflow-api/artefato/listar/')
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const listarArtefatosPorProjeto = async (idProjeto) => {
    try {
        const response = await api.get(`/academicflow-api/artefato/listar/projeto/${encodeURIComponent(idProjeto)}/`)
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
} 

export const listarArtefatosPorIteracao = async (idIteracao) => {
    try {
        const response = await api.get(`/academicflow-api/artefato/listar/iteracao/${encodeURIComponent(idIteracao)}/`)
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
} 

export const filtrarArtefatosPeloNomeEPeloProjeto = async (nomeArtefato, idProjeto) => {
    try {
        const response = await api.get('/academicflow-api/artefato/filtrar/nome-projeto/', {params: {nome_artefato: nomeArtefato, id_projeto: idProjeto}})
        if (response.status === 204) {
            return handleInfo(response, INFO_MESSAGE_ON_SEARCHING)
        }
        return response 
    } catch (error) {

        if (error.response && error.response.status === 400){
            return handleError(error, INFO_MESSAGE_MANDATORY_PARAMETERS)
        } else {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }

    }
}

export const verificarExistenciaArquivo = async (parametro) => {
    try {
        const response = await api.get('/academicflow-api/artefato/verificar-existencia/', {params: {sha_file: parametro}})
        return response
        
    } catch (error) {
        if (error.response && error.response.status === 400){
            return handleError(error, 'Parâmetro não informado!')
        } else {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }
    }
}

export const sicronizarContents = async (dados) => {
    try {
        const response = await api.post('/academicflow-api/artefato/sicronizar-contents/', dados)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_SYNC_ARTIFACTS)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SYNC)
    }   
}

export const atualizarIteracaoDosArtefatos = async (dados) => {
    try {
        const response = await api.patch('/academicflow-api/artefato/atualizar-iteracao/', dados)
        return handleSuccess(response, 'Atribuição de artefatos à iteração realizada com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha durante a atribuição dos artefatos à iteração, contate o suporte!')
    }
}