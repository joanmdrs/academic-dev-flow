import React from "react";
import "./FlowDetails.css";
import { useFormContext } from "../FormProvider/FormProvider";

const FlowDetails = () => {

    const {flowDetails} = useFormContext();

    return (
        <div className="flow-details">
            <div className="flow-box">
                <h4>Detalhes do fluxo</h4>
                <label> Nome: </label>
                <p className="flow-nome"> {flowDetails.nome}</p>
                <label>Descrição: </label>
                <p className="flow-descricao"> {flowDetails.descricao} </p>

            </div>
            <div className="etapa-box">
                <h4>Etapas do fluxo</h4>
            </div>
        </div>
    )
}

export default FlowDetails;