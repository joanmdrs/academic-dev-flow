import api from "../api/api"

export const vincularEtapaFluxo = async (dados) => {
    const resposta = await api.post("fluxo_etapa/cadastrar/", {etapas: dados})
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

export const excluirFluxoEtapaOne = async (id) => {
    const resposta = await api.delete(`fluxo_etapa/excluir/one/${encodeURIComponent(id)}/`)
    return resposta
}

export const excluirFluxoEtapaMany = async (idFluxo, listaEtapas) => {
    const ids_etapas = listaEtapas.map(fluxoEtapa => fluxoEtapa.etapa);

    console.log(ids_etapas)
    const resposta = await api.delete(`fluxo_etapa/excluir/many/${encodeURIComponent(idFluxo)}/`, {
        data: { ids_etapas: ids_etapas },
    });
    return resposta
}