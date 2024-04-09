import api from "../api/api";
import { ERROR_MESSAGE_ON_CREATION_THE_CONTENT, ERROR_MESSAGE_ON_SEARCHING, ERROR_MESSAGE_ON_SEARCHING_THE_CONTENT, SUCCESS_MESSAGE_ON_CREATION_THE_CONTENT } from "./messages";
import { handleError, handleSuccess } from "./utils";

export const createContent = async (dados) => {

    const dadosEnviar = {
        github_token: dados.github_token,
        repository: dados.repository,
        content: dados.descricao,
        commit_message: dados.commit_message,
        path: dados.path_github,
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

export const getContent = async (parametros) => {
    try {
        const response = await api.get('github_integration/get_content/', {params: {
            github_token: parametros.github_token,
            repository: parametros.github_token,
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