import React, { useState } from "react";
import { Tabs } from 'antd';
import TabFormFluxo from './TabFormFluxo/TabFormFluxo';
import TabFormEtapa from './TabFormEtapa/TabFormEtapa';
import { NotificationContainer } from "react-notifications";
import BotaoVoltar from "../../../../components/Botoes/BotaoVoltar/BotaoVoltar"
import TabVincularEtapas from "./TabVincularEtapas/TabVincularEtapas";


const { TabPane } = Tabs;

const TabsFluxo = ({funcaoBotaoVoltar}) => {

  const [current, setCurrent] = useState("1");

  const next = () => {
    setCurrent((prev) => (parseInt(prev, 10) + 1).toString());
  };

  const prev = () => {
    setCurrent((prev) => (parseInt(prev, 10) - 1).toString());
  };
  
  
  return (
      <React.Fragment>
        <div className="component-etapas-criar-fluxo">
        <div style={{margin: "20px"}}> 
          <BotaoVoltar funcao={funcaoBotaoVoltar}/>
        </div>
        <Tabs activeKey={current} onChange={setCurrent} className="fluxo" tabPosition="left">
          <TabPane tab="Dados do fluxo" key="1">
            <TabFormFluxo />
          </TabPane>
          <TabPane tab="Vincular etapas" key="2">
            <TabVincularEtapas />
          </TabPane>
        </Tabs>
          
        </div>
        <NotificationContainer />
      </React.Fragment>
      
  );
}

export default TabsFluxo;
