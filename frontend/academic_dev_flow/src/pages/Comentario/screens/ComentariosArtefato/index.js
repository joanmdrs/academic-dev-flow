import React from "react";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import CustomBreadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import { Content } from "antd/es/layout/layout";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { ProviderComentario } from "../../context/ContextoComentario";
import { useParams } from "react-router-dom";
import ComentariosArtefato from "./ComentariosArtefato";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";

const ScreenComentariosArtefato = ({grupo}) => {

    const breadcrumbRoutes = [
        { title: 'Home', path: `/${grupo}/home` },
        { title: 'Artefatos', path: `/${grupo}/artefatos`},
        { title: 'Comentários', path: '' },
    ]

    const { idTarefa } = useParams();

    console.log(idTarefa)

    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            { grupo === 'admin' && <MenuAdmin />}
            <Layout>
                <MyHeader/>
                <CustomBreadcrumb routes={breadcrumbRoutes} />

                <Content>
                    <ProviderGlobalProjeto>
                        <ProviderComentario>
                            <ComentariosArtefato />
                        </ProviderComentario>
                    </ProviderGlobalProjeto>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenComentariosArtefato