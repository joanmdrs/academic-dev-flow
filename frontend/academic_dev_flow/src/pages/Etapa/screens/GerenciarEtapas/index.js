import React from "react";
import { Layout } from 'antd';
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import MyHeader from "../../../../components/Header/Header";
import GerenciarEtapas from "./GerenciarEtapas";
import { ProviderEtapa } from "../../context/ContextoEtapa";

const ScreenGerenciarEtapas = ({grupo}) => {

    return (
        <React.Fragment>
            { grupo === 'admin' && <MenuAdmin /> }
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>
                <ProviderEtapa>
                    <GerenciarEtapas />
                </ProviderEtapa>
            </Layout>
        </React.Fragment>
      
    )
}

export default ScreenGerenciarEtapas