import React, { useState } from "react";
import ViewDetalhesFluxo from "../../ViewDetalhesFluxo/ViewDetalhesFluxo";
import ViewDetalhesEtapas from "../../ViewDetalhesEtapas/ViewDetalhesEtapas"; 
import "./TabFinalizar.css";
import { useFormContext } from "../../../context/Provider/FormProvider";
import { Button } from "antd";
import { NotificationManager } from "react-notifications";
import { recarregarPagina } from "../../../../../services/utils";
import { atualizarFluxo, criarFluxo } from "../../../../../services/fluxo_service";
import { criarEtapas } from "../../../../../services/etapa_service";


const TabFinalizar = () => {

    const {hasDadosFluxo} = useFormContext();
    const {hasDadosEtapas} = useFormContext();


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
        </div>
    )
}

export default TabFinalizar;