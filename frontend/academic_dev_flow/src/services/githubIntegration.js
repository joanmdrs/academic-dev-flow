import api from "../api/api";
import { ERROR_MESSAGE_ON_CREATION_THE_CONTENT, SUCCESS_MESSAGE_ON_CREATION_THE_CONTENT } from "./messages";
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
        return handleError(error, ERROR_MESSAGE_ON_CREATION_THE_CONTENT)
    }
}