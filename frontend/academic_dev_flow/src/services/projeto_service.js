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

