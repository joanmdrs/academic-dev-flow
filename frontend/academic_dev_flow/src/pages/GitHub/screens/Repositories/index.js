import React from "react";
import {Layout} from 'antd'
import MyHeader from "../../../../components/Header/Header";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import Repositories from "./Repositories";
const {Content} = Layout

const ScreenRepositories = ({grupo}) => {

    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>
                <Content>
                    <Repositories />
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenRepositories