import api from "../api/api" 
import { ERROR_MESSAGE_ON_CREATION, ERROR_MESSAGE_ON_DELETION, ERROR_MESSAGE_ON_SEARCHING, ERROR_MESSAGE_ON_SYNC, ERROR_MESSAGE_ON_UPDATE, INFO_MESSAGE_MANDATORY_PARAMETERS, INFO_MESSAGE_ON_SEARCHING, SUCCESS_MESSAGE_ON_CREATION, SUCCESS_MESSAGE_ON_DELETION, SUCCESS_MESSAGE_ON_SYNC_ARTIFACTS, SUCCESS_MESSAGE_ON_UPDATE } from "./messages"
import { handleError, handleInfo, handleSuccess } from "./utils"

export const criarArtefato = async (formData) => {
    try {
        const response = await api.post('/artefato/cadastrar/', formData)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_CREATION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_CREATION)
    }   
}

export const atualizarArtefato = async (idArtefato, formData) => {
    try {
        const response = await api.patch('artefato/atualizar/', formData, {params: {id_artefato: idArtefato}})
        return handleSuccess(response, SUCCESS_MESSAGE_ON_UPDATE)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_UPDATE)
    }
}

export const atualizarIteracaoDosArtefatos = async (idsArtefatos, idIteracao) => {
    const sendData = {
        ids_artefatos: idsArtefatos,
        id_iteracao: idIteracao
    }
    try {
        const response = await api.patch('/artefato/atualizar-iteracao/', sendData)
        return handleSuccess(response, 'Atribuição de artefatos à iteração realizada com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha durante a atribuição dos artefatos à iteração, contate o suporte!')
    }
}

export const buscarArtefatoPeloNome =  async (nomeArtefato) => {
    try {
        const response = await api.get('artefato/buscar-por-nome/', {params: {nome_artefato: nomeArtefato}})
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const buscarArtefatoPeloId = async (idArtefato) => {
    try {
        const response = await api.get('artefato/buscar-por-id/', {params: {id_artefato: idArtefato}})
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const listarArtefatos = async () => {
    try {
        const response = await api.get('/artefato/listar/')
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const listarArtefatosPorProjeto = async (idProjeto) => {
    try {
        const response = await api.get('/artefato/listar-por-projeto/', {params: {id_projeto: idProjeto}})
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
} 

export const listarArtefatosPorIteracao = async (idIteracao) => {
    try {
        const response = await api.get('/artefato/listar-por-iteracao/', {params: {id_iteracao: idIteracao}})
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
} 

export const buscarArtefatosPeloNomeEPeloProjeto = async (nomeArtefato, idProjeto) => {
    try {
        const response = await api.get(
            'artefato/buscar-por-nome-e-por-projeto/',
            {params: {nome_artefato: nomeArtefato, id_projeto: idProjeto}})
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

export const excluirArtefato = async (idsArtefatos) => {
    try {
        const response = await api.delete('/artefato/excluir/', {data: { ids_artefatos: idsArtefatos}})
        return handleSuccess(response, SUCCESS_MESSAGE_ON_DELETION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_DELETION)
    }
}

export const verificarExistenciaArquivo = async (parametro) => {
    try {
        const response = await api.get('artefato/verificar-existencia/', {params: {sha_file: parametro}})
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
        const response = await api.post('/artefato/sicronizar-contents/', dados)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_SYNC_ARTIFACTS)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SYNC)
    }   
}

export const listarArtefatosDosProjetosDoMembro = async (idMembro) => {
    try {
        const response = await api.get('/artefato/listar-artefatos-dos-projetos-do-membro/', { params: { id_membro: idMembro } })

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
        return handleError(error, 'Falha ao listar os artefatos dos seus projetos')
    }
}

export const filtrarArtefatosPorProjetoEPorMembro = async (formData) => {
    try {
        const response = await api.get(
            'artefato/filtrar-por-projeto-e-por-membro/', 
            {params: {id_membro: formData.membroSelect, id_projeto: formData.projetoSelect}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar filtrar os artefatos !')
    }
}
