import React from "react";
import { Tabs } from 'antd';
import TabFormFluxo from './TabFormFluxo/TabFormFluxo';
import { NotificationContainer } from "react-notifications";
import BotaoVoltar from "../../../../components/Botoes/BotaoVoltar/BotaoVoltar"
import TabVincularEtapas from "./TabVincularEtapas/TabVincularEtapas";
import { useFormContext } from "../../context/Provider/FormProvider";
import TabFinalizarFluxo from "./TabFinalizarFluxo/TabFinalizarFluxo";
import "./TabsCriarFluxo.css";
import Titulo from "../../../../components/Titulo/Titulo";


const { TabPane } = Tabs;

const TabsCriarFluxo = ({funcaoBotaoVoltar}) => {
  
  const {current, setCurrent} = useFormContext();

  return (    
      <React.Fragment>
        <Titulo 
          titulo="Fluxos de desenvolvimento"
          paragrafo="Fluxos > Gerenciar fluxos"
        />
        <Tabs
          style={{marginTop: "30px"}} 
          activeKey={current} 
          onChange={setCurrent} 
          className="form-box"
        >
          <TabPane tab="GERENCIAR FLUXOS" key="1">
            <TabFormFluxo />
          </TabPane>
          <TabPane tab="ETAPAS DO FLUXO" key="2">
            <TabVincularEtapas />
          </TabPane>
        </Tabs>

      </React.Fragment>
      
  );
}

export default TabsCriarFluxo;
