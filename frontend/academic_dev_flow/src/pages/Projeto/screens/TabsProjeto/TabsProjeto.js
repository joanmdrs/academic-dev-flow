import React, { useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { Tabs } from "antd";
import Item from "antd/es/list/Item";
import TabProjeto from "./TabProjeto/TabProjeto";
import TabEquipe from "./TabEquipe/TabEquipe";
import TabFluxo from "./TabFluxo/TabFluxo";

const TabsProjeto = () => {
  
    const [current, setCurrent] = useState("1");
    return (    
        <React.Fragment>
          <Titulo 
            titulo="Projetos"
            paragrafo="Administração > Gerenciar projetos"
          />
          <Tabs
            style={{marginTop: "30px"}} 
            activeKey={current} 
            onChange={setCurrent} 
            className="form-box"
          >
            <Item tab="Projeto" key="1">
              <TabProjeto />
            </Item>
            <Item tab="Equipe" key="2">
              <TabEquipe />
            </Item>
            <Item tab="Fluxo" key="3">
                <TabFluxo />
            </Item>
          </Tabs>
  
        </React.Fragment>
        
    );
  }
  
  export default TabsProjeto;