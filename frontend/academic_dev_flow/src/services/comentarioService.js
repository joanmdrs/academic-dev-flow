import api from "../api/api";
import { handleError, handleSuccess } from "./utils";

export const criarComentarioTarefa = async (dados) => {
    try {
        const response = await api.post('/comentario/tarefa/cadastrar/', dados)
        return handleSuccess(response, 'Comentário cadastrado com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar criar o comentário, contate o suporte!')
    }
}

export const buscarComentarioTarefaPeloId = async (idComentario) => {
    try {
        const response = await api.get(`/comentario/tarefa/buscar/`, {params: {id_comentario: idComentario}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar os dados, contate o suporte!')
    }
}

export const atualizarComentarioTarefa = async (idComentario, dados) => {
    try {
        const response = await api.patch(`/comentario/tarefa/atualizar/`, dados, {params: {id_comentario: idComentario}})
        return handleSuccess(response, 'Comentário atualizado com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar atualizar o comentário, contate o suporte!')        
    }
}

export const excluirComentarioTarefa = async (idComentario) => {
    try {
        const response = await api.delete(`/comentario/tarefa/excluir/`, {params: {id_comentario: idComentario}})
        return handleSuccess(response, 'Comentário excluído com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar excluir o comentário, contate o suporte!')
    }
}

export const listarComentariosPorTarefa = async (idTarefa) => {
    try {
        const response = await api.get(`/comentario/tarefa/listar/`, {params: {id_tarefa: idTarefa}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar os dados, contate o suporte!')
    }
}

export const criarComentarioArtefato = async (dados) => {
    try {
        const response = await api.post('/comentario/artefato/cadastrar/', dados)
        return handleSuccess(response, 'Comentário cadastrado com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar criar o comentário, contate o suporte!')
    }
}

export const buscarComentarioArtefatoPeloId = async (idComentario) => {
    try {
        const response = await api.get(`/comentario/artefato/buscar/`, {params: {id_comentario: idComentario}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar os dados, contate o suporte!')
    }
}

export const atualizarComentarioArtefato = async (idComentario, dados) => {
    try {
        const response = await api.patch(`/comentario/artefato/atualizar/`, dados, {params: {id_comentario: idComentario}})
        return handleSuccess(response, 'Comentário atualizado com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar atualizar o comentário, contate o suporte!')        
    }
}

export const excluirComentarioArtefato = async (idComentario) => {
    try {
        const response = await api.delete(`/comentario/artefato/excluir/`, {params: {id_comentario: idComentario}})
        return handleSuccess(response, 'Comentário excluído com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar excluir o comentário, contate o suporte!')
    }
}

export const listarComentariosPorArtefato = async (idArtefato) => {
    try {
        const response = await api.get(`/comentario/artefato/listar/`, {params: {id_artefato: idArtefato}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar os dados, contate o suporte!')
    }
}

