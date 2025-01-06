import api from "../api/api"
import { ERROR_MESSAGE_ON_SEARCHING } from "./messages"
import { handleError, handleSuccess } from "./utils"

export const vincularEtapaFluxo = async (data) => {
    try {
        const response = await api.post("fluxo_etapa/cadastrar/", data)
        return handleSuccess(response, "Etapa vinculada ao fluxo com sucesso !")
    } catch (error) {
        return handleError(error, 'Falha ao tentar vincular a etapa ao fluxo, contate o suporte!')
    } 
}

export const atualizarFluxoEtapa = async (idFluxoEtapa, data) => {
    try {
        const response = await api.patch(`fluxo_etapa/atualizar/?id_fluxo_etapa=${encodeURIComponent(idFluxoEtapa)}/`, data)
        return handleSuccess(response, 'Os dados foram atualizados com sucesso !')
    } catch (error) {
        return handleError(error, 'Ocorreu um problema durante a operação, contate o suporte!')
    }
}

export const listarEtapasPorFluxo = async (idFluxo) => {
    try {
        const response = await api.get(`fluxo_etapa/filtrar-por-fluxo/`, {params: {id_fluxo: idFluxo}})
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const desvincularEtapaFluxo = async (idsFluxoEtapas) => {
    try {
        const response = await api.delete('fluxo_etapa/excluir/', {data: {ids_fluxo_etapas: idsFluxoEtapas}})
        return handleSuccess(response, 'O vínculo entre o fluxo e a(s) etapa(s) foi excluído com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar excluir o vínculo entre o fluxo e a(s) etapa(s) !')
    }
}

export const listarFluxoEtapas = async () => {
    try {
        const response = await api.get('fluxo_etapa/listar/')
        return response
    } catch (error) {
        return handleError(error, 'Falha ao buscar os dados, contate o suporte !')
    }
}