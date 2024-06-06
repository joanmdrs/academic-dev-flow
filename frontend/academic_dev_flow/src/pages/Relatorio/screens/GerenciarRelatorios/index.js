import React from "react";
import GerenciarRelatorios from "./GerenciarRelatorios";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";

const {Content} = Layout

const ScreenGerenciarRelatorios = ({grupo}) => {

    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno/> }
            { grupo === 'professor' && <MenuProfessor />}
            { grupo === 'admin' && <MenuAdmin />}
            <Layout>
                <MyHeader/>
                <Content>
                    <GerenciarRelatorios />
                </Content>
            </Layout>
        </React.Fragment>
    )

}

export default ScreenGerenciarRelatorios