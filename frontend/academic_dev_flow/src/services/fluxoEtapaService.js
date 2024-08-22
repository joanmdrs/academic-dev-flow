import api from "../api/api"
import { ERROR_MESSAGE_ON_SEARCHING } from "./messages"
import { handleError, handleSuccess } from "./utils"

export const vincularEtapaFluxo = async (dados) => {
    try {
        const response = await api.post("/academicflow-api/fluxo_etapa/cadastrar/", {etapas: dados})
        return handleSuccess(response, "Etapa(s) vinculada(s) ao fluxo com sucesso !")
    } catch (error) {
        return handleError(error, 'Falha ao tentar vincular a etapa ao fluxo, contate o suporte!')
    } 
}

export const atualizarEtapaFluxo = async (dados, id) => {
    try {
        const response = await api.patch(`/academicflow-api/fluxo_etapa/atualizar/${encodeURIComponent(id)}/`, dados)
        return response
    } catch (error) {
        return handleError(error, 'Ocorreu um problema durante a operação, contate o suporte!')
    }
}

export const listarEtapasPorFluxo = async (idFluxo) => {
    try {
        const response = await api.get(`/academicflow-api/fluxo_etapa/buscar/${encodeURIComponent(idFluxo)}/`)
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const desvincularEtapaFluxo = async (idFluxo, idsEtapas) => {
    try {
        const response = await api.delete('/academicflow-api/fluxo_etapa/excluir/', {params: {
            id_fluxo: idFluxo,
            ids_etapas: idsEtapas
        }})

        return handleSuccess(response, 'O vínculo entre o fluxo e a(s) etapa(s) foi excluído com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar excluir o vínculo entre o fluxo e a(s) etapa(s) !')
    }
}