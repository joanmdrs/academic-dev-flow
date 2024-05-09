import React from "react";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import VisualizarProjeto from "./VisualizarProjeto";
import CustomBreadcrumb from "../../../../components/Breadcrumb/Breadcrumb";


const ScreenVisualizarProjeto = ({grupo}) => {
    
    const breadcrumbRoutes = [
        { title: 'Home', path: `/${grupo}/home` },
        { title: 'Projetos', path: `/${grupo}/projetos/meus-projetos`  },
        { title: 'Visualizar', path: `/${grupo}/projetos/visualizar` }
    ];

    return (
        <React.Fragment>
            { grupo === "discente" && <MenuAluno />}
            { grupo === "professor" && <MenuProfessor />}
            { grupo === "admin" && <MenuAdmin />}

            <Layout>
                <MyHeader />
                <CustomBreadcrumb routes={breadcrumbRoutes} />
                <ProviderGlobalProjeto>
                    <VisualizarProjeto />
                </ProviderGlobalProjeto>
            </Layout>
            
        </React.Fragment>
        
    )
}

export default ScreenVisualizarProjeto