import React from "react";
import TabsFluxo from "./screens/TabsFluxo/TabsFluxo"
import { ProviderFluxo } from "./context/ContextoFluxo";

const ScreenGerenciarFluxos = () => {

    return (
        <React.Fragment>
            <ProviderFluxo>
                <TabsFluxo /> 
            </ProviderFluxo>
        </React.Fragment>
    )
}

export default ScreenGerenciarFluxos
