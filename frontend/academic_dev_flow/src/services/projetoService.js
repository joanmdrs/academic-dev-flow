import api from "../api/api";
import { ERROR_MESSAGE_ON_SEARCHING } from "./messages";
import { handleError, handleInfo, handleSuccess } from "./utils";

export const criarProjeto = async (data) => {
    try {
        const response = await api.post('/projeto/cadastrar/', data)
        return handleSuccess(response, 'Projeto criado com sucesso !')
    } catch (error) {
        return handleError(error, 'Falha ao tentar criar o projeto !')
    }
}

export const atualizarProjeto = async (data, idProjeto) => {
    try {
        const response = await api.patch(`/projeto/atualizar/`, data, {params: {id_projeto: idProjeto}})
        return handleSuccess(response, 'Informações atualizadas com sucesso !')
    } catch (error) {
        return handleError(error, 'Falha ao tentar atualizar os dados do projeto!')
    }
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

export const excluirProjeto = async (idProjeto) => {
    try {
        const response = await api.delete('/projeto/excluir/', {params: {id_projeto: idProjeto}});
        return handleSuccess(response, 'Projeto excluído com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar excluir o projeto !')
    }
}


export const atualizarFluxoProjeto = (idFluxo, idProjeto ) => {
    const resposta = api.patch(`/projeto/atualizar/fluxo/${encodeURIComponent(idProjeto)}/`, { fluxo_id: idFluxo})
    return resposta
}

export const listarProjetos = async () => {
    try {
        const response = await api.get('projeto/listar/')
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}