import React from "react";
import { ProviderPontuacao } from "../../context/ContextoPontuacao";
import GerenciarPontuacao from "./GerenciarPontuacao";

const ScreenGerencirPontuacao = () => {

    return (
        <React.Fragment>
            <ProviderPontuacao>
                <GerenciarPontuacao />
            </ProviderPontuacao>
        </React.Fragment>
    )
}

export default ScreenGerencirPontuacao