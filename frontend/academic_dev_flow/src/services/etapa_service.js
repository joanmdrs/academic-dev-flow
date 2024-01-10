import api from "./api";

export const criarEtapas = async (etapas, fluxo_id) => {

    let dados = {
        etapas: etapas,
        fluxo: fluxo_id
    }
    const resposta = await api.post('etapa/cadastrar/', dados);
    return resposta; 
}

export const buscarEtapasPeloIdFluxo = async (fluxo_id) => {
    const resposta = await api.get(`etapa/buscar/?fluxo_id=${encodeURIComponent(fluxo_id)}`);
    return resposta; 

}