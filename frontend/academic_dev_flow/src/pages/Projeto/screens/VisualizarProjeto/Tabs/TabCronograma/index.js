import React from "react";
import { ProviderRelease } from "../../../../../Release/context/ContextoRelease";
import { ProviderIteracao } from "../../../../../Iteracao/context/contextoIteracao";
import { Tabs } from "antd";
import Releases from "./Releases";
import Iteracoes from "./Iteracoes";

const {TabPane} = Tabs

const TabCronograma = () => {
    return (
        <React.Fragment>
            <ProviderRelease>
                <ProviderIteracao>
                    <Tabs indicator={{align: 'center'}}>
                        <TabPane tab="Releases" key="1">
                            <Releases />
                        </TabPane>

                        <TabPane tab="Iterações" key="2">
                            <Iteracoes />
                        </TabPane>
                    </Tabs>
                </ProviderIteracao>
            </ProviderRelease>
        </React.Fragment>
    )
}

export default TabCronograma