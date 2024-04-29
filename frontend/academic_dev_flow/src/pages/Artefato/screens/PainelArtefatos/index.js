import React from "react";
import { ProviderArtefato } from "../../context/ContextoArtefato";
import PainelArtefatos from "./PainelArtefatos";

const ScreenPainelArtefatos = () => {

    return (
        <ProviderArtefato>
            <PainelArtefatos />
        </ProviderArtefato>
    )
}

export default ScreenPainelArtefatos