import React, { createContext, useContext, useState } from "react";
const ContextoCategoriaTarefa = createContext();

export const useContextoCategoriaTarefa = () => useContext(ContextoCategoriaTarefa);

export const ProviderCategoriaTarefa = ({ children }) => {

    const [dadosCategoria, setDadosCategoria] = useState(null)
    const [categorias, setCategorias] = useState([])
    return (
        <ContextoCategoriaTarefa.Provider
            value={{
                dadosCategoria, setDadosCategoria,
                categorias, setCategorias
            }}
        >
            {children}
        </ContextoCategoriaTarefa.Provider>
    );
};
