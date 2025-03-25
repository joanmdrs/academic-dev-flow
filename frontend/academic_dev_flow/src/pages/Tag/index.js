import React from "react";
import {Layout} from 'antd'
import MenuAdmin from "../../components/Menus/MenuAdmin/MenuAdmin";
import MyHeader from "../../components/Header/Header";
import MenuAluno from "../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../components/Menus/MenuProfessor/MenuProfessor";
import { ProviderTag } from "./context/ContextoTag";
import GerenciarTags from "./screens/GerenciarTags/GerenciarTags";
const { Content } = Layout;

const ScreenGerenciarTags = ({grupo}) => {

    return (
        <React.Fragment>
            { grupo === 'admin' && <MenuAdmin />}
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderTag>
                        <GerenciarTags grupo={grupo} />
                    </ProviderTag>
                </Content>
            </Layout>
        </React.Fragment>
    )
}   

export default ScreenGerenciarTags