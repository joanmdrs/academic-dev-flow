import React from "react";
import { Layout } from 'antd';
import MyHeader from "../../components/Header/Header";
import ScreenGerenciarEtapas from "./screens/ScreenGerenciarEtapas/ScreenGerenciarEtapas";
import MenuAdmin from "../../components/Menus/MenuAdmin/MenuAdmin";

const Etapa = () => {

    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <ScreenGerenciarEtapas />
            </Layout>
        </React.Fragment>
      
    )
}

export default Etapa