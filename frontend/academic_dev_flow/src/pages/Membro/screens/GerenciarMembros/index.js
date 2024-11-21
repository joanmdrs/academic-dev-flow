import React from "react";
import { Layout } from 'antd';
import MyHeader from "../../../../components/Header/Header";
import { MembroProvider } from "../../context/MembroContexto";
import GerenciarMembros from "./GerenciarMembros";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import { Content } from "antd/es/layout/layout";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";

const ScreenGerenciarMembros = ({grupo}) => {

    return (
        <React.Fragment>
            { grupo === 'admin' && <MenuAdmin />}
            { grupo === 'professor' && <MenuProfessor />}


            <Layout>
                <MyHeader/>
                <Content>
                    <MembroProvider>
                        <GerenciarMembros />
                    </MembroProvider>
                </Content>
            </Layout>
        </React.Fragment>
      
    )
}

export default ScreenGerenciarMembros