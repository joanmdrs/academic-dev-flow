import React from "react";
import { ProviderArtefato } from "../../../../../Artefato/context/ContextoArtefato";
import Artefatos from "./Artefatos";

const TabArtefatos = () => {
    return (
        <React.Fragment>
            <ProviderArtefato>
                <Artefatos />
            </ProviderArtefato>
        </React.Fragment>
    )
}

export default TabArtefatos