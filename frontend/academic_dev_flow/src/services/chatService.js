import api from "../api/api";
import { handleError, handleSuccess } from "./utils";

export const cadastrarChat = async (data) => {
    try {
        const response = await api.post('chat/cadastrar/', data)
        return handleSuccess(response, 'Chat criado com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar cadastrar o chat!')        
    }
}

export const atualizarChat = async (idChat, data) => {
    try {
        const response = await api.patch('chat/atualizar/', {
            params: { id_chat: idChat },
            data: data
        });
        return handleSuccess(response, 'As informações do Chat foram atualizadas!')    
    } catch (error) {
        return handleError(error, 'Falha ao tentar atualizar as informações do chat!')
    }
}

export const excluirChat = async (idChat) => {
    try {
        const response = await api.delete('chat/excluir/', {params: {id_chat: idChat}})
        return handleSuccess(response, 'Chat excluído com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar excluir o Chat!')
    }
}

export const cadastrarMensagemNoChat = async (data) => {
    try {
        const response = await api.post('chat/cadastrar-mensagem/', data)
        return handleSuccess(response, 'Mensagem cadastrada com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar cadastrar a mensagem!')
    }
}

export const atualizarMensagemDoChat =  async (idMensagem, data) => {
    try {
        const response = await api.patch('chat/atualizar-mensagem/', {
            params: {id_mensagem: idMensagem},
            data: data
        })
        return handleSuccess(response, 'Mensagem atualizada com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar atualizar a mensagem!')
    }
}

export const excluirMensagemDoChat = async (idMensagem) => {
    try {
        const response = await api.delete('chat/excluir/', {params: {id_mensagem: idMensagem}})
        return handleSuccess(response, 'Falha ao tentar excluir a mensagem!')
    } catch (error) {   
        return handleError(error, 'Falha ao tentar excluir a mensagem!')
    }
}