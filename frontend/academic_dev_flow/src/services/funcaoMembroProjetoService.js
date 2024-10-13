import api from "../api/api"
import { ERROR_MESSAGE_ON_CREATION, ERROR_MESSAGE_ON_DELETION, ERROR_MESSAGE_ON_SEARCHING, ERROR_MESSAGE_ON_UPDATE, SUCCESS_MESSAGE_ON_CREATION, SUCCESS_MESSAGE_ON_DELETION, SUCCESS_MESSAGE_ON_UPDATE } from "./messages"
import { handleError, handleSuccess } from "./utils"

export const cadastrarCategoriaFuncaoMembro = async (requestData) => {
    try {
        const response = await api.post('funcao-membro/categoria/cadastrar/', requestData)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_CREATION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_CREATION)
    }
}

export const atualizarCategoriaFuncaoMembro = async (idCategoria, requestData) => {
    try {
        const response = await api.patch(
            `funcao-membro/categoria/atualizar/?id_categoria=${encodeURIComponent(idCategoria)}`, requestData)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_UPDATE)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_UPDATE)
    }
}

export const buscarCategoriaFuncaoMembroPeloNome = async (nomeCategoria) => {
    try {
        const response = await api.get(
            `funcao-membro/categoria/buscar-pelo-nome/?nome_categoria=${encodeURIComponent(nomeCategoria)}`)
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const buscarCategoriaFuncaoMembroPeloId = async (idCategoria) => {
    try {
        const response = await api.get(
            `funcao-membro/categoria/buscar-pelo-id/?id_categoria=${encodeURIComponent(idCategoria)}`
        )
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const listarCategoriaFuncaoMembro = async () => {
    try {
        const response = await api.get('funcao-membro/categoria/listar/')
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const excluirCategoriaFuncaoMembro = async (idsCategoria) => {
    console.log(idsCategoria)
    try {
        const response = await api.delete('funcao-membro/categoria/excluir/', { data: { ids_categoria: idsCategoria }} )
        return handleSuccess(response, SUCCESS_MESSAGE_ON_DELETION)
    } catch (error) {
        if (error.response && error.response.status === 409){
            return handleError(error, "Não é possível excluir uma ou mais categorias, pois elas estão associadas a uma ou mais funções de membros existentes.")
        }
        return handleError(error, ERROR_MESSAGE_ON_DELETION)
    }
}

export const cadastrarFuncaoMembroProjeto = async (formData) => {
    try {
        const response = await api.post('funcao-membro/cadastrar/', formData)
        return handleSuccess(response, 'Função(es) atribuída(s) ao membro com sucesso !')
    } catch (error) {
        return handleError(error, 'Falha ao tentar atribuir a função do membro !')   
    }
}

export const atualizarFuncaoMembroProjeto = async (idFuncaoMembro, formData) => {
    try {
        const response = await api.patch('funcao-membro/atualizar/', formData, {params: {id_funcao_membro: idFuncaoMembro}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar atualizar a função do membro !')
    }
}

export const filtrarFuncaoMembroProjeto = async (params) => {
    try {
        const response = await api.get('funcao-membro/filtrar/', {params: params})
        return response
    } catch (error) {   
        return handleError(error, 'Falha durante a filtragem !')
    }
}

export const listarFuncaoMembro = async () => {
    try {
        const response = await api.get('funcao-membro/listar/')
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const listarFuncaoMembroProjetoDoMembro = async (idMembroProjeto) => {
    try {
        const response = await api.get(
            'funcao-membro/listar-funcoes-do-membro/', {params: {id_membro_projeto: idMembroProjeto}})
        return response
    } catch (error) {
        return handleError('Falha ao tentar listar as funções do membro selecionado !')
    }
}

export const excluirFuncaoMembroProjeto = async (idMembroProjeto) => {
    try {
        const response = await api.delete('funcao-membro/excluir/',  {params: {id_membro_projeto: idMembroProjeto}})
        return handleSuccess(response, 'Função desvinculada do membro selecionado com sucesso !')
    } catch (error) {
        return handleError('Falha ao tentar excluir a função do membro selecionado !')
    }
}