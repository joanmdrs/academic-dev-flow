import api from "./api";

export const cadastrar_fluxo = (data) => {
    try {
        let response = api.post("/fluxos/cadastrar/", data)
        return response
    } catch (error) {
        console.log("Algo deu errado !", error);
    }
}

export const buscar_fluxo = async (query) => {
    try {
        const response = await api.get(`fluxos/buscar/?name_flow=${encodeURIComponent(query)}`)
        return response;
    } catch (error) {
        console.log("Erro ao buscar dados:", error);
    }
}

export const buscar_fluxo_pelo_id =  async (flow_id) => {
    try {
        const response = await api.get(`fluxos/buscar/${encodeURIComponent(flow_id)}/`)
        return response;
    } catch (error) {
        console.log("Erro ao buscar dados:", error)
        
    }
}