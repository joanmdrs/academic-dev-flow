import React from "react";
import {Layout} from 'antd'
import MyHeader from "../../../../components/Header/Header";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import GithubProjetos from "./GithubProjetos";
const {Content} = Layout

const ScreenGithubProjetos = ({grupo}) => {

    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>
                <Content>
                    <GithubProjetos />
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenGithubProjetos