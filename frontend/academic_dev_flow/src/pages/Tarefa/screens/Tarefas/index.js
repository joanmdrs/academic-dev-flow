import React from "react";
import {Layout} from 'antd'
import MyHeader from "../../../../components/Header/Header";
import { ProviderTarefa } from "../../context/ContextoTarefa";
import Tarefas from "./Tarefas";

const {Content} = Layout

const ScreenTarefas = () => {
    return (
        <React.Fragment>
            
            <Layout>
                
                <Content>
                    <ProviderTarefa>
                        <Tarefas />
                    </ProviderTarefa>
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenTarefas