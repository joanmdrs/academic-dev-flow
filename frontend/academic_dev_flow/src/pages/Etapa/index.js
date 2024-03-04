import React from "react";
import MyMenu from "../../components/Menu/Menu";
import { Layout } from 'antd';
import MyHeader from "../../components/Header/Header";
import ScreenGerenciarEtapas from "./screens/ScreenGerenciarEtapas/ScreenGerenciarEtapas";

const Etapa = () => {

    return (
        <React.Fragment>
            <MyMenu/>
            <Layout>
                <MyHeader/>
                <ScreenGerenciarEtapas />
            </Layout>
        </React.Fragment>
      
    )
}

export default Etapa