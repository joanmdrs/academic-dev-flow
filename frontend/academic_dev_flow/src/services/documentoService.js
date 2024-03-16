import api from "../api/api";
import { NotificationManager } from "react-notifications";

export const criarDocumento = async (dados) => {
    try {
        const response = await api.post('documento/cadastrar/', dados)
        if (response.status === 200){
            NotificationManager.success('Documento criado com sucesso !')
            return response
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao criar o documento, contate o suporte!')
        return {error: 'Falha ao criar o documento!'}
    }   
}

export const buscarDocumentoPeloId = async (id) => {
    try {
        const response = await api.get(`documento/buscar/${encodeURIComponent(id)}/`)
        return response
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao buscar o documento, contate o suporte!')
        return {error: 'Falha ao buscar o documento!'}
    }
}

export const filtrarDocumentosPorProjeto = async (idProjeto) => {
    try {
        const response = await api.get(`documento/filtrar/${encodeURIComponent(idProjeto)}/`)
        return response
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao filtrar os documentos, contate o suporte!')
        return {error: 'Falha ao filtrar os documentos!'}
    }
}

export const atualizarDocumento = async (id, dados) => {
    try {
        const response = await api.patch(`documento/atualizar/${encodeURIComponent(id)}/`, dados)
        if (response.status === 200){
            NotificationManager.success('Documento atualizado com sucesso!')
            return response
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao atualizar o documento, contate o suporte!')
        return {error: 'Falha ao atualizar o documento!'}
    }
}

export const excluirDocumentos = async (ids) => {
    try {
        const response = await api.delete('documento/excluir/', {params: {ids: ids}})
        if (response.status === 204){
            NotificationManager.success('Documento(s) excluído(s) com sucesso !')
            return response
        }
    } catch (error) {
        console.log(error)
        NotificationManager.error('Falha ao excluir o(s) documento(s), contate o suporte!')
        return {error: 'Falha ao excluir o(s) documento(s)!'}
    }
}