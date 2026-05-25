import React from "react";
import { MembroProvider } from "../../context/MembroContexto";
import QuadroMembros from "./QuadroMembros";



const ScreenQuadroMembros = () => {

    return (
        <React.Fragment>
            <MembroProvider>
                <QuadroMembros />
            </MembroProvider>
        </React.Fragment>   
    )
}

export default ScreenQuadroMembros