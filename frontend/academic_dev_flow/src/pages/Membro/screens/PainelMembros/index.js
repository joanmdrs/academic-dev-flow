import React from "react";
import PainelMembros from "./PainelMembros";
import { MembroProvider } from "../../context/MembroContexto";

const ScreenPainelMembros = () => {

    return (
        <MembroProvider>
            <PainelMembros />
        </MembroProvider>
    )
}

export default ScreenPainelMembros