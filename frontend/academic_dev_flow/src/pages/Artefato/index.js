import React from "react";
import { Layout } from 'antd';
import MyHeader from "../../components/Header/Header";
import ScreenGerenciarArtefatos from "./screens/ScreenGerenciarArtefatos/ScreenGerenciarArtefatos";
import MenuAdmin from "../../components/Menus/MenuAdmin/MenuAdmin";

const Artefato = () => {

    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <ScreenGerenciarArtefatos />
            </Layout>
        </React.Fragment>
      
    )
}

export default Artefato