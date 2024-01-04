import api from "./api";

export const criarUsuario = async (dados, id_membro) => {

    const dados_usuario = {
        usuario : dados.usuario,
        senha : dados.senha, // Necessário encriptar a senha
        grupo: dados.grupo,
        membro: id_membro
    }
    try {
        let response = await api.post('/usuario/cadastrar/', dados_usuario)
        return response
    } catch (error) {
        console.error('Erro ao cadastrar o usuário', error)
        throw new Error('Falha ao cadastrar o usuário. Por favor, tente novamente.')
    }
}

export const buscarUsuarioPeloIdMembro = async (id) => {
    try {
        let resposta = await api.get(`/usuario/buscar/${encodeURIComponent(id)}`)
        return resposta
    } catch (error) {
        console.error('Erro ao buscar o usuário', error)
        throw new Error('Falha ao buscar o usuário. Por favor, tente novamente.')
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