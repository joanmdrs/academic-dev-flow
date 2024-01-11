import api from "./api";

export const criarProjeto = (dados) => {
    const dados_projeto = {
        nome: dados.nome,
        descricao: dados.descricao,
        status: dados.status,
        data_inicio: (dados.data_inicio).format("YYYY-MM-DD"),
        data_fim: (dados.data_fim).format("YYYY-MM-DD"),
    }
    
    const resposta  = api.post("/projeto/cadastrar/", dados_projeto)
    return resposta;
}

export const buscarProjetoPeloNome = async (parametro) => {
    const resposta = await api.get(`/projeto/buscar/?name=${encodeURIComponent(parametro)}`);
    return resposta;
};

export const excluirProjeto = (id) => {
    const resposta = api.delete(`/projeto/excluir/${encodeURIComponent(id)}/`);
    return resposta;
}

export const atualizarProjeto = (dados, id) => {
    const resposta = api.patch(`/projeto/atualizar/${encodeURIComponent(id)}/`, dados);
    return resposta
}