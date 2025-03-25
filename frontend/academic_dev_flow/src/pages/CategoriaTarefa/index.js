import React from "react";
import {Layout} from 'antd'
import MenuAdmin from "../../components/Menus/MenuAdmin/MenuAdmin";
import MyHeader from "../../components/Header/Header";
import { ProviderCategoriaTarefa } from "./context/ContextoCategoriaTarefa";
import GerenciarCategoriaTarefa from "./screens/GerenciarCategoriaTarefa/GerenciarCategoriaTarefa";
import MenuAluno from "../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../components/Menus/MenuProfessor/MenuProfessor";
const { Content } = Layout;

const ScreenGerenciarCategoriaTarefa = ({grupo}) => {

    return (
        <React.Fragment>
            { grupo === 'admin' && <MenuAdmin />}
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderCategoriaTarefa>
                        <GerenciarCategoriaTarefa grupo={grupo}/>
                    </ProviderCategoriaTarefa>
                </Content>
            </Layout>
        </React.Fragment>
    )
}   

export default ScreenGerenciarCategoriaTarefa