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

export const buscarComentarioTarefaPeloId = async (id) => {
    try {
        const response = await api.get(`/comentario/tarefa/buscar/${encodeURIComponent(id)}/`)
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar os dados, contate o suporte!')
    }
}

export const atualizarComentarioTarefa = async (id, dados) => {
    try {
        const response = await api.patch(`/comentario/tarefa/atualizar/${encodeURIComponent(id)}/`, dados)
        return handleSuccess(response, 'Comentário atualizado com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar atualizar o comentário, contate o suporte!')        
    }
}

export const excluirComentarioTarefa = async (id) => {
    try {
        const response = await api.delete(`/comentario/tarefa/excluir/${encodeURIComponent(id)}/`)
        return handleSuccess(response, 'Comentário excluído com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar excluir o comentário, contate o suporte!')
    }
}

export const listarComentariosPorTarefa = async (id) => {
    try {
        const response = await api.get(`/comentario/tarefa/listar/${encodeURIComponent(id)}/`)
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

export const buscarComentarioArtefatoPeloId = async (id) => {
    try {
        const response = await api.get(`/comentario/artefato/buscar/${encodeURIComponent(id)}/`)
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar os dados, contate o suporte!')
    }
}

export const atualizarComentarioArtefato = async (id, dados) => {
    try {
        const response = await api.patch(`/comentario/artefato/atualizar/${encodeURIComponent(id)}`, dados)
        return handleSuccess(response, 'Comentário excluído com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar atualizar o comentário, contate o suporte!')        
    }
}

export const excluirComentarioArtefato = async (id) => {
    try {
        const response = await api.delete(`/comentario/artefato/excluir/${encodeURIComponent(id)}/`)
        return handleSuccess(response, 'Comentário excluído com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar excluir o comentário, contate o suporte!')
    }
}

export const listarComentariosPorArtefato = async (id) => {
    try {
        const response = await api.get(`/comentario/artefato/listar/${encodeURIComponent(id)}/`)
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar os dados, contate o suporte!')
    }
}

