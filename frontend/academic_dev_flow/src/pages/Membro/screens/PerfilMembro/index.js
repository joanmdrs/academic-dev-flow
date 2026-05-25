import React from "react";
import { ProviderGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import PerfilMembro from "./PerfilMembro";
import { MembroProvider } from "../../context/MembroContexto";

const ScreenPerfilMembro = () => {
    
    return (
        <React.Fragment>
            <MembroProvider>
                <PerfilMembro />
            </MembroProvider>
        </React.Fragment>
    )
}

export default ScreenPerfilMembro