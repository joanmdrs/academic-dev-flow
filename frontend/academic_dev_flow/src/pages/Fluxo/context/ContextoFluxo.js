import React, { createContext, useContext, useState } from "react";
const ContextoFluxo = createContext();

export const useContextoFluxo = () => useContext(ContextoFluxo);

export const ProviderFluxo = ({ children }) => {

    const [fluxos, setFluxos] = useState([])
    const [dadosFluxo, setDadosFluxo] = useState(null)
    const [fluxoEtapas, setFluxoEtapas] = useState([])
    const [dadosFluxoEtapa, setDadosFluxoEtapa] = useState(null);

    return (
        <ContextoFluxo.Provider
            value={{
                fluxos, setFluxos,
                dadosFluxo, setDadosFluxo,
                dadosFluxoEtapa, setDadosFluxoEtapa,
                fluxoEtapas, setFluxoEtapas
            }}
        >
            {children}
        </ContextoFluxo.Provider>
    );
};
