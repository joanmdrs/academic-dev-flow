import React from "react";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { ProviderTarefa } from "../../context/ContextoTarefa";
import VisualizarTarefa from "./VisualizarTarefa";

const {Content} = Layout

const ScreenVisualizarTarefa = ({grupo}) => {


    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            { grupo === 'admin' && <MenuAdmin />}

            <Layout>
                <MyHeader/>

                <Content>
                    <ProviderGlobalProjeto>
                        <ProviderTarefa>
                            <VisualizarTarefa />
                        </ProviderTarefa>
                    </ProviderGlobalProjeto>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenVisualizarTarefa