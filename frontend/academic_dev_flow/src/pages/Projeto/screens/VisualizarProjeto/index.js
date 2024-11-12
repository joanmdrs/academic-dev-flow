import React from "react";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import { Content } from "antd/es/layout/layout";
import VisualizarProjeto from "./VisualizarProjeto";

const ScreenVisualizarProjeto = ({grupo}) => {

    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>
                <Content>
                    <VisualizarProjeto />
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenVisualizarProjeto