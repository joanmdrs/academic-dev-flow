import React from "react";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import MyHeader from "../../../../components/Header/Header";
import {Layout} from 'antd'
import { ProviderArtefato } from "../../context/ContextoArtefato";
import VisualizarArtefato from "./VisualizarArtefato";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import { ProviderGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";

const {Content} = Layout

const ScreenVisualizarArtefato = ({grupo}) => {


    return (
        <React.Fragment>
            {grupo === 'aluno' && <MenuAluno/>}
            {grupo === 'professor' && <MenuProfessor/>}
            {grupo === 'admin' && <MenuAdmin/>}
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderArtefato>
                        <VisualizarArtefato />
                    </ProviderArtefato>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenVisualizarArtefato