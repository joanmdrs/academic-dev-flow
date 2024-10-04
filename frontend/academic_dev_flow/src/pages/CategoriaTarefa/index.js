import React from "react";
import {Layout} from 'antd'
import MenuAdmin from "../../components/Menus/MenuAdmin/MenuAdmin";
import MyHeader from "../../components/Header/Header";
import { ProviderCategoriaTarefa } from "./context/ContextoCategoriaTarefa";
import GerenciarCategoriaTarefa from "./screens/GerenciarCategoriaTarefa/GerenciarCategoriaTarefa";
const { Content } = Layout;

const ScreenGerenciarCategoriaTarefa = () => {

    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderCategoriaTarefa>
                        <GerenciarCategoriaTarefa />
                    </ProviderCategoriaTarefa>
                </Content>
            </Layout>
        </React.Fragment>
    )
}   

export default ScreenGerenciarCategoriaTarefa