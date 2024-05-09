import React from "react";
import { ProviderTarefa } from "../../context/ContextoTarefa";
import QuadroTarefas from "./QuadroTarefas";

const ScreenQuadroTarefas = () => {
    return (
        <ProviderTarefa>
            <QuadroTarefas />
        </ProviderTarefa>
    );
}

export default ScreenQuadroTarefas