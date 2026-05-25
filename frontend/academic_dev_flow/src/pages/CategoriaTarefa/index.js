import React from "react";
import { ProviderCategoriaTarefa } from "./context/ContextoCategoriaTarefa";
import GerenciarCategoriaTarefa from "./screens/GerenciarCategoriaTarefa/GerenciarCategoriaTarefa";

const ScreenGerenciarCategoriaTarefa = () => {

    return (
        <React.Fragment>
            <ProviderCategoriaTarefa>
                <GerenciarCategoriaTarefa />
            </ProviderCategoriaTarefa>
        </React.Fragment>
    )
}   

export default ScreenGerenciarCategoriaTarefa