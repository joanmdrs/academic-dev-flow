import { NotificationManager } from "react-notifications"
import api from "../api/api"

export const criarMembroProjeto = async (dados) => {
    const resposta = await api.post('membro_projeto/cadastrar/', {membros: dados})
    return resposta
}

export const buscarProjetosDoMembro =  async (idMembro) => {

    try {
        const response = await api.get(`membro_projeto/buscar/projetos/${encodeURIComponent(idMembro)}/`)

        if (response.status === 200){   
            NotificationManager.success('Busca realizada com sucesso !')
            return response
        } else {
            NotificationManager.warning('Falha na busca, contate o suporte !')
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error('Erro na operação, contate o suporte!')
    }
}

export const excluirMembroProjetoOne = async (id) => {
    const resposta = await api.delete(`membro_projeto/excluir/one/${encodeURIComponent(id)}/`)
    return resposta
}

export const excluirMembroProjetoMany = async (id_projeto, lista_membros, grupo) => {
    const ids_membros = lista_membros
    .filter(membroProjeto => membroProjeto.grupo === grupo)  
    .map(membroProjeto => membroProjeto.membro);

    console.log(ids_membros)
    const resposta = await api.delete(`membro_projeto/excluir/many/${encodeURIComponent(id_projeto)}/`, {
        data: { ids_membros: ids_membros },
    });
    return resposta
}

export const listarMembrosPorProjeto = async (idProjeto) => {
    const resposta = await api.get(`membro_projeto/buscar/${encodeURIComponent(idProjeto)}/`)
    return resposta
}