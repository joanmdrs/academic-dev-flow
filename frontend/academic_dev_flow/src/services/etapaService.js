import api from "../api/api";
import { ERROR_MESSAGE_ON_CREATION, ERROR_MESSAGE_ON_DELETION, ERROR_MESSAGE_ON_SEARCHING, ERROR_MESSAGE_ON_UPDATE, SUCCESS_MESSAGE_ON_CREATION, SUCCESS_MESSAGE_ON_DELETION, SUCCESS_MESSAGE_ON_UPDATE } from "./messages";
import { handleError, handleSuccess } from "./utils";

export const criarEtapa = async (dadosEtapa, fluxoId) => {

    try {
        const dados = {
            nome: dadosEtapa.nome,
            descricao: dadosEtapa.descricao, 
            data_inicio: dadosEtapa.data_inicio,
            data_fim: dadosEtapa.data_fim,
            status: dadosEtapa.status, 
            fluxo: fluxoId
        }
        const response = await api.post('etapa/cadastrar/', dados);
        return handleSuccess(response, SUCCESS_MESSAGE_ON_CREATION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_CREATION)
    }
}

export const buscarEtapaPeloNome = async (nomeEtapa) => {
    try {
        const response = await api.get(`etapa/buscar-pelo-nome/`, {params: {nome_etapa: nomeEtapa}})
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const buscarEtapaPeloId = async (idEtapa) => {
    try {
        const response = await api.get(`etapa/buscar/?id_etapa=${encodeURIComponent(idEtapa)}/`)
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const listarEtapas = async () => {
    try {
        const response = await api.get(`etapa/listar/`);
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const atualizarEtapa = async (dadosEtapa, idEtapa) => {
    try {
        const dados = {
            nome: dadosEtapa.nome,
            descricao: dadosEtapa.descricao,
        }
        const response = await api.patch(`etapa/atualizar/?id_fluxo=${encodeURIComponent(idEtapa)}/`, dados)
        return handleSuccess(response, SUCCESS_MESSAGE_ON_UPDATE) 
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_UPDATE)
    }
}

export const excluirEtapas = async (idsEtapas) => {
    try {
        const response = await api.delete('etapa/excluir/', {data: {
            ids_etapas: idsEtapas
        }})
        return handleSuccess(response, SUCCESS_MESSAGE_ON_DELETION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_DELETION)
    }
}