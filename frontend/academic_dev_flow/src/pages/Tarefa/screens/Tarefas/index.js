import React from "react";
import {Layout} from 'antd'
import MyHeader from "../../../../components/Header/Header";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import { ProviderTarefa } from "../../context/ContextoTarefa";
import Tarefas from "./Tarefas";

const {Content} = Layout

const ScreenTarefas = ({grupo}) => {
    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>
                
                <Content>
                    <ProviderTarefa>
                        <Tarefas grupo={grupo}/>
                    </ProviderTarefa>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenTarefas