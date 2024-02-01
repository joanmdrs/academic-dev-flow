import moment from "moment";
import api from "./api"

export const criarMembro = async (dados) => {

    const dataString = dados.data_nascimento;
    const dataMoment = moment(dataString, 'DD/MM/YYYY');
    const dataFormatada = dataMoment.format('YYYY-MM-DD');

    const dados_membro = {
        nome: dados.nome,
        cpf: dados.cpf,
        data_nascimento: dataFormatada,
        sexo: dados.sexo,
        telefone: dados.telefone,
        email: dados.email
    }

    const resposta = await api.post('/membro/cadastrar/', dados_membro)
    return resposta
}

export const buscarMembroPeloNome = async (dado) => {
    const resposta = await api.get(`/membro/buscar/?name=${encodeURIComponent(dado)}`)
    return resposta 
}

export const buscarMembroPeloId = async (parametro) => {
    const resposta = await api.get(`membro/buscar/${encodeURIComponent(parametro)}/`)
    return resposta
}

export const excluirMembro = async (id) => {
    const resposta = await api.delete(`/membro/excluir/${encodeURIComponent(id)}/`)
    return resposta
}

export const atualizarMembro = async (dados, id) => {

    const dataString = dados.data_nascimento;
    const dataMoment = moment(dataString, 'DD/MM/YYYY');
    const dataFormatada = dataMoment.format('YYYY-MM-DD');

    const dados_membro = {
        nome: dados.nome,
        cpf: dados.cpf,
        data_nascimento: dataFormatada,
        sexo: dados.sexo,
        telefone: dados.telefone,
        email: dados.email
    }

    const resposta = await api.patch(`/membro/atualizar/${encodeURIComponent(id)}/`, dados_membro)
    return resposta
}