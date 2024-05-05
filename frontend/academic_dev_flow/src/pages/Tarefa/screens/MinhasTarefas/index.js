import React from "react";
import {Layout} from 'antd'
import MyHeader from "../../../../components/Header/Header";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MinhasTarefas from "./MinhasTarefas";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import CustomBreadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
const {Content} = Layout

const ScreenMinhasTarefas = ({grupo}) => {

    const breadcrumbRoutes = [
        { title: 'Home', path: `/${grupo}/home` },
        { title: 'Tarefas', path: `/${grupo}/tarefas` },
      ];

    return (
        <React.Fragment>
            <MenuAluno/>
            <Layout>
                <MyHeader/>
                <CustomBreadcrumb routes={breadcrumbRoutes} />

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