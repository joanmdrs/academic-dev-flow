import React from "react";
import {Layout} from 'antd'
import MenuAdmin from "../../components/Menus/MenuAdmin/MenuAdmin";
import MyHeader from "../../components/Header/Header";
import GerenciarTipos from "./screens/GerenciarTipos/GerenciarTipos";
const { Content } = Layout;

const PageGerenciarTipos = () => {

    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <Content>
                    <GerenciarTipos />
                </Content>
            </Layout>
        </React.Fragment>
        
    )
}   

export default PageGerenciarTipos