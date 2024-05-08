import React from "react";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import CustomBreadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import { Content } from "antd/es/layout/layout";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { ProviderComentario } from "../../context/ContextoComentario";
import GerenciarComentariosTarefa from "./GerenciarComentariosTarefa";
import { useParams } from "react-router-dom";

const ScreenGerenciarComentariosTarefa = ({grupo}) => {

    const breadcrumbRoutes = [
        { title: 'Home', path: `/${grupo}/home` },
        { title: 'Tarefas', path: `/${grupo}/tarefas`},
        { title: 'Comentários', path: '' },
    ]

    const { idTarefa } = useParams();

    console.log(idTarefa)

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
                            <GerenciarComentariosTarefa idTarefa={idTarefa} />
                        </ProviderComentario>
                    </ProviderGlobalProjeto>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenGerenciarComentariosTarefa