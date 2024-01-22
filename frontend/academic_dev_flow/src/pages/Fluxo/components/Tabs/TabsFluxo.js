import React, { useState } from "react";
import { Tabs } from 'antd';
import FormFluxo from "./TabFormFluxo/TabFormFluxo";
import FormEtapa from "./TabFormEtapa/TabFormEtapa";
import { NotificationContainer } from "react-notifications";
import { FormProvider } from "../../context/Provider/FormProvider";
import ViewDetalhesFluxoEtapas from "./TabFinalizar/TabFinalizar";
import BotaoVoltar from "../../../../components/Botoes/BotaoVoltar/BotaoVoltar"


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
    <FormProvider>
      <div className="component-etapas-criar-fluxo">
        <div style={{margin: "20px"}}> 
          <BotaoVoltar funcao={funcaoBotaoVoltar}/>
        </div>
        <Tabs activeKey={current} onChange={setCurrent} className="fluxo" tabPosition="left">
          <TabPane tab="Fluxo" key="1">
            <FormFluxo />
          </TabPane>
          <TabPane tab="Etapas" key="2">
            <FormEtapa />
          </TabPane>
          <TabPane tab="Detalhes" key="3">
            <ViewDetalhesFluxoEtapas />
          </TabPane>
        </Tabs>
        
      </div>
      <NotificationContainer />
    </FormProvider>
  );
}

export default TabsFluxo;
