import React from "react";
import { Tabs } from 'antd';
import TabFormFluxo from './TabFormFluxo/TabFormFluxo';
import { NotificationContainer } from "react-notifications";
import BotaoVoltar from "../../../../components/Botoes/BotaoVoltar/BotaoVoltar"
import TabVincularEtapas from "./TabVincularEtapas/TabVincularEtapas";
import { useFormContext } from "../../context/Provider/FormProvider";
import TabFinalizarFluxo from "./TabFinalizarFluxo/TabFinalizarFluxo";


const { TabPane } = Tabs;

const TabsCriarFluxo = ({funcaoBotaoVoltar}) => {
  
  const {current, setCurrent} = useFormContext();

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
          <TabPane tab="Finalizar" key="3">
            <TabFinalizarFluxo />
          </TabPane>
        </Tabs>
          
        </div>
        <NotificationContainer />
      </React.Fragment>
      
  );
}

export default TabsCriarFluxo;
