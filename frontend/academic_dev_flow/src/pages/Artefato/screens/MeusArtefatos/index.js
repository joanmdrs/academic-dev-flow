import React from "react";
import {Layout} from 'antd'
import MyHeader from "../../../../components/Header/Header";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import CustomBreadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import { ProviderArtefato } from "../../context/ContextoArtefato";
import MeusArtefatos from "./MeusArtefatos";
const {Content} = Layout

const ScreenMeusArtefatos = ({grupo}) => {

    const breadcrumbRoutes = [
        { title: 'Home', path: `/${grupo}/home` },
        { title: 'Artefatos', path: `/${grupo}/artefatos` },
    ];

    return (
        <React.Fragment>
            <MenuAluno/>
            <Layout>
                <MyHeader/>
                <CustomBreadcrumb routes={breadcrumbRoutes} />

                <Content>
                    <ProviderGlobalProjeto>
                        <ProviderArtefato>
                            <MeusArtefatos />
                        </ProviderArtefato>
                    </ProviderGlobalProjeto>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenMeusArtefatos