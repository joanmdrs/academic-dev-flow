import React from "react";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import { Content } from "antd/es/layout/layout";
import { ProviderIteracao } from "../../context/contextoIteracao";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import CronogramaIteracoes from "./CronogramaIteracoes";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";

const ScreenCronogramaIteracoes = () => {

    return (
        <ProviderGlobalProjeto>
            <ProviderIteracao>
                <CronogramaIteracoes />
            </ProviderIteracao>
        </ProviderGlobalProjeto>
 
    )
}

export default ScreenCronogramaIteracoes