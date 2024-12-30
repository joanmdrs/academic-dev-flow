import React, { createContext, useContext, useState } from "react";
const ContextoEtapa = createContext();

export const useContextoEtapa = () => useContext(ContextoEtapa);

export const ProviderEtapa = ({ children }) => {

    const [dadosEtapa, setDadosEtapa] = useState(null);
    const [etapasSelecionadas, setEtapasSelecionadas] = useState([])

    return (
        <ContextoEtapa.Provider
            value={{
                dadosEtapa, setDadosEtapa,
                etapasSelecionadas, setEtapasSelecionadas
            }}
        >
            {children}
        </ContextoEtapa.Provider>
    );
};
