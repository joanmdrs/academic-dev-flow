import React from "react";
import { ProviderRelease } from "../../../../../Release/context/ContextoRelease";
import { ProviderIteracao } from "../../../../../Iteracao/context/contextoIteracao";
import { Collapse } from "antd";
import Releases from "./Releases";
import Iteracoes from "./Iteracoes";

const {Panel} = Collapse


const TabCronograma = () => {
    return (
        <React.Fragment>
            <ProviderRelease>
                <ProviderIteracao>
                    <Collapse bordered={false}>
                        <Panel header="Releses">
                            <Releases />
                        </Panel>
                        <Panel header="Iterações">
                            <Iteracoes />
                        </Panel>
                    </Collapse>
                </ProviderIteracao>
            </ProviderRelease>
        </React.Fragment>
    )
}

export default TabCronograma