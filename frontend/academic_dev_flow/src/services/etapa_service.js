import api from "./api";

export const criar_etapas = (etapas, flow_id) => {

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