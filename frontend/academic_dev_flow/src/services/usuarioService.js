import api from "../api/api"

export const buscarUsuarioPeloId = async (id) => {
    const resposta = await api.get(`/usuario/buscar/${encodeURIComponent(id)}/`)
    return resposta
}
