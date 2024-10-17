import api from "../api/api";
import { ERROR_MESSAGE_ON_SEARCHING, INFO_MESSAGE_ON_SEARCHING } from "./messages";
import { handleError, handleInfo, handleSuccess } from "./utils";

export const criarProjeto = (dados) => {
    
    const resposta  = api.post("/projeto/cadastrar/", dados)
    return resposta;
}

export const buscarProjetoPeloNome = async (parametro) => {
    try {
        const response = await api.get('/projeto/buscar-por-nome/', {params: {nome_projeto: parametro}});
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar os dados de projeto !')
    }
};

export const buscarProjetoPeloId = async (idProjeto) => {
    const resposta = await api.get(`/projeto/buscar_por_id/${encodeURIComponent(idProjeto)}/`);
    return resposta
}

export const buscarProjetosPorListaIds = async (listaIds) => {
    const response = await api.get('/projeto/buscar_por_lista_ids/', {params: {ids: listaIds}});
    return response;
}

export const excluirProjeto = (id) => {
    const resposta = api.delete(`/projeto/excluir/${encodeURIComponent(id)}/`);
    return resposta;
}

export const atualizarProjeto = (dados, id) => {
    const resposta = api.patch(`/projeto/atualizar/${encodeURIComponent(id)}/`, dados);
    return resposta
}


export const atualizarFluxoProjeto = (idFluxo, idProjeto ) => {
    const resposta = api.patch(`/projeto/atualizar/fluxo/${encodeURIComponent(idProjeto)}/`, { fluxo_id: idFluxo})
    return resposta
}

export const listarProjetos = async () => {
    try {
        const response = await api.get('projeto/listar/')
        if (response.status === 204) {
            return handleInfo(response, "Não existem projetos cadastrados no banco de dados!")
        }
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}