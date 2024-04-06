import React, { createContext, useContext, useState } from "react";
const ContextoTipo = createContext();

export const useContextoTipo = () => useContext(ContextoTipo);

export const TipoProvider = ({ children }) => {

    const [dadosTipo, setDadosTipo] = useState(null)
    return (
        <ContextoTipo.Provider
            value={{
                dadosTipo, setDadosTipo
            }}
        >
            {children}
        </ContextoTipo.Provider>
    );
};
