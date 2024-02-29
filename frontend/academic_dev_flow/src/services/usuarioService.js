import api from "../api/api"

export const criarUsuario = async (dados) => {
    const dadosUsuario = {
        username: dados.usuario,
        password: dados.senha,
        grupo: dados.grupo,
    }
    const resposta = await api.post('/usuario/cadastrar/', dadosUsuario)
    return resposta
}

export const buscarUsuarioPeloId = async (id) => {
    const resposta = await api.get(`/usuario/buscar/${encodeURIComponent(id)}/`)
    return resposta
}

export const atualizarUsuario = async (dados, idUsuario) => {
    const dadosUsuario = {
        username : dados.usuario,
        password : dados.senha, // Necessário encriptar a senha
        grupo: dados.grupo,
    }
    const resposta = await api.patch(`/usuario/atualizar/${encodeURIComponent(idUsuario)}/`, dadosUsuario)
    return resposta
}
