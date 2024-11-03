import React from "react";
import {Layout} from 'antd'
import MyHeader from "../../../../components/Header/Header";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import CustomBreadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import Commits from "./Commits";
import { ProviderCommits } from "../../context/ContextoCommits";
const {Content} = Layout

const ScreenCommits = ({grupo}) => {
    const breadcrumbRoutes = [
        { title: 'Home', path: `/${grupo}/home` },
        { title: 'Projetos', path: `/${grupo}/github-integration` },
        { title: 'Commits', path: ``}
    ];

    
    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>
                <CustomBreadcrumb routes={breadcrumbRoutes} />
                <Content>
                    <ProviderCommits>
                        <Commits />
                    </ProviderCommits>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenCommits