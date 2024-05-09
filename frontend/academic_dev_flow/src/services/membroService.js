import { NotificationManager } from "react-notifications";
import api from "../api/api";
import { handleError, handleSuccess } from "./utils";

export const criarConta = async (dados) => {
    const dadosEnviar = {
        grupo: dados.grupo,
        
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
            lattes: dados.lattes
        },

        github: {
            nome: dados.nome_github,
            email_github: dados.email_github,
            usuario_github: dados.usuario_github
        }
    }
    
    try {
        const response = await api.post('/membro/cadastrar/', dadosEnviar)
        return handleSuccess(response, 'Contra criada com sucesso !')
    } catch (error) {
        if (error.response && error.response.status === 409){
            return handleError(error, 'Já existe uma conta cadastrada com este endereço de e-mail!')
        } else {
            return handleError(error, 'Falha ao tentar criar a conta, contate o suporte!')
        }
    }
}

export const criarMembro = async (dados) => {

    const dadosEnviar = {
        grupo: dados.grupo,
        
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
            lattes: dados.lattes
        },

        github: {
            nome: dados.nome_github,
            email_github: dados.email_github,
            usuario_github: dados.usuario_github
        }
    }
    try {
        const resposta = await api.post('/membro/cadastrar/', dadosEnviar)
        NotificationManager.success('Membro criado com sucesso !')
        return resposta
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao criar o membro, contate o suporte!')
        return {error: "Erro durante a operação, contate o suporte!"}
    }
}

export const buscarMembroPeloNome = async (nomeMembro) => {

    try {
        const resposta = await api.get('/membro/buscar/nome/', {params: {nome: nomeMembro}})
        return resposta
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao buscar o membro, contate o suporte!')
        return {error: "Erro durante a operação, contate o suporte!"}
    } 
}

export const buscarMembroPorGrupoENome = async (nomeMembro, grupoMembro) => {

    try {
        const resposta = await api.get(`membro/buscar/grupo/?nome=${encodeURIComponent(nomeMembro)}&grupo=${encodeURIComponent(grupoMembro)}`)
        return resposta
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao buscar o membro, contate o suporte!')
        return {error: "Erro durante a operação, contate o suporte!"}
    }
}

export const buscarMembroPeloId = async (idMembro) => {
    try {
        const resposta = await api.get(`membro/buscar/${encodeURIComponent(idMembro)}/`)
        return resposta
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao buscar o membro, contate o suporte!')
        return {error: "Erro durante a operação, contate o suporte!"}
    }

}

export const buscarMembroPeloUser = async (idUser) => {
    try {
        const response = await api.get(`membro/buscar/usuario/${encodeURIComponent(idUser)}/`)

        if (response.status === 200){
            return response
        }
        
    } catch (error) {
        console.log(error)
        NotificationManager.error('Não foi possível encontrar o membro, contate o suporte!')
        return {error: 'Falha ao buscar o recurso!'}
    }
}

export const excluirMembro = async (idMembro) => {
    try {
        const resposta = await api.delete(`/membro/excluir/${encodeURIComponent(idMembro)}/`)
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
        grupo: dados.grupo,
        
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
            lattes: dados.lattes
        },

        github: {
            nome: dados.nome_github,
            email_github: dados.email_github,
            usuario_github: dados.usuario_github
        }
    }

    try {
        const resposta = await api.patch(`/membro/atualizar/${encodeURIComponent(idMembro)}/`, dadosEnviar)
        NotificationManager.success('Membro atualizado com sucesso!')
        return resposta
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao atualizar o membro, contate o suporte!')
        return {error: "Erro durante a operação, contate o suporte!"}
    }
}

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