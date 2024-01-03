import api from "./api"

export const criarMembro = async (data) => {
    try {
        let response = await api.post('membro/cadastrar/', {body: data})
        return response
        
    } catch (error) {
        console.error('Erro ao criar um membro:', error)
        throw new Error('Falha ao criar um membro. Por favor, tente novamente.')   
    }
}

export const buscarMembroPeloNome = async (query) => {
    try {
        let response = await api.get(`membro/buscar/?name=${encodeURIComponent(query)}`)
        return response 

    } catch (error) {
        console.error('Erro ao buscar o membro pelo nome:', error)
        throw new Error('Falha ao buscar um membro. Por favor, tente novamente.')
    }
}

export const excluirMembro = async (id) => {
    try {
        let response = await api.delete(`membro/excluir/${encodeURIComponent(id)}`)
        return response
    } catch (error) {
        console.error('Erro ao excluir o membro', error)
        throw new Error('Falha ao excluir um membro. Por favor, tente novamente.')
    }
}

export const atualizarMembro = async (id, data) => {
    try {
        let response = await api.patch(`membro/atualizar/${encodeURIComponent(id)}`, {body: data})
        return response
    } catch (error) {
        console.error('Erro ao atualizar o membro', error)
        throw new Error('Falha ao atualizar um membro. Por favor, tente novamente.')
    }
}