import React, { useState } from "react";
import { Tabs } from 'antd';

import "./TabsFluxo.css";
import Titulo from "../../../../components/Titulo/Titulo";
import TabGerenciarFluxos from "./TabGerenciarFluxos/TabGerenciarFluxos";
import TabVincularEtapas from "./TabVincularEtapas/TabVincularEtapas";
import Section from "../../../../components/Section/Section";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import SectionContent from "../../../../components/SectionContent/SectionContent";

const { TabPane } = Tabs;

const TabsFluxo = () => {
    
    const [current, setCurrent] = useState("1")

    return (    
        <Section>

            <SectionContent>
                <Tabs
                    tabPosition="left"
                    activeKey={current} 
                    onChange={setCurrent} 
                >
                    <TabPane tab="Fluxos" key="1">
                        <TabGerenciarFluxos />
                    </TabPane>
                    <TabPane tab="Etapas" key="2">
                        <TabVincularEtapas />
                    </TabPane>
                </Tabs>
            </SectionContent>
        </Section>
        
    );
}

export default TabsFluxo;
