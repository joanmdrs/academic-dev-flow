import api from "../api/api"

export const criarFluxo = async (dados) => {
    const resposta = await api.post("/fluxo/cadastrar/", dados)
    return resposta
}

export const buscarFluxoPeloNome = async (parametro) => {
    const resposta = await api.get(`/fluxo/buscar/?name_fluxo=${encodeURIComponent(parametro)}`)
    return resposta
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