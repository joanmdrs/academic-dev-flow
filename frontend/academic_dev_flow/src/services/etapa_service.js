import api from "./api";

export const cadastrar_etapas = async (etapas, flow_id) => {

    let data = {
        etapas: etapas,
        flow: flow_id
    }
    try {
        const response = await api.post('etapas/cadastrar/', data);
        return response; 

    } catch (error) {
        console.error('Erro ao cadastrar etapas:', error);
    }
}

export const buscar_etapas_por_id_fluxo = async (flow_id) => {

    try {
        const response = await api.get(`etapas/buscar/?flow_id=${encodeURIComponent(flow_id)}`);
        return response; 
    } catch (error) {
        console.log("Erro ao buscar dados: ", error);
    }

}