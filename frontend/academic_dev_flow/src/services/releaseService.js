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
            '/release/filtrar-pelo-nome-e-pelo-projeto/', 
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

export const buscarReleasesDosProjetosDoMembro = async (idMembro) => {
    try {
        const response = await api.get('/release/buscar-releases-dos-projetos-do-membro/', {params: {id_membro: idMembro}})
        if (response.data?.code === 'MEMBRO_SEM_PROJETO') {
            return {
                message: 'O membro não está vinculado a nenhum projeto',
                empty: true
            };
        }
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar as releases !')
    }
}


export const excluirReleases = async (idsReleases) => {
    try {
        const response = await api.delete('/release/excluir/', {data: {ids_releases: idsReleases}})
        return handleSuccess(response, 'Release excluída com sucesso !')
    } catch (error) {
        return handleError(error, 'Falha ao tentar excluir as releases !')
    }
}


export const buscarUltimaReleaseDoProjeto = async (idProjeto) => {
    try {
        const response = await api.get('release/buscar-ultima-release/', {params: {id_projeto: idProjeto}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao buscar os dados da última release cadastrada para este projeto!')
    }
}

export const buscarReleasesAdjacentes = async (idProjeto, idRelease) => {
    try {
        const response = await api.get(
            'release/buscar-releases-adjacentes/', 
            {params: {id_projeto: idProjeto, id_release: idRelease}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao buscar os dados das releases adjacentes !')
    }
}