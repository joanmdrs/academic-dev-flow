import { Button, Space, Tabs } from "antd";
import Item from "antd/es/list/Item";
import React, { useState } from "react";
import TabProjeto from "./TabProjeto/TabProjeto";
import TabEquipe from "./TabEquipe/TabEquipe";
import TabFluxo from "./TabFluxo/TabFluxo";
import TabGitHub from "./TabGitHub/TabGithub";
import Titulo from "../../../../components/Titulo/Titulo";
import { useContextoProjeto } from "../../context/ContextoProjeto";
import { FaClosedCaptioning } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const {TabPane} = Tabs

const TabsProjeto = ({onSubmit, onCancel}) => {
    const {dadosProjeto} = useContextoProjeto()

    return (

        <div>   
            <Tabs
                style={{marginTop: '20px'}}
                tabPosition="top"
                tabBarExtraContent={
                    <div> 
                        <Button 
                            type="primary" 
                            onClick={onCancel} 
                            icon={<IoClose />}
                            danger
                        > 
                            Fechar
                        </Button>
                    </div>
                }
            > 
                <TabPane 
                    tab="Projeto" 
                    key="1" 
                    style={{marginTop: '0'}} 
                    forceRender
                >
                    <TabProjeto onCancel={onCancel} onSubmit={onSubmit} />
                </TabPane>
                
                <TabPane 
                    tab="GitHub" 
                    key="2" 
                    forceRender
                > 
                    <TabGitHub onSubmit={onSubmit} onCancel={onCancel}/>
                
                </TabPane>
                <TabPane 
                    tab="Equipe" 
                    key="3" 
                    style={{marginTop: '0'}} 
                    forceRender
                >
                    <TabEquipe onCancel={onCancel} />
                </TabPane>

            </Tabs> 
        </div>

    )
}

export default TabsProjeto