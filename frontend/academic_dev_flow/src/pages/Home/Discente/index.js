import React from "react";
import { Layout } from "antd";
import HomeDiscente from "./HomeDiscente";
import MenuAluno from "../../../components/Menus/MenuAluno/MenuAluno";
import MyHeader from "../../../components/Header/Header";
import MenuProfessor from "../../../components/Menus/MenuProfessor/MenuProfessor";


const ScreenHomeDiscente = ({grupo}) => {

    return (

        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader />
                <HomeDiscente />
            </Layout>
        </React.Fragment>
    )
}

export default ScreenHomeDiscente