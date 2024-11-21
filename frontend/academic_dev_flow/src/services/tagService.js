import api from "../api/api";
import { handleError, handleSuccess } from "./utils";

export const criarTag = async (formData) => {
    try {
        const response = await api.post('tags/cadastrar/', formData);

        // Lida com a resposta de sucesso
        return handleSuccess(response, 'Tag criada com sucesso!');
    } catch (error) {
        if (error.response && error.response.data?.code === 'TAG_EXISTENTE') {
            return handleError(error, 'Já existe uma tag com este nome!');
        }
        
        // Caso o erro não seja de unicidade, lida com outros erros
        return handleError(error, 'Falha ao tentar criar a tag');
    }
};


export const atualizarTag = async (idTag, formData) => {
    try {
        const response = await api.patch('tags/atualizar/', formData, {params: {id_tag: idTag}})
        return handleSuccess(response, 'Dados da tag atualizados com sucesso !')
    } catch (error) {
        if (error.response && error.response.data?.code === 'TAG_EXISTENTE') {
            return handleError(error, 'Já existe uma tag com este nome!');
        }
        return handleError(error, 'Falha ao tentar criar a tag');
    }
}

export const buscarTagPeloNome = async (nomeTag) => {
    try {
        const response = await api.get('tags/buscar-pelo-nome/', {params: {nome_tag: nomeTag}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar a tag !')
    }
}

export const buscarTagPeloId = async (idTag) => {
    try {
        const response = await api.get('tags/buscar-pelo-id/', {params: {id_tag: idTag}})
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar a tag !')
    }
} 

export const listarTags = async () => {
    try {
        const response = await api.get('tags/listar/')
        return response
    } catch (error) {
        return handleError(error, 'Falha ao tentar buscar os dados!')
    }
}

export const excluirTags = async (idsTags) => {
    try {
        const response = await api.delete('tags/excluir/', {data: {ids_tags: idsTags}})
        return handleSuccess(response, 'Tag(s) excluída(s) com sucesso !')
    } catch (error) {
        return handleError(error, 'Falha ao tentar excluir a(s) tag(s) !')
    }
}