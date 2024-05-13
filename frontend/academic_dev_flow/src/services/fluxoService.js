import api from "../api/api"
import { handleError } from "./utils"

export const criarFluxo = async (dados) => {
    const resposta = await api.post("/fluxo/cadastrar/", dados)
    return resposta
}

export const buscarFluxoPeloNome = async (parametro) => {
    try {
        const response = await api.get(`/fluxo/buscar/?name_fluxo=${encodeURIComponent(parametro)}`)
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar os fluxos, contate o suporte!')
    }
}

export const buscarFluxoPeloId =  async (fluxo_id) => {
    const resposta = await api.get(`fluxo/buscar/${encodeURIComponent(fluxo_id)}/`)
    return resposta
}

export const atualizarFluxo = async (dadosFluxo, idFluxo) => {
    const resposta = await api.patch(`fluxo/atualizar/${encodeURIComponent(idFluxo)}/`, dadosFluxo)
    return resposta
}

export const excluirFluxo = async (idFluxo) => {
    const resposta = await api.delete(`fluxo/excluir/${encodeURIComponent(idFluxo)}/`)
    return resposta
}

export const listarFluxos = async () => {
    const resposta = await api.get('fluxo/listar/')
    return resposta
}
