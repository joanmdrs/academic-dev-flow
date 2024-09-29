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