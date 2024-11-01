import React from "react";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import { MembroProvider } from "../../context/MembroContexto";
import Equipe from "./Equipe";
const {Content} = Layout

const ScreenEquipe = ({grupo}) => {
    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}

            <Layout>
                <MyHeader/>

                <Content>
                    <MembroProvider>
                        <Equipe />
                    </MembroProvider>
                                           
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenEquipe