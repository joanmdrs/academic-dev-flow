import React from "react";
import { ProviderTarefa } from "../../../../../Tarefa/context/ContextoTarefa";
import Tarefas from "./Tarefas";

const TabTarefas = () => {
    return (
        <React.Fragment>
           <ProviderTarefa>
                <Tarefas />
           </ProviderTarefa>
        </React.Fragment>
    )
}

export default TabTarefas