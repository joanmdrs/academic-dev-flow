import api from "./api";

export const cadastrar_fluxo = (data) => {
    try {
        let response = api.post("/fluxos/cadastrar/", data)
        return response
    } catch (error) {
        console.log("Algo deu errado !", error);
    }
}