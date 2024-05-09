import React from "react";
import {Layout} from 'antd'
import MyHeader from "../../../../components/Header/Header";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import MinhasTarefas from "./MinhasTarefas";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import CustomBreadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import { ProviderTarefa } from "../../context/ContextoTarefa";

const {Content} = Layout

const ScreenMinhasTarefas = ({grupo}) => {

    const breadcrumbRoutes = [
        { title: 'Home', path: `/${grupo}/home` },
        { title: 'Tarefas', path: `/${grupo}/tarefas` },
    ];

    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>
                <CustomBreadcrumb routes={breadcrumbRoutes} />

                <Content>
                    <ProviderGlobalProjeto>
                        <ProviderTarefa>
                            <MinhasTarefas />
                        </ProviderTarefa>
                    </ProviderGlobalProjeto>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenMinhasTarefas