import api from "../api/api";

export const criarMembro = async (dadosForm) => {

    const dadosEnviar = {
        grupo: dadosForm.grupo,
        
        usuario : {
            username: dadosForm.usuario,
            password: dadosForm.senha
        },
        membro : {
            nome: dadosForm.nome,
            cpf: dadosForm.cpf,
            data_nascimento: dadosForm.data_nascimento,
            sexo: dadosForm.sexo,
            telefone: dadosForm.telefone,
            email: dadosForm.email
        }
    }
    const resposta = await api.post('/membro/cadastrar/', dadosEnviar)
    return resposta
}

export const buscarMembroPeloNome = async (dado) => {
    const resposta = await api.get(`/membro/buscar/?name=${encodeURIComponent(dado)}`)
    return resposta 
}

export const buscarMembroPorGrupoENome = async (nome, grupo) => {
    const resposta = await api.get(`membro/buscar/grupo/?nome=${encodeURIComponent(nome)}&grupo=${encodeURIComponent(grupo)}`)
    return resposta
}

export const buscarMembroPeloId = async (parametro) => {
    const resposta = await api.get(`membro/buscar/${encodeURIComponent(parametro)}/`)
    return resposta
}

export const excluirMembro = async (id) => {
    const resposta = await api.delete(`/membro/excluir/${encodeURIComponent(id)}/`)
    return resposta
}

export const atualizarMembro = async (dadosForm, idMembro) => {

    const dadosEnviar = {
        grupo: dadosForm.grupo,
        
        usuario : {
            username: dadosForm.usuario,
            password: dadosForm.senha
        },
        membro : {
            nome: dadosForm.nome,
            cpf: dadosForm.cpf,
            data_nascimento: dadosForm.data_nascimento,
            sexo: dadosForm.sexo,
            telefone: dadosForm.telefone,
            email: dadosForm.email
        }
    }
    const resposta = await api.patch(`/membro/atualizar/${encodeURIComponent(idMembro)}/`, dadosEnviar)
    return resposta
}