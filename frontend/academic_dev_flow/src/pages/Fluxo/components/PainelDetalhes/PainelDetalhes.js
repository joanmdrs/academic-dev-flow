import React from "react";
import DetalharFluxo from "../DetalharFluxo/DetalharFluxo";
import ListaEtapas from "../../../Etapa/components/ListaEtapas/ListaEtapas";
import "./PainelDetalhes.css";
import { Button } from "antd";

const PainelDetalhes = () => {

    return (
        <div className="form-box component-painel-detalhes" > 
            <div> 
                <h4> Detalhes do fluxo</h4>
                <DetalharFluxo />
            </div>
            <div> 
                <h4> Detalhes das etapas </h4>
                <ListaEtapas />
            </div>
            <div>
                <Button type="primary">Finalizar</Button>
            </div>
        </div>
    )
}

export default PainelDetalhes;