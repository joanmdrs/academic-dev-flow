import React from "react";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import { Content } from "antd/es/layout/layout";
import Release from "./Release";
import { ProviderRelease } from "../../context/ContextoRelease";

const ScreenRelease = ({grupo}) => {


    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>

                <ProviderRelease>
                    <Release grupo={grupo}/>
                </ProviderRelease>

            </Layout>
        </React.Fragment>   
    )
}

export default ScreenRelease