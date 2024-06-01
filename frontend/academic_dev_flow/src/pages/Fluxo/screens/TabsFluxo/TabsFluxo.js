import React, { useState } from "react";
import { Tabs } from 'antd';

import "./TabsFluxo.css";
import Titulo from "../../../../components/Titulo/Titulo";
import TabGerenciarFluxos from "./TabGerenciarFluxos/TabGerenciarFluxos";
import TabVincularEtapas from "./TabVincularEtapas/TabVincularEtapas";

const { TabPane } = Tabs;

const TabsFluxo = () => {
    
    const [current, setCurrent] = useState("1")

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
                className="global-div tabs-fluxo"
            >
                <TabPane tab="GERENCIAR FLUXOS" key="1">
                    <TabGerenciarFluxos />
                </TabPane>
                <TabPane tab="ETAPAS DO FLUXO" key="2">
                    <TabVincularEtapas />
                </TabPane>
            </Tabs>

        </React.Fragment>
        
    );
}

export default TabsFluxo;
