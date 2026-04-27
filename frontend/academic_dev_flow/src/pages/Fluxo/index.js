import React from "react";
import { Layout } from 'antd';
import MyHeader from "../../components/Header/Header";
import TabsFluxo from "./screens/TabsFluxo/TabsFluxo"
import MenuAdmin from "../../components/Menus/MenuAdmin/MenuAdmin";
import MenuAluno from "../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../components/Menus/MenuProfessor/MenuProfessor";
import { ProviderFluxo } from "./context/ContextoFluxo";

const ScreenGerenciarFluxos = () => {

    return (
        <React.Fragment>
                <ProviderFluxo>
                    <TabsFluxo /> 
                </ProviderFluxo>
        </React.Fragment>
    )
}

export default ScreenGerenciarFluxos
