import React from "react";
import {Layout} from 'antd'
import MyHeader from "../../../../components/Header/Header";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import CustomBreadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import { ProviderArtefato } from "../../context/ContextoArtefato";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import Artefatos from "./Artefatos";
const {Content} = Layout

const ScreenArtefatos = ({grupo}) => {

    const breadcrumbRoutes = [
        { title: 'Home', path: `/${grupo}/home` },
        { title: 'Artefatos', path: `/${grupo}/artefatos` },
    ];

    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>
                {/* <CustomBreadcrumb routes={breadcrumbRoutes} /> */}
                <Content>
                    <ProviderArtefato>
                        {/* <MeusArtefatos /> */}
                        <Artefatos />
                    </ProviderArtefato>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenArtefatos