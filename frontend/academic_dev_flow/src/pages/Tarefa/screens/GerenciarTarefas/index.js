import React from "react";
import { ProviderTarefa } from "../../context/ContextoTarefa";
import GerenciarTarefas from "./GerenciarTarefas"
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";

const ScreenGerenciarTarefas = () => {

    return (
        <React.Fragment>
            <ProviderGlobalProjeto>
                <ProviderTarefa>
                    <GerenciarTarefas />
                </ProviderTarefa>
            </ProviderGlobalProjeto>
            
        </React.Fragment>   
    )
}

export default ScreenGerenciarTarefas