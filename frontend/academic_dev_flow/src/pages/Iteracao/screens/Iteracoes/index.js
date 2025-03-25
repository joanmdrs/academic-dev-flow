import React from "react";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import { Content } from "antd/es/layout/layout";
import { ProviderIteracao } from "../../context/contextoIteracao";
import Iteracoes from "./Iteracoes";

const ScreenIteracoes = ({grupo}) => {


    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>

                <Content>
                    <ProviderIteracao>
                        <Iteracoes grupo={grupo} />
                    </ProviderIteracao>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenIteracoes