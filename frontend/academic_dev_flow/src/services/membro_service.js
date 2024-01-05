import api from "./api"

export const criarMembro = async (dados) => {

    const dados_membro = {
        nome: dados.nome,
        cpf: dados.cpf,
        data_nascimento: (dados.data_nascimento).format("YYYY-MM-DD"),
        sexo: dados.sexo,
        telefone: dados.telefone,
        email: dados.email
    }

    try {
        let resposta = await api.post('/membro/cadastrar/', dados_membro)
        return resposta

    } catch (error) {
        console.error('Erro ao criar um membro:', error)
        throw new Error('Falha ao criar um membro. Por favor, tente novamente.')   
    }
}

export const buscarMembroPeloNome = async (dado) => {
    try {
        let resposta = await api.get(`/membro/buscar/?name=${encodeURIComponent(dado)}`)
        return resposta 

    } catch (error) {
        console.error('Erro ao buscar o membro pelo nome:', error)
        throw new Error('Falha ao buscar um membro. Por favor, tente novamente.')
    }
}

export const excluirMembro = async (id) => {
    try {
        let resposta = await api.delete(`/membro/excluir/${encodeURIComponent(id)}/`)
        return resposta
    } catch (error) {
        console.error('Erro ao excluir o membro', error)
        throw new Error('Falha ao excluir um membro. Por favor, tente novamente.')
    }
}

export const atualizarMembro = async (dados, id) => {
    const dados_membro = {
        nome: dados.nome,
        cpf: dados.cpf,
        data_nascimento: (dados.data_nascimento).format("YYYY-MM-DD"),
        sexo: dados.sexo,
        telefone: dados.telefone,
        email: dados.email
    }

    try {
        let resposta = await api.patch(`/membro/atualizar/${encodeURIComponent(id)}/`, dados_membro)
        return resposta
    } catch (error) {
        console.error('Erro ao atualizar o membro', error)
        throw new Error('Falha ao atualizar um membro. Por favor, tente novamente.')
    }
}