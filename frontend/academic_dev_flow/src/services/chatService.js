import api from "../api/api";
import { handleError, handleSuccess } from "./utils";

export const cadastrarChat = async (data) => {
    try {
        const response = await api.post('chat/cadastrar/', data)
        return handleSuccess(response, 'Chat criado com sucesso!')
    } catch (error) {
        if (error.response.data.code === "UNIQUE_CHAT_PROJETO"){
            return handleError(error, error.response.data.error)
        }
        return handleError(error, 'Falha ao tentar cadastrar o chat!')        
    }
}

export const atualizarChat = async (idChat, data) => {
    try {
        const response = await api.patch('chat/atualizar/', data, {params: {id_chat: idChat}});
        return handleSuccess(response, 'As informações do Chat foram atualizadas!')    
    } catch (error) {
        if (error.response.data.code === "UNIQUE_CHAT_PROJETO"){
            return handleError(error, error.response.data.error)
        }
        return handleError(error, 'Falha ao tentar atualizar as informações do chat!')
    }
}

export const buscarChatsDoUsuario = async (idUsuario) => {
    try {
        const response = await api.get('chat/buscar-pelo-id-usuario/', {params: {id_usuario: idUsuario}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar os dados!')
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
        return response
    } catch (error) {
        console.log(error)
        return handleError(error, 'Falha ao tentar cadastrar a mensagem!')
    }
}

export const atualizarMensagemDoChat =  async (idMensagem, data) => {
    try {
        const response = await api.patch('chat/atualizar-mensagem/', data, {params: {id_mensagem: idMensagem}})
        return handleSuccess(response, 'Mensagem atualizada com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar atualizar a mensagem!')
    }
}

export const excluirMensagemDoChat = async (idMensagem) => {
    try {
        const response = await api.delete('chat/excluir-mensagem/', {params: {id_mensagem: idMensagem}})
        return handleSuccess(response, 'Mensagem excluída com sucesso!')
    } catch (error) {   
        console.log(error)
        return handleError(error, 'Falha ao tentar excluir a mensagem!')
    }
}

export const buscarMensagensDoChat = async (idChat) => {
    try {
        const response = await api.get('chat/filtrar-mensagens-por-chat/', {params: {id_chat: idChat}})
        return response
    } catch (error) {
        console.log(error)
        return handleError(error, 'Falha ao buscar as mensagens do chat')
    }
}