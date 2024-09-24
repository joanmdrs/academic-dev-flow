import { NotificationManager } from "react-notifications";
import api from "../api/api";
import { handleError } from "./utils";

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
        usuario : {
            username: dados.usuario,
            password: dados.senha
        },
        membro : {
            nome: dados.nome,
            data_nascimento: dados.data_nascimento,
            telefone: dados.telefone,
            email: dados.email,
            linkedin: dados.linkedin,
            lattes: dados.lattes,
            nome_github: dados.nome_github,
            email_github: dados.email_github,
            usuario_github: dados.usuario_github,
            grupo: dados.grupo
        }
    }

    try {
        const resposta = await api.post('/membro/cadastrar/', dadosEnviar)
        NotificationManager.success('Membro criado com sucesso !')
        return resposta
    } catch (error) {
        if (error.response && error.response.status === 409){
            return handleError(error, 'Já existe um membro cadastrado com este endereço de e-mail!')
        } else {
            return handleError(error, 'Falha ao tentar criar a conta, contate o suporte!')
        }
    }
}

export const buscarMembroPeloNome = async (nomeMembro) => {

    try {
        const resposta = await api.get('/membro/buscar-por-nome/', {params: {nome: nomeMembro}})
        return resposta
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao buscar o membro, contate o suporte!')
        return {error: "Erro durante a operação, contate o suporte!"}
    } 
}

export const buscarMembroPorGrupoENome = async (nomeMembro, grupoMembro) => {

    try {
        const resposta = await api.get(`membro/buscar-por-nome-e-grupo/`, 
            {params: {nome: nomeMembro, grupo: grupoMembro}})
        return resposta
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao buscar o membro, contate o suporte!')
        return {error: "Erro durante a operação, contate o suporte!"}
    }
}

export const buscarMembroPeloId = async (idMembro) => {
    try {
        const resposta = await api.get('/membro/buscar-por-id/', {params: {id_membro: idMembro}})
        return resposta
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao buscar o membro, contate o suporte!')
        return {error: "Erro durante a operação, contate o suporte!"}
    }

}

export const buscarMembroPeloUser = async (idUser) => {
    try {
        const response = await api.get('/membro/buscar-por-id-usuario/', {params: {id_usuario: idUser}})

        if (response.status === 200){
            return response
        }
        
    } catch (error) {
        console.log(error)
        NotificationManager.error('Não foi possível encontrar o membro, contate o suporte!')
        return {error: 'Falha ao buscar o recurso!'}
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

export const excluirMembro = async (idMembro) => {
    try {
        const resposta = await api.delete('/membro/excluir/', {params: {id_membro: idMembro}})
        NotificationManager.success("Membro excluído com sucesso!")
        return resposta
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao excluir o membro, contate o suporte!')
        return {error: "Erro durante a operação, contate o suporte!"}
    }
}

export const atualizarMembro = async (idMembro, dados) => {

    const dadosEnviar = {
        usuario : {
            username: dados.usuario,
            password: dados.senha
        },
        membro : {
            nome: dados.nome,
            data_nascimento: dados.data_nascimento,
            telefone: dados.telefone,
            email: dados.email,
            linkedin: dados.linkedin,
            lattes: dados.lattes,
            nome_github: dados.nome_github,
            email_github: dados.email_github,
            usuario_github: dados.usuario_github,
            grupo: dados.grupo
        }
    }

    try {
        const resposta = await api.patch(`/membro/atualizar/?id_membro=${idMembro}`, dadosEnviar);
        NotificationManager.success('Membro atualizado com sucesso!');
        return resposta;
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao atualizar o membro, contate o suporte!')
        return {error: "Erro durante a operação, contate o suporte!"}
    }
}


// Analisar depois 
export const buscarMembrosPorListaIds = async (listaIds) => {

    try {
        const response = await api.get('/membro/listar/', {params: {ids: listaIds}});
        return response;
    } catch (error) {
        console.log(error)
        NotificationManager.error("Falha ao buscar os membros, contate o suporte!")
        return {error: "Falha ao buscar os membros"}
    }
}