import React from "react";
import {Layout} from 'antd'
import MenuAdmin from "../../components/Menus/MenuAdmin/MenuAdmin";
import MyHeader from "../../components/Header/Header";
import GerenciarTipos from "./screens/GerenciarTipos/GerenciarTipos";
import { ProviderTipo } from "./context/ContextoTipo";
const { Content } = Layout;

const PageGerenciarTipos = () => {

    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderTipo>
                        <GerenciarTipos />
                    </ProviderTipo>
                </Content>
            </Layout>
        </React.Fragment>
        
    )
}   

export default PageGerenciarTipos