import api from "./api";

export const vincularEtapaFluxo = async (dados) => {

    const resposta = await api.post("fluxo_etapa/cadastrar/", dados)
    return resposta 
}

export const atualizarEtapaFluxo = async (dados, id) => {
    const resposta = await api.patch(`fluxo_etapa/atualizar/${encodeURIComponent(id)}/`, dados)
    return resposta
}

export const listarEtapasPorFluxo = async (idFluxo) => {
    const resposta = await api.get(`fluxo_etapa/buscar/${encodeURIComponent(idFluxo)}/`)
    return resposta
}

export const removerEtapaFluxo = async (id) => {
    const resposta = await api.delete(`fluxo_etapa/excluir/individual/${encodeURIComponent(id)}/`)
    return resposta
}

export const removerVinculoEtapasFluxo = async (idFluxo) => {
    const resposta = await api.delete(`fluxo_etapa/excluir/${encodeURIComponent(idFluxo)}/`)
    return resposta
}