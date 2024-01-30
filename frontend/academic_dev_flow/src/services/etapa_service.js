import api from "./api";

export const criarEtapa = async (dadosEtapa, fluxoId) => {
    const dados = {
        nome: dadosEtapa.nome,
        descricao: dadosEtapa.descricao, 
        data_inicio: dadosEtapa.data_inicio,
        data_fim: dadosEtapa.data_fim,
        status: dadosEtapa.status, 
        fluxo: fluxoId
    }
    const resposta = await api.post('etapa/cadastrar/', dados);
    return resposta; 
}

export const buscarEtapaPeloNome = async (nomeEtapa) => {
    const resposta = await api.get(`etapa/buscar/nome/?nome=${encodeURIComponent(nomeEtapa)}`)
    return resposta
}

export const buscarEtapaPeloId = async (idEtapa) => {
    const resposta = await api.get(`etapa/buscar/${encodeURIComponent(idEtapa)}/`)
    return resposta
}

export const buscarEtapasPeloIdFluxo = async (fluxoId) => {
    const resposta = await api.get(`etapa/buscar/?fluxo_id=${encodeURIComponent(fluxoId)}`);
    return resposta; 
}

export const listarEtapas = async () => {
    const resposta = await api.get(`etapa/listar/`);
    return resposta
}

export const atualizarEtapa = async (dadosEtapa, idEtapa) => {
    const dados = {
        nome: dadosEtapa.nome,
        descricao: dadosEtapa.descricao,
    }
    const resposta = await api.patch(`etapa/atualizar/${encodeURIComponent(idEtapa)}/`, dados)
    return resposta 
}

export const excluirEtapa = async (idEtapa) => {
    const resposta = await api.delete(`etapa/excluir/${encodeURIComponent(idEtapa)}/`)
    return resposta
}