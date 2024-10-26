import api from "../api/api";
import { handleError, handleSuccess } from "./utils";

export const criarRelease = async (data) => {
    try {
        const response = await api.post('/release/cadastrar/', data)
        return handleSuccess(response, 'Release criada com sucesso !')
    } catch (error) {
        return handleError(error, 'Falha ao tentar criar a release !')
    }
}

export const atualizarRelease = async (idRelease, data) => {
    try {
        const response = await api.patch('/release/atualizar/', data, {params: {id_release: idRelease}})
        return handleSuccess(response, 'Informações da release atualizadas com sucesso !')
    } catch (error) {
        return handleError(error, 'Falha ao tentar atualizar as informações da release !')
    }
}

export const buscarReleasePeloId = async (idRelease) => {
    try {
        const response = await api.get('/release/buscar-pelo-id/', {params: {id_release: idRelease}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar a release !')
    }
}

export const filtrarReleasesPeloNomeEPeloProjeto = async (nomeRelease, idProjeto) => {
    try {
        const response = await api.get(
            '/release/filtrar-por-nome-e-por-projeto/', 
            {params: {nome_release: nomeRelease, id_projeto: idProjeto}}
        )
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar as informações !')
    }
}

export const listarReleases = async () => {
    try {
        const response = await api.get('/release/listar/')
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar listar as releases !')
    }
}

export const listarReleasesPorProjeto = async (idProjeto) => {
    try {
        const response = await api.get('/release/listar-por-projeto/', {params: {id_projeto: idProjeto}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar listar as releases do projeto !')
    }
}

export const excluirReleases = async (idsReleases) => {
    try {
        const response = await api.delete('/release/excluir/', {data: {ids_releases: idsReleases}})
    } catch (error) {
        return handleError(error, 'Falha ao tentar excluir as releases !')
    }
}