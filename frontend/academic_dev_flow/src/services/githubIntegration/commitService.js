import api from "../../api/api"
import { ERROR_MESSAGE_ON_SEARCHING } from "../messages"
import { handleError } from "../utils"

export const filtrarCommitsPorPeriodoEUsuario = async (parametros) => {
    try {
        const response = await api.get('github_integration/commits/filter_commits/', {params: parametros})
        return response

    } catch (error) {

        if (error && error.status === 400){
            return handleError(error, "Revise os parâmetros de busca informados, ou contate o suporte!")
        }
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}