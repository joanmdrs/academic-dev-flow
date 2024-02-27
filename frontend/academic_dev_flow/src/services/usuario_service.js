import api from "../api/api"

export const criarUsuario = async (dados, id_membro) => {
    const dados_usuario = {
        usuario : dados.usuario,
        senha : dados.senha, // Necessário encriptar a senha
        grupo: dados.grupo,
        membro_id: id_membro
    }
    const resposta = await api.post('/usuario/cadastrar/', dados_usuario)
    return resposta
}

export const buscarUsuarioPeloIdMembro = async (id) => {
    const resposta = await api.get(`/usuario/buscar_usuario/${encodeURIComponent(id)}/`)
    return resposta
}

export const atualizarUsuario = async (dados, id_membro) => {
    const dados_usuario = {
        usuario : dados.usuario,
        senha : dados.senha, // Necessário encriptar a senha
        grupo: dados.grupo,
    }
    const resposta = await api.patch(`/usuario/atualizar/${encodeURIComponent(id_membro)}/`, dados_usuario)
    return resposta
}
