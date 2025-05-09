import api from "../api/api";
import { ERROR_MESSAGE_ABSENCE_PARAMETERS, ERROR_MESSAGE_ON_CREATION_THE_CONTENT, ERROR_MESSAGE_ON_DELETION, ERROR_MESSAGE_ON_LIST_CONTENTS, ERROR_MESSAGE_ON_SEARCHING, ERROR_MESSAGE_ON_SEARCHING_THE_CONTENT, SUCCESS_MESSAGE_ON_CREATION_THE_CONTENT, SUCCESS_MESSAGE_ON_DELETION_THE_CONTENT } from "./messages";
import { handleError, handleInfo, handleSuccess } from "./utils";

export const createContent = async (dados) => {

    const dadosEnviar = {
        github_token: dados.github_token,
        repository: dados.repository,
        content: dados.content,
        commit_message: dados.commit_message,
        path: dados.path_file,
        author_name: dados.author_name,
        author_email: dados.author_email
    }
    
    try {
        const response = await api.post('github_integration/create_content/', dadosEnviar)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_CREATION_THE_CONTENT)
    } catch (error) {
        if (error.response && error.response.status === 409) {
            return handleError(error, 'Um arquivo com o mesmo caminho já existe. Escolha outro caminho.');
        } else {
            return handleError(error, ERROR_MESSAGE_ON_CREATION_THE_CONTENT);
        }
    }
}

export const updateContent = async (data) => {
    const sendData = {
        github_token: data.github_token,
        repository: data.repository,
        content: data.content,
        commit_message: data.commit_message,
        path: data.path_file,
    }
    try {
        const response = await api.patch('github_integration/update_content', sendData)
        return handleSuccess(response, 'Informações do content atualizadas com sucesso !')
    } catch (error) {
        
    }
}

export const getContent = async (parametros) => {
    try {
        const response = await api.get('github_integration/get_content/', {params: {
            github_token: parametros.github_token,
            repository: parametros.repository,
            path: parametros.path 
        }})
        return response
    } catch (error) {
        if (error.response && error.response.status === 404){
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING_THE_CONTENT)
        } else {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }
    }
}

export const deleteContent = async (parametros) => {
    try {
        const response = await api.delete('github_integration/delete_content/', {params: {
            github_token: parametros.github_token,
            repository: parametros.repository,
            path: parametros.path,
            commit_message: parametros.commit_message
        }})

        return handleSuccess(response, SUCCESS_MESSAGE_ON_DELETION_THE_CONTENT)

    } catch (error) {
        if (error.response && error.response.status === 400){
            return handleError(error, ERROR_MESSAGE_ABSENCE_PARAMETERS)
        } else {
            return handleError(error, ERROR_MESSAGE_ON_DELETION)
        }
    }
}

export const listContents = async (parametros) => {
    try {
        const response = await api.get(
            'github_integration/contents/list_contents/', {params: parametros})
        return response
    } catch (error) {
        
        if (error.response && error.response.status === 404){
            return handleError(
                error, 'Conteúdo não encontrado no repositório ou no caminho especificado.')
        } else {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }
    }
}