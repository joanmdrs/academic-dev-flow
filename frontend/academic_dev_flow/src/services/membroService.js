import { NotificationManager } from "react-notifications";
import api from "../api/api";
import { handleError, handleSuccess } from "./utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "./messages";

export const listarGrupos = async () => {
    try {
        const response = await api.get('/membro/listar-grupos/')
        return response
    } catch (error) {
        return handleError(error, "Falha ao listar os grupos")
    }
}

export const criarMembro = async (dados) => {

    const dadosEnviar = {
        usuario: {
            username: dados.username,
            password: dados.password,
            email: dados.email
        },
        membro: {
            nome: dados.nome,
            data_nascimento: dados.data_nascimento ? dados.data_nascimento : null,
            sexo: dados.sexo,
            telefone: dados.telefone,
            email: dados.email,
            linkedin: dados.linkedin,
            lattes: dados.lattes,
            nome_github: dados.nome_github,
            email_github: dados.email_github,
            usuario_github: dados.usuario_github,
            grupo: dados.grupo
        }
    };

    try{
        const response = await api.post('/membro/cadastrar/', dadosEnviar)
        return handleSuccess(response, "Membro criado com sucesso.");
    } catch (error) {
        if (error.response && error.response.status === 409) {
            return handleError(error, 'Já existe um membro cadastrado com este endereço de e-mail.');
        } else {
            return handleError(error, 'Falha ao tentar realizar o cadastro, contate o suporte.');
        }
    }
}

export const buscarMembroPeloNome = async (nomeMembro) => {

    try {
        const response = await api.get('/membro/buscar-por-nome/', {params: {nome: nomeMembro}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar os dados !')
    } 
}

export const buscarMembrosPorGrupo = async (idsGrupos) => {

    try {
        const response = await api.get(`membro/buscar-por-grupo/`, 
            {params: {grupos_ids: idsGrupos}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar os dados.')
    }
}

export const buscarMembroPeloId = async (idMembro) => {
    try {
        const response = await api.get('/membro/buscar-por-id/', {params: {id_membro: idMembro}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar os dados do membro.')
    }

}

export const buscarMembroPeloUser = async (idUser) => {
    try {
        const response = await api.get('/membro/buscar-por-id-usuario/', {params: {id_usuario: idUser}})
        return response
        
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar os dados.')
    }
}

// Analisar depois
export const buscarUsuarioPeloIdMembroProjeto = async (idMembroProjeto) => {
    try {
        const response = await api.get(`membro/buscar-usuario-github/${encodeURIComponent(idMembroProjeto)}/`)
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar os dados do usuário github do membro selecionado, contate o suporte!')
    }
}

export const excluirMembro = async (idsMembros) => {
    try {
        const response = await api.delete('/membro/excluir/', {data:{ids_membros: idsMembros}})
        return handleSuccess(response, 'Membro excluído com sucesso.')
    } catch (error) {
        return handleError(error, 'Falha ao tentar excluir o membro.')
    }
}

export const atualizarMembro = async (idMembro, dados) => {

    const dadosEnviar = {
        usuario : {
            username: dados.username,
            password: dados.password,
            email: dados.email
        },
        membro : {
            nome: dados.nome,
            data_nascimento: dados.data_nascimento ? dados.data_nascimento : null,
            sexo: dados.sexo, 
            telefone: dados.telefone,
            email: dados.email,
            linkedin: dados.linkedin,
            lattes: dados.lattes,
            nome_github: dados.nome_github,
            email_github: dados.email_github,
            usuario_github: dados.usuario_github,
            grupo: dados.grupo,
            avatar: dados.avatar
        }
    }

    try {
        const response = await api.patch(`/membro/atualizar/?id_membro=${idMembro}`, dadosEnviar);
        return handleSuccess(response, 'Informações do membro atualizadas com sucesso.')
    } catch (error) {
        return handleError(error, 'Falha ao tentar atualizar as informações do membro.')
    }
}

export const listarMembros = async () => {
    try {
        const response = await api.get('membro/listar/')
        return response
    } catch (error) {
        return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
    }
}


// Analisar depois 
export const buscarMembrosPorListaIds = async (listaIds) => {

    try {
        const response = await api.get('/membro/listar/', {params: {ids: listaIds}});
        return response;
    } catch (error) {
        NotificationManager.error("Falha ao buscar os membros, contate o suporte!")
        return {error: "Falha ao buscar os membros"}
    }
}