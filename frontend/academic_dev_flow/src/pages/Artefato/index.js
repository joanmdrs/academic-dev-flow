import React from "react";
import MyMenu from "../../components/Menu/Menu";
import { Layout } from 'antd';
import MyHeader from "../../components/Header/Header";
import ScreenGerenciarArtefatos from "./screens/ScreenGerenciarArtefatos/ScreenGerenciarArtefatos";

const Artefato = () => {

    return (
        <React.Fragment>
            <MyMenu/>
            <Layout>
                <MyHeader/>
                <ScreenGerenciarArtefatos />
            </Layout>
        </React.Fragment>
      
    )
}

export default Artefato