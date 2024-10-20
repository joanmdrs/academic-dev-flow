import React from "react";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import CustomBreadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import { Content } from "antd/es/layout/layout";
import MeusProjetos from "./MeusProjetos";
import { ProviderProjeto } from "../../context/ContextoProjeto";

const ScreenMeusProjetos = ({grupo}) => {

    const breadcrumbRoutes = [
        { title: 'Home', path: `/${grupo}/home` },
        { title: 'Projetos', path: `/${grupo}/projetos/meus-projetos` },
      ];

    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>
                <CustomBreadcrumb routes={breadcrumbRoutes} />

                <Content>
                    <ProviderProjeto>
                        <MeusProjetos />
                    </ProviderProjeto>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenMeusProjetos