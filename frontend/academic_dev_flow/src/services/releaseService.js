import api from "../api/api";
import { handleError, handleSuccess } from "./utils";

export const criarRelease = async (data) => {
    try {
        const response = await api.post('/release/cadastrar/', data)
        return handleSuccess(response, 'Lançamento criado com sucesso !')
    } catch (error) {
        return handleError(error, 'Falha ao tentar criar o lançamento !')
    }
}

export const atualizarRelease = async (idRelease, data) => {
    try {
        const response = await api.patch('/release/atualizar/', data, {params: {id_release: idRelease}})
        return handleSuccess(response, 'Informações do lançamento atualizadas com sucesso !')
    } catch (error) {
        return handleError(error, 'Falha ao tentar atualizar as informações do lançamento !')
    }
}

export const buscarReleasePeloId = async (idRelease) => {
    try {
        const response = await api.get('/release/buscar-pelo-id/', {params: {id_release: idRelease}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar as informações do lançamento !')
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
        return handleError(error, 'Falha ao tentar listar os lançamentos !')
    }
}

export const listarReleasesPorProjeto = async (idProjeto) => {
    try {
        const response = await api.get('/release/listar-por-projeto/', {params: {id_projeto: idProjeto}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar listar os lançamentos do projeto !')
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
        return handleError(error, 'Falha ao tentar buscar as informações !')
    }
}


export const excluirReleases = async (idsReleases) => {
    try {
        const response = await api.delete('/release/excluir/', {data: {ids_releases: idsReleases}})
        return handleSuccess(response, 'Lançamento excluído com sucesso !')
    } catch (error) {
        return handleError(error, 'Falha ao tentar excluir os lançamentos !')
    }
}


export const buscarUltimaReleaseDoProjeto = async (idProjeto) => {
    try {
        const response = await api.get('release/buscar-ultima-release/', {params: {id_projeto: idProjeto}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao buscar os dados do último lançamento cadastrado para este projeto!')
    }
}

export const buscarReleasesAdjacentes = async (idProjeto, idRelease) => {
    try {
        const response = await api.get(
            'release/buscar-releases-adjacentes/', 
            {params: {id_projeto: idProjeto, id_release: idRelease}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao buscar os dados dos lançamentos adjacentes !')
    }
}