import React from "react";
import ViewDetalhesFluxo from "../../ViewDetalhesFluxo/ViewDetalhesFluxo";
import ViewDetalhesEtapas from "../../ViewDetalhesEtapas/ViewDetalhesEtapas"; 
import "./TabFinalizar.css";
import { useFormContext } from "../../../context/Provider/FormProvider";
import { Button } from "antd";
import { NotificationManager } from "react-notifications";
import { recarregarPagina } from "../../../../../services/utils";
import { criarFluxo } from "../../../../../services/fluxo_service";
import { criarEtapas } from "../../../../../services/etapa_service";

const TabFinalizar = () => {

    const {hasDadosFluxo} = useFormContext();
    const {hasDadosEtapas} = useFormContext();

    const handleCriarFluxo = async () => {
        try {
          const resposta_fluxo = await criarFluxo(hasDadosFluxo);
      
          if (resposta_fluxo.status === 200) {
            const resposta_etapas = await criarEtapas(hasDadosEtapas, resposta_fluxo.data.id);
      
            if (resposta_etapas.status === 201) {
              NotificationManager.success('Fluxo e etapas criados com sucesso!');
              recarregarPagina();
            } else {
              NotificationManager.error('Falha ao criar etapas, contate o suporte!');
            }
          } else {
            NotificationManager.error('Falha ao criar fluxo, contate o suporte!');
          }
        } catch (error) {
          console.error("Ocorreu um erro:", error);
          NotificationManager.error('Ocorreu um problema durante a operação, contate o suporte!');
        }
      };
    

    return (
        <div className="form-box component-view-detalhes-fluxo-etapas" > 
            <div> 
                <h4> Detalhes do fluxo</h4>
                <ViewDetalhesFluxo />
            </div>
            <div> 
                <h4> Detalhes das etapas </h4>
                <ViewDetalhesEtapas />
            </div>
            <div>
                <Button type="primary" onClick={handleCriarFluxo}>Finalizar</Button>
            </div>
        </div>
    )
}

export default TabFinalizar;