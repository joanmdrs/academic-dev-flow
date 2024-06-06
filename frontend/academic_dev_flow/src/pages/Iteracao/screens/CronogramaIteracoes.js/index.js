import React from "react";
import { ProviderIteracao } from "../../context/contextoIteracao";
import CronogramaIteracoes from "./CronogramaIteracoes";

const ScreenCronogramaIteracoes = () => {

    return (
        <ProviderIteracao>
            <CronogramaIteracoes />
        </ProviderIteracao>
 
    )
}

export default ScreenCronogramaIteracoes