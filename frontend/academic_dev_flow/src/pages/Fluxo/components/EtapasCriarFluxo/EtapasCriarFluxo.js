import React, { useState } from "react";
import "./EtapasCriarFluxo.css";
import { Button, Tabs } from 'antd';
import FormFluxo from "../FormFluxo/FormFluxo";
import FormEtapa from "../../../Etapa/components/FormEtapa/FormEtapa";
import { criarEtapas } from "../../../../services/etapa_service";
import { criarFluxo } from "../../../../services/fluxo_service";
import { NotificationContainer, NotificationManager } from "react-notifications";
import { FormProvider } from "../../context/Provider/FormProvider";
import DetalharFluxo from "../DetalharFluxo/DetalharFluxo";
import ListaEtapas from "../../../Etapa/components/ListaEtapas/ListaEtapas";
import PainelDetalhes from "../PainelDetalhes/PainelDetalhes";
import BotaoVoltar from "../../../../components/Botoes/BotaoVoltar/BotaoVoltar"

const { TabPane } = Tabs;

const EtapasCriarFluxo = ({funcaoBotaoVoltar}) => {
  const [current, setCurrent] = useState("1");

  const next = () => {
    setCurrent((prev) => (parseInt(prev, 10) + 1).toString());
  };

  const prev = () => {
    setCurrent((prev) => (parseInt(prev, 10) - 1).toString());
  };

  const saveFlow = async (fluxo, etapas) => {
    try {
      if (!fluxo) {
        console.log("Dados inválidos !");
        return;
      }

      const response_flow = await criarFluxo(fluxo);

      if (response_flow.status === 200) {
        if (etapas) {
          try {
            await criarEtapas(etapas, response_flow.data.id);

            NotificationManager.success('Fluxo criado com sucesso!');
            setTimeout(() => {
              document.location.reload();
            }, 2000);
          } catch (error) {
            console.log("Algo deu errado ao cadastrar etapas!", error);
            NotificationManager.error('Algo deu errado ao cadastrar etapas!');
          }
        } else {
          console.log("Impossível criar as etapas, chame a função de deletar o fluxo");
        }
      } else {
        console.log("Deu errado ao cadastrar o fluxo!");
        NotificationManager.error('Algo deu errado ao cadastrar o fluxo!');
      }
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
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
            <PainelDetalhes />
          </TabPane>
        </Tabs>
        
      </div>
      <NotificationContainer />
    </FormProvider>
  );
}

export default EtapasCriarFluxo;
