import React from "react";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import { ProviderIteracao } from "../../context/contextoIteracao";
import VisualizarIteracao from "./VisualizarIteracao";

const {Content} = Layout

const ScreenVisualizarIteracao = ({grupo}) => {


    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            { grupo === 'admin' && <MenuAdmin />}

            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderIteracao>
                        <VisualizarIteracao />
                    </ProviderIteracao>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenVisualizarIteracao