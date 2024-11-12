import React from "react";
import { MembroProvider } from "../../../../../Membro/context/MembroContexto";
import Membros from "./Membros";

const TabMembros = () => {
    return (
        <React.Fragment>
           <MembroProvider>
                <Membros />
           </MembroProvider>
        </React.Fragment>
    )
}

export default TabMembros