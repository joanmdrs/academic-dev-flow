import React from "react";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import { Content } from "antd/es/layout/layout";
import { MembroProvider } from "../../context/MembroContexto";
import QuadroMembros from "./QuadroMembros";



const ScreenQuadroMembros = ({grupo}) => {


    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>

                <Content>
                    <MembroProvider>
                        <QuadroMembros />
                    </MembroProvider>
                                           
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenQuadroMembros