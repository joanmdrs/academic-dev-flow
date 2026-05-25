import React from "react";
import { MembroProvider } from "../../context/MembroContexto";
import GerenciarMembros from "./GerenciarMembros";

const ScreenGerenciarMembros = () => {

    return (
        <React.Fragment>
            <MembroProvider>
                <GerenciarMembros />
            </MembroProvider>
        </React.Fragment>
    )
}

export default ScreenGerenciarMembros