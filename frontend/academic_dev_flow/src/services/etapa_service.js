import api from "./api";

export const cadastrar_etapas = (etapas, flow_id) => {

    for (const etapa of etapas) {
        let data = {
            nome: etapa.nome, 
            descricao: etapa.descricao,
            data_inicio: etapa.data_inicio,
            data_fim: etapa.data_fim,
            status: etapa.status,
            flow: flow_id
        }

        try {
            let response = api.post("/etapas/cadastrar/", data)
            return response
        } catch (error) {
            console.log("Algo deu errado !", error);
        }

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