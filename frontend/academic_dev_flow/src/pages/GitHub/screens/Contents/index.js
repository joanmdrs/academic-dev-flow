import React from "react";
import {Layout} from 'antd'
import MyHeader from "../../../../components/Header/Header";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import CustomBreadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import Contents from "./Contents";
const {Content} = Layout

const ScreenContents = ({grupo}) => {
    const breadcrumbRoutes = [
        { title: 'Home', path: `/${grupo}/home` },
        { title: 'Projetos', path: `/${grupo}/github-integration` },
        { title: 'Contents', path: ``}
    ];

    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>
                <CustomBreadcrumb routes={breadcrumbRoutes} />
                <Content>

                    <Contents />
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenContents