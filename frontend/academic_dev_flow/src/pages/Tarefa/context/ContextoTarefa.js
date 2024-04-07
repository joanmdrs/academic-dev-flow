import React, { createContext, useContext, useState } from "react";
const ContextoTarefa = createContext();

export const useContextoTarefa = () => useContext(ContextoTarefa);

export const ProviderTarefa = ({ children }) => {

    const [dadosTarefa, setDadosTarefa] = useState(null)
    const [dadosProjeto, setDadosProjeto] = useState(null)

    return (
        <ContextoTarefa.Provider
            value={{
                dadosTarefa, setDadosTarefa,
                dadosProjeto, setDadosProjeto
            }}
        >
            {children}
        </ContextoTarefa.Provider>
    );
};
