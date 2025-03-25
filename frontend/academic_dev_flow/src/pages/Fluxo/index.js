import React from "react";
import { Layout } from 'antd';
import MyHeader from "../../components/Header/Header";
import TabsFluxo from "./screens/TabsFluxo/TabsFluxo"
import MenuAdmin from "../../components/Menus/MenuAdmin/MenuAdmin";
import MenuAluno from "../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../components/Menus/MenuProfessor/MenuProfessor";
import { ProviderFluxo } from "./context/ContextoFluxo";

const ScreenGerenciarFluxos = ({grupo}) => {

    return (
        <React.Fragment>
            { grupo === 'admin' && <MenuAdmin /> }
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader />
                <ProviderFluxo>
                    <TabsFluxo grupo={grupo}/> 
                </ProviderFluxo>
            </Layout>
        </React.Fragment>
    )
}

export default ScreenGerenciarFluxos
