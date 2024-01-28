import api from "./api";

export const vincularEtapaFluxo = async (idFluxo, dadosEtapas) => {

    const dados = dadosEtapas.map(etapa => ({
        fluxo: idFluxo,
        etapa: etapa.id,
    }));
    const resposta = await api.post("fluxo_etapa/cadastrar/", dados)
    return resposta 
}

export const buscarVinculoPeloIdFluxo = async (idFluxo) => {
    const resposta = await api.get(`fluxo_etapa/buscar/${encodeURIComponent(idFluxo)}/`)
    return resposta
}

export const removerVinculoEtapasFluxo = async (idFluxo) => {
    const resposta = await api.delete(`fluxo_etapa/excluir/${encodeURIComponent(idFluxo)}/`)
    return resposta
}