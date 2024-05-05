import React from "react";
import {Layout} from 'antd'
import MyHeader from "../../../../components/Header/Header";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MinhasTarefas from "./MinhasTarefas";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
const {Content} = Layout

const ScreenMinhasTarefas = () => {

    return (
        <React.Fragment>
            <MenuAluno/>
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderGlobalProjeto>
                        <MinhasTarefas />
                    </ProviderGlobalProjeto>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenMinhasTarefas