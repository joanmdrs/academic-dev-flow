import React from "react";
import { Layout } from 'antd';
import { ProviderFeedback } from "../context/ContextoFeedback";
import Feedback from "./Feedback";
import MenuAdmin from "../../../components/Menus/MenuAdmin/MenuAdmin";
import MenuAluno from "../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../components/Menus/MenuProfessor/MenuProfessor";
import MyHeader from "../../../components/Header/Header";
const {Content} = Layout

const ScreenFeedbacks = ({grupo}) => {

    return (
        <React.Fragment>
            { grupo === 'admin' && <MenuAdmin /> }
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}
            <Layout>
                <MyHeader/>
                <Content>
                    <ProviderFeedback>
                        <Feedback  grupo={grupo} />
                    </ProviderFeedback>
                </Content>
            </Layout>
        </React.Fragment>
      
    )
}

export default ScreenFeedbacks