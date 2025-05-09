import React from "react";
import {Layout} from 'antd'
import MyHeader from "../../../../components/Header/Header";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import { ProviderCommits } from "../../context/ContextoCommits";
import PainelGitHub from "./PainelGithub";

const ScreenPainelGitHub = ({grupo}) => {

    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>
                <ProviderCommits>
                    <PainelGitHub />
                </ProviderCommits>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenPainelGitHub
