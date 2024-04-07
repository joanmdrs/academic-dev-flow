import React from "react";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import {Layout} from 'antd'
import MyHeader from "../../../../components/Header/Header";
import { ProviderTarefa } from "../../context/ContextoTarefa";
import GerenciarTarefas from "./GerenciarTarefas"
const {Content} = Layout

const ScreenGerenciarTarefas = () => {

    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderTarefa>
                        <GerenciarTarefas />
                    </ProviderTarefa>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenGerenciarTarefas