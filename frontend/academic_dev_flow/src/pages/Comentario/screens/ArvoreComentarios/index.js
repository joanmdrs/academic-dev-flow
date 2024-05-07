import React from "react";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import CustomBreadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import { Content } from "antd/es/layout/layout";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { ProviderComentario } from "../../context/ContextoComentario";
import ArvoreComentarios from "./ArvoreComentarios";

const ScreenArvoreComentarios = ({grupo, page}) => {

    const breadcrumbRoutes = [
        { title: 'Home', path: `/${grupo}/home` },
        { title: {page}, path: `/${grupo}/${page}`},
        { title: 'Comentários', path: `/${grupo}/{page}/comentarios` },
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
                        <ProviderComentario>
                            <ArvoreComentarios />
                        </ProviderComentario>
                    </ProviderGlobalProjeto>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenArvoreComentarios