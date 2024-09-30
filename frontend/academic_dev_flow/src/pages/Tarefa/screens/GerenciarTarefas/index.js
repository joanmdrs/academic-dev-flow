import React from "react";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import {Layout} from 'antd'
import MyHeader from "../../../../components/Header/Header";
import { ProviderTarefa } from "../../context/ContextoTarefa";
import GerenciarTarefas from "./GerenciarTarefas"
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
const {Content} = Layout

const ScreenGerenciarTarefas = () => {

    return (
        <React.Fragment>
            <MenuAdmin/>
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderGlobalProjeto>
                        <ProviderTarefa>
                            <GerenciarTarefas />
                        </ProviderTarefa>
                    </ProviderGlobalProjeto>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenGerenciarTarefas