import api from "../../api/api"
import { handleError, handleSuccess } from "../utils"
import { 
    ERROR_MESSAGE_ON_CREATION_THE_ISSUE, 
    ERROR_MESSAGE_ON_GET_LABELS, 
    ERROR_MESSAGE_ON_LIST_ISSUES, 
    ERROR_MESSAGE_ON_UPDATE_THE_ISSUE, 
    SUCCESS_MESSAGE_ON_CREATION_THE_ISSUE, 
    SUCCESS_MESSAGE_ON_UPDATE_THE_ISSUE, } from "../messages"

export const createIssue = async (dados) => {
    try {
        const response = await api.post('github_integration/issues/create_issue/', dados)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_CREATION_THE_ISSUE)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_CREATION_THE_ISSUE)
    }
}

export const updateIssue = async (numberIssue, dados) => {
    try {
        const response = await api.put(`github_integration/issues/update_issue/${numberIssue}/`, dados)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_UPDATE_THE_ISSUE)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_UPDATE_THE_ISSUE)
    }
}

export const listIssues = async () => {
    try {
        const response = await api.get('github_integration/issues/list_issues/')
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_LIST_ISSUES)
    }
}

export const getLabels = async () => {
    try {
        const response = await api.get('github_integration/issues/get_labels/')
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_GET_LABELS)
    }
}