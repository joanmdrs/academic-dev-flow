import api from "./api";

export const criarUsuario = async (data) => {
    try {
        let response = await api.post('usuario/cadastrar/', {body: data})
        return response
    } catch (error) {
        console.error('Erro ao cadastrar o usuário', error)
        throw new Error('Falha ao cadastrar o usuário. Por favor, tente novamente.')
    }
}

export const atualizarUsuario = async (id, data) => {
    try {
        let response = await api.patch(`usuario/atualizar/${encodeURIComponent(id)}`, {body: data})
        return response
    } catch (error) {
        console.error('Erro ao atualizar o usuário:', error)
        throw new Error('Falha ao atualizar o usuário. Por favor, tente novamente.')
    }
}