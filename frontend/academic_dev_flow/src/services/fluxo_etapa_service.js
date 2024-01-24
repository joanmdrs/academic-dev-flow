import api from "./api";

export const vincularEtapaFluxo = (dados) => {
    const resposta = api.post("fluxo_etapa/cadastrar/", dados)
    return resposta 
}

export const removerVinculoEtapaFluxo = (id) => {
    const resposta = api.delete(`fluxo_etapa/excluir/${encodeURIComponent(id)}/`)
}