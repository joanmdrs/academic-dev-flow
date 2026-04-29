import api from "../api/api"
import { ERROR_MESSAGE_ON_SEARCHING } from "./messages"
import { handleError, handleSuccess } from "./utils"

export const vincularEtapaFluxo = async (data) => {
    try {
        const response = await api.post("fluxo-etapas/", data)
        return handleSuccess(response, "Etapa vinculada ao fluxo com sucesso!")
    } catch (error) {
        return handleError(error, 'Falha ao tentar vincular a etapa ao fluxo.')
    } 
}

export const atualizarFluxoEtapa = async (id, data) => {
    try {
        const response = await api.patch(`fluxo-etapas/${id}/`, data)
        return handleSuccess(response, 'Atualizado com sucesso!')
    } catch (error) {
        return handleError(error, 'Erro ao atualizar.')
    }
}

export const listarEtapasPorFluxo = async (idFluxo) => {
    try {
        const response = await api.get(`fluxo-etapas/?id_fluxo=${idFluxo}`)
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const desvincularEtapaFluxoPorId = async (id) => {
    try {
        const response = await api.delete(`fluxo-etapas/${id}/`)
        return handleSuccess(response, 'Excluído com sucesso!')
    } catch (error) {
        return handleError(error, 'Erro ao excluir.')
    }
}

export const listarFluxoEtapas = async () => {
    try {
        const response = await api.get('fluxo-etapas/')
        return response
    } catch (error) {
        return handleError(error, 'Erro ao buscar dados.')
    }
}

export const desvincularEtapaFluxo = async (ids) => {
    try {
        const response = await api.delete('fluxo-etapas/bulk-delete/', {
            data: { ids }
        })

        return handleSuccess(response, 'Excluído com sucesso!')
    } catch (error) {
        return handleError(error, 'Erro ao excluir itens.')
    }
}

export const criarTransicao = async (data) => {
    try {
        const response = await api.post("transicoes/", data)
        return handleSuccess(response, "Transição criada com sucesso!")
    } catch (error) {
        return handleError(error, "Erro ao criar transição.")
    }
}

export const atualizarTransicao = async (id, data) => {
    try {
        const response = await api.patch(`transicoes/${id}/`, data)
        return handleSuccess(response, "Transição atualizada com sucesso!")
    } catch (error) {
        return handleError(error, "Erro ao atualizar transição.")
    }
}

export const listarTransicoes = async () => {
    try {
        const response = await api.get("transicoes/")
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const listarTransicoesPorFluxo = async (idFluxo) => {
    try {
        const response = await api.get(`transicoes/?id_fluxo=${idFluxo}`)
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const excluirTransicao = async (id) => {
    try {
        const response = await api.delete(`transicoes/${id}/`)
        return handleSuccess(response, "Transição excluída com sucesso!")
    } catch (error) {
        return handleError(error, "Erro ao excluir transição.")
    }
}