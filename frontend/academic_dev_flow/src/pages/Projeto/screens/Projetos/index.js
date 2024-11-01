import React from "react";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import { Content } from "antd/es/layout/layout";
import { ProviderProjeto } from "../../context/ContextoProjeto";
import Projetos from "./Projetos";

const ScreenProjetos = ({grupo}) => {

    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderProjeto>
                        <Projetos />
                    </ProviderProjeto>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenProjetos