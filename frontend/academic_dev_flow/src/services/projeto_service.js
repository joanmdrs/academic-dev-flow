import api from "./api";

export const criar_projeto = (data) => {

    try {
        let response  = api.post("/projetos/cadastrar/", data)
        return response;

    } catch (error) {
        console.log("Algo deu errado !", error);
    }

}

export const buscar_projetos_pelo_nome = async (query) => {
    try {
        const response = await api.get(`/projetos/buscar/?name=${encodeURIComponent(query)}`);
        return response;
    } catch (error) {
        console.log("Erro ao buscar dados:", error);
    }
};

export const excluir_projeto = (id) => {
    try {
        const response = api.delete(`/projetos/${encodeURIComponent(id)}/excluir`);
        return response;
    } catch (error) {
        console.log("Erro ao excluir o projeto", error)
    }
}

export const atualizar_projeto = (id, data) => {
    try {
        const response = api.put(`/projetos/${encodeURIComponent(id)}/atualizar`, data);
        return response
    } catch (error) {
        console.log('Erro ao atualizar o projeto', error)
        
    }
}