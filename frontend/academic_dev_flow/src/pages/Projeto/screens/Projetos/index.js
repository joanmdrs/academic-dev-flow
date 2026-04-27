import React from "react";
import { ProviderProjeto } from "../../context/ContextoProjeto";
import Projetos from "./Projetos";

const ScreenProjetos = () => {

    return (
        <React.Fragment>
            
            <ProviderProjeto>
                <Projetos />
            </ProviderProjeto>
        </React.Fragment>   
    )
}

export default ScreenProjetos