import api from "../api";

function criar_projeto(data) {
    api.post("/projetos/cadastrar", {
        nome : data.nome,
        descricao : data.descricao,
        status : data.status,
        data_inicio : data.data_inicio,
        data_fim : data.data_fim,
    })
}

export default criar_projeto;