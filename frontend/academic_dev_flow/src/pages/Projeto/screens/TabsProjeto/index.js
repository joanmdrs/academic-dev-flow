import { Tabs } from "antd";
import Item from "antd/es/list/Item";
import React, { useState } from "react";
import TabProjeto from "./TabProjeto/TabProjeto";
import TabEquipe from "./TabEquipe/TabEquipe";
import TabFluxo from "./TabFluxo/TabFluxo";

const TabsProjeto = ({onSaveProject, onCancel}) => {

    const [current, setCurrent] = useState("1");


    return (
        <Tabs
            size="large"
            indicator={{
            align: "center"
            }}
            style={{padding: "20px"}}
            activeKey={current} 
            onChange={setCurrent} 
            className="tabs-projeto"
        > 
            <Item tab="Projeto" key="1">
                <TabProjeto onSubmit={onSaveProject} onCancel={onCancel} />
            </Item>
            <Item tab="Equipe" key="2" className="tab-item">
                <TabEquipe />
            </Item>
            <Item tab="Fluxo" key="3" className="tab-item">
                <TabFluxo />
            </Item>
        </Tabs> 
    )
}

export default TabsProjeto