import api from "../api/api"
import { handleError, handleSuccess } from "./utils"
import { 
    ERROR_MESSAGE_ON_CREATION, 
    ERROR_MESSAGE_ON_DELETION, 
    ERROR_MESSAGE_ON_SEARCHING, 
    ERROR_MESSAGE_ON_UPDATE, 
    SUCCESS_MESSAGE_ON_CREATION, 
    SUCCESS_MESSAGE_ON_DELETION, 
    SUCCESS_MESSAGE_ON_UPDATE } from "./messages"

// Esta função faz uma requisição para uma view do django que realiza o cadastro de um MembroProjeto.
export const criarMembroProjeto = async (formData) => {
    try {
        const response = await api.post('membro-projeto/cadastrar/', {membros: formData})
        return handleSuccess(response, 'Membro vinculado ao projeto com sucesso !')
    } catch (error) {
        console.log("erro: ", error.response.data.error)
        if (error.response.status === 400 && error.response.data.error === 'Já existe um vínculo para este membro e projeto.') {
            return handleError(error, 'Este membro já está vinculado a este projeto. Tente outro membro ou projeto.')
        } else {
            return handleError(error, 'Falha ao tentar vincular o membro ao projeto!')
        }
    }
}

// Esta função faz uma requisição para uma view do django que realiza a atualização de um MembroProjeto.
export const atualizarMembroProjeto = async (requestData, idMembroProjeto) => {
    try {
        const response = await api.patch(
            'membro-projeto/atualizar/', requestData, {params: {id_membro_projeto: idMembroProjeto}})
        return handleSuccess(response, SUCCESS_MESSAGE_ON_UPDATE)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_UPDATE)
    }
}

// Esta função faz uma requisição para uma view do django que realiza a exclusão de um MembroProjeto.
export const excluirMembroProjetoOne = async (idMembroProjeto) => {
    try {
        const response = await api.delete(
            'membro-projeto/excluir-individual/', {params: {id_membro_projeto: idMembroProjeto }})
        return handleSuccess(response, SUCCESS_MESSAGE_ON_DELETION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_DELETION)
    }
}

// Esta função faz uma requisição para uma view do django que realiza a exclsuão de um ou mais MembroProjeto.
export const excluirMembroProjetoMany = async (idProjeto, idsMembros) => {
    try {
        const response = await api.delete(
            'membro-projeto/excluir-multiplo/', {params: {id_projeto: idProjeto, ids_membros: idsMembros}})
        return handleSuccess(response, SUCCESS_MESSAGE_ON_DELETION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_DELETION)
    }
}

// Esta função faz uma requisição para uma view do django que realiza a busca de um objeto MembroProjeto, 
// utilizando como parâmetro o ID do membro e o ID do projeto.
export const buscarMembroProjetoPeloIdMembroEPeloIdProjeto = async (idProjeto, idMembro) => {
    try {
        const response = await api.get(
            'membro-projeto/buscar-pelo-id-membro-e-pelo-id-projeto/', {params: {id_projeto: idProjeto, id_membro: idMembro}})
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

// Esta função faz uma requisição para uma view do django que realiza a busca pelos projetos que estão conectados ao membro, 
// e esta função é feita utilizando o ID do usuário. 
export const buscarProjetosDoMembro = async (idUsuario) => {
    try {
        const response = await api.get('membro-projeto/buscar-projetos-do-membro/', {params: {id_usuario: idUsuario}})
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

// Esta função faz uma requisição para uma view do django que realiza a busca dos membros vinculados à um projeto,
// e esta função é feita utilizando o ID do projeto. 
export const buscarMembrosPorProjeto = async (idProjeto) => {
    try {
        const response = await api.get('membro-projeto/buscar-membros-por-projeto/', {params: {id_projeto: idProjeto}})
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const listarMembroProjeto = async () => {
    try {
        const response = await api.get('membro-projeto/listar/')
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}

export const buscarMembroProjetoPeloUsuarioGithub = async (parametros) => {
    try {
        const response = await api.get('membro_projeto/buscar/usuario_github/', {params: parametros})
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}


export const cadastrarFuncoes = async (dados) => {
    try {
        const response = await api.post('membro_projeto/funcoes/cadastrar/', {funcoes: dados})
        return handleSuccess(response, SUCCESS_MESSAGE_ON_CREATION)
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_CREATION)
    }
}

export const cadastrarFuncaoAtual = async (dados) => {
    try {
        const response = await api.post('membro_projeto/funcoes/cadastrar-funcao-atual/', dados)
        return handleSuccess(response, 'Função do membro definida com sucesso!')
    } catch (error) {
        return handleError(error, 'Falha ao tentar definir a função do membro, contate o suporte!')
    }
}

export const listarFuncoes = async () => {
    try {
        const response = await api.get('membro_projeto/funcoes/listar/')
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}