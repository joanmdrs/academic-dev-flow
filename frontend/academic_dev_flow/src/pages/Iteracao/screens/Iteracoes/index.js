import React from "react";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import { Content } from "antd/es/layout/layout";
import { ProviderIteracao } from "../../context/contextoIteracao";
import Iteracoes from "./Iteracoes";

const ScreenIteracoes = () => {


    return (
        <React.Fragment>
            <ProviderIteracao>
                <Iteracoes />
            </ProviderIteracao>
        </React.Fragment>   
    )
}

export default ScreenIteracoes