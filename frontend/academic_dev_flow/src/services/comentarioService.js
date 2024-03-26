import api from "../api/api";
import { NotificationManager } from "react-notifications";

export const criarComentario = async (dados) => {
    try {
        const response = await api.post('comentario/cadastrar/', dados)
        if (response.status === 200){
            NotificationManager.success('Comentário criado com sucesso !')
            return response
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao criar o comentário, contate o suporte!')
        return {error: 'Falha ao criar o comentário!'}
    }   
}

export const buscarComentarioPeloId = async (id) => {
    try {
        const response = await api.get(`comentario/buscar/${encodeURIComponent(id)}/`)
        return response
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao buscar o comentário, contate o suporte!')
        return {error: 'Falha ao buscar o comentário!'}
    }
}

export const atualizarComentario = async (id, dados) => {
    try {
        const response = await api.patch(`comentario/atualizar/${encodeURIComponent(id)}/`, dados)
        if (response.status === 200){
            NotificationManager.success('Comentário atualizado com sucesso!')
            return response
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao atualizar o comentário, contate o suporte!')
        return {error: 'Falha ao atualizar o comentário!'}
    }
}

export const excluirComentario = async (id) => {
    try {
        const response = await api.delete(`comentario/excluir/${encodeURIComponent(id)}/`)
        if (response.status === 204){
            NotificationManager.success('Comentário excluído com sucesso !')
            return response
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao excluir o comentário, contate o suporte!')
        return {error: 'Falha ao excluir o comentário'}
    }
}

export const listarComentariosPorDocumento = async (idDocumento) => {
    try {
        const response = await api.get(`comentario/listar/documento/${encodeURIComponent(idDocumento)}/`)
        if (response.status === 200){
            return response
        }
        
    } catch (error) {
        console.log(error)
        return {error: 'Falha ao excluir o comentário'}
    }
}