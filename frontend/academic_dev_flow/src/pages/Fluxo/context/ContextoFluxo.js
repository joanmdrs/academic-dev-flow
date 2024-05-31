import React, { createContext, useContext, useState } from "react";
const ContextoFluxo = createContext();

export const useContextoFluxo = () => useContext(ContextoFluxo);

export const ProviderFluxo = ({ children }) => {

    const [fluxos, setFluxos] = useState([])
    const [dadosFluxo, setDadosFluxo] = useState(null)
    const [fluxosSelecionados, setFluxosSelecionados] = useState([])
    const [dadosEtapas, setDadosEtapas] = useState([]);
    const [current, setCurrent] = useState("1");

    return (
        <ContextoFluxo.Provider
            value={{
                fluxos, setFluxos,
                dadosFluxo, setDadosFluxo,
                dadosEtapas, setDadosEtapas,
                fluxosSelecionados, setFluxosSelecionados,
                current, setCurrent
            }}
        >
            {children}
        </ContextoFluxo.Provider>
    );
};
