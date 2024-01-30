import React, { useState } from "react";
import "./TabsProjeto.css";
import Titulo from "../../../../components/Titulo/Titulo";
import { Button, Tabs } from "antd";
import Item from "antd/es/list/Item";
import TabProjeto from "./TabProjeto/TabProjeto";
import TabEquipe from "./TabEquipe/TabEquipe";
import TabFluxo from "./TabFluxo/TabFluxo";
import BotaoBuscar from "../../../../components/Botoes/BotaoBuscar/BotaoBuscar";
import BotaoAdicionar from "../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../components/Botoes/BotaoExcluir/BotaoExcluir";

const TabsProjeto = () => {
  
    const [current, setCurrent] = useState("1");
    return (    
        <div className="component-tabs-projeto">
          <Titulo 
            titulo="Projetos"
            paragrafo="Administração > Gerenciar projetos"
          />

          <div className="botoes-de-acao"> 
            <BotaoBuscar nome="BUSCAR PROJETO" />
            <div className="group-buttons"> 
              <BotaoAdicionar />
              <BotaoExcluir />
            </div>
          </div>

          <div className="form-box"> 
            <Tabs
              size="large"
              indicator={{
                align: "center"
              }}
              style={{padding: "20px"}}
              activeKey={current} 
              onChange={setCurrent} 
            > 
              <Item tab="Projeto" key="1" colStyle={{width: "250px"}}>
                <TabProjeto />
              </Item>
              <Item tab="Equipe" key="2" className="tab-item">
                <TabEquipe />
              </Item>
              <Item tab="Fluxo" key="3" className="tab-item">
                  <TabFluxo />
              </Item>
            </Tabs>

            <div className="tabs-projeto-footer-botoes">
              <Button type="primary">
                SALVAR
              </Button >

              <Button type="primary" danger>
                CANCELAR
              </Button>
            </div>
          </div>
          

        </div>
        
    );
  }
  
  export default TabsProjeto;