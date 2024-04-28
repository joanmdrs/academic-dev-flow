import React, { createContext, useContext, useState } from "react";
const ContextoTipo = createContext();

export const useContextoTipo = () => useContext(ContextoTipo);

export const ProviderTipo = ({ children }) => {

    const [dadosTipo, setDadosTipo] = useState(null)
    const [tipos, setTipos] = useState([])
    return (
        <ContextoTipo.Provider
            value={{
                dadosTipo, setDadosTipo,
                tipos, setTipos,
            }}
        >
            {children}
        </ContextoTipo.Provider>
    );
};
