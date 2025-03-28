import api from "../api/api";
import { handleError, handleSuccess } from "./utils";

export const criarIteracao = async (formData) => {  

    
    try {
        
        const response = await api.post('iteracao/cadastrar/', formData)
        return handleSuccess(response, 'Iteração criada com sucesso !')
        
    } catch (error) {
        return handleError(error, 'Falha ao tentar criar a iteração !')
    }
}

export const buscarIteracaoPeloId = async (idIteracao) => {
    try {
        const response = await api.get('iteracao/buscar/', {params: {id_iteracao: idIteracao}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tenta buscar a iteração !')
    }
}

export const listarIteracoesPorProjeto = async (idProjeto) => {
    try {
        const response = await api.get('iteracao/listar-por-projeto/', {params: {id_projeto: idProjeto}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar listar as iterações do projeto !')
    } 
}

export const atualizarIteracao = async (idIteracao, formData) => {
    
    try {
        const response = await api.patch('iteracao/atualizar/', formData, {params: {id_iteracao: idIteracao}})
        return handleSuccess(response, 'Informações da iteração atualizadas com sucesso !')

    } catch (error) {
        return handleError(error, 'Falha ao tentar atualizar as informações da iteração !')
    }
}

export const excluirIteracoes = async (idsIteracoes) => {
    try {
        const response = await api.delete('/iteracao/excluir/', {data: {ids_iteracoes: idsIteracoes}})
        return handleSuccess(response, 'Iterações excluídas com sucesso !')
    } catch (error) {
        return handleError(error, 'Falha ao tentar excluir as iterações !')
    }
}

export const listarIteracoes = async () => {
    try {
        const response = api.get('/iteracao/listar/')
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar as iterações !')
    }
}

export const filtrarIteracoesPeloNomeEPeloProjeto = async (nomeIteracao, idProjeto) => {
    try {
        const response = await api.get(
            'iteracao/filtrar-por-nome-e-por-projeto/', 
            {params: {nome_iteracao: nomeIteracao, id_projeto: idProjeto}}
        )
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscas as informações !')

    }
}

export const buscarIteracoesDosProjetosDoMembro = async (idMembro) => {
    try {
        const response = await api.get('iteracao/buscar-iteracoes-dos-projetos-do-membro/', {params: {id_membro: idMembro}})
        if (response.data?.code === 'MEMBRO_SEM_PROJETO') {
            // Trate o caso específico onde o membro não está vinculado a nenhum projeto
            return {
                message: 'O membro não está vinculado a nenhum projeto',
                empty: true, // Define um indicador customizado para que o frontend saiba que não há projetos
            };
        }
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar as informações das iterações !')
    }
}

export const buscarUltimaIteracaoDoProjeto = async (idProjeto, idRelease) => {
    try {
        const response = await api.get(
            'iteracao/buscar-ultima-iteracao/', 
            {params: {id_projeto: idProjeto, id_release: idRelease}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao buscar os dados da última iteração cadastrada para este projeto!')
    }
}

export const buscarIteracoesAdjacentes = async (idIteracao, idProjeto) => {
    try {
        const response = await api.get(
            'iteracao/buscar-iteracoes-adjacentes/',
            {params: {id_iteracao: idIteracao, id_projeto: idProjeto}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao buscar os dados das iterações adjacentes !')
    }
}

export const buscarIteracaoAtualDoProjeto = async (idProjeto) => {
    try {
        const response = await api.get('iteracao/buscar-iteracao-atual-do-projeto/', {params: {id_projeto: idProjeto}})
        if (response.data?.code === 'ITERACAO_NAO_ENCONTRADA') {
            return {
                message: response.data?.message,
                empty: true,
            };
        }
        return response
    } catch (error) {
        return handleError(error, 'Falha ao buscar os dados da iteração atual do projeto !')
    }
}