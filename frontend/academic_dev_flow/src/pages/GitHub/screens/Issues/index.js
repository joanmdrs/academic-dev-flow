import React from "react";
import {Layout} from 'antd'
import MyHeader from "../../../../components/Header/Header";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import Issues from "./Issues";
import CustomBreadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
const {Content} = Layout

const ScreenIssues = ({grupo}) => {
    const breadcrumbRoutes = [
        { title: 'Home', path: `/${grupo}/home` },
        { title: 'Projetos', path: `/${grupo}/github-integration` },
        { title: 'Issues', path: ``}
    ];

    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>
                <CustomBreadcrumb routes={breadcrumbRoutes} />
                <Content>

                    <Issues />
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenIssues