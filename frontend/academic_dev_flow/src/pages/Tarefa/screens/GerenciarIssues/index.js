import React from "react";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import {Layout} from 'antd'
import MyHeader from "../../../../components/Header/Header";
import { ProviderTarefa } from "../../context/ContextoTarefa";
import GerenciarIssues from "./GerenciarIssues";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
const {Content} = Layout

const ScreenGerenciarIssues = () => {

    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderGlobalProjeto>
                        <ProviderTarefa>
                            <GerenciarIssues />
                        </ProviderTarefa>
                    </ProviderGlobalProjeto>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenGerenciarIssues