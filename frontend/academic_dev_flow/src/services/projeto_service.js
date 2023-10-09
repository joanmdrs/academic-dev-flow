import api from "./api";

export const criar_projeto = (data) => {
    let response  = api.post("/projetos/cadastrar/", data)
    console.log(response)
    return response;

}

export const buscar_projetos_pelo_nome = async (query) => {
    try {
        const response = await api.get(`/projetos/buscar/?name=${encodeURIComponent(query)}`);
        console.log(response)
    } catch (error) {
        console.log("Erro ao buscar dados:", error);
    }
};

