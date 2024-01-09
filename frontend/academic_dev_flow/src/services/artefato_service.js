import api from "./api";

export const criarArtefato = async (dados) => {
    const resposta = await api.post('/artefato/cadastrar/', dados)
    return resposta
}

export const buscarArtefatoPeloNome =  async (parametro) => {
    const resposta = await api.get(`/artefato/buscar/?name=${encodeURIComponent(parametro)}`)
    return resposta
}

export const atualizarArtefato = async (dados, id) => {
    const resposta = await api.patch(`/artefato/atualizar/${encodeURIComponent(id)}/`, dados)
    return resposta
}

export const excluirArtefato = async (id) => {
    const resposta = await api.delete(`/artefato/excluir/${encodeURIComponent(id)}/`)
    return resposta
}

export const listarArtefatos = async () => {
    const resposta = await api.get('/artefato/listar/')
    return resposta
}