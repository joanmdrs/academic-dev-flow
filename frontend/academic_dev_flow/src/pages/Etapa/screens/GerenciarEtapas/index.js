import React from "react";
import GerenciarEtapas from "./GerenciarEtapas";
import { ProviderEtapa } from "../../context/ContextoEtapa";

const ScreenGerenciarEtapas = () => {

    return (
        <React.Fragment>
            <ProviderEtapa>
                <GerenciarEtapas />
            </ProviderEtapa>
        </React.Fragment>
      
    )
}

export default ScreenGerenciarEtapas