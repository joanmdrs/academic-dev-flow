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
        <div className="content">
            <Titulo 
                titulo="Fluxos de desenvolvimento"
                paragrafo="Fluxos > Gerenciar fluxos"
            />
            <div className="pa-10"> 
                <Tabs
                    size="large"
                    indicator={{align: 'center'}}
                    activeKey={current} 
                    onChange={setCurrent} 
                    className="tabs-fluxo"
                >
                    <TabPane tab="Fluxos" key="1">
                        <TabGerenciarFluxos />
                    </TabPane>
                    <TabPane tab="Etapas" key="2">
                        <TabVincularEtapas />
                    </TabPane>
                </Tabs>
            </div>  
        </div>
        
    );
}

export default TabsFluxo;
