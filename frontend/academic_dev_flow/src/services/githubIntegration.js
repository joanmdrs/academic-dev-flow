import api from "../api/api";
import { ERROR_MESSAGE_ON_CREATION_THE_CONTENT, SUCCESS_MESSAGE_ON_CREATION_THE_CONTENT } from "./messages";
import { handleError, handleSuccess } from "./utils";

export const createContent = async (dados) => {
    try {
        const response = await api.post('github_integration/create_content/', dados)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_CREATION_THE_CONTENT)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_CREATION_THE_CONTENT)
    }
}