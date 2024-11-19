import React, { createContext, useContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { buscarMembroPeloUser } from "../../services/membroService";
import { handleError } from "../../services/utils";

const ContextoGlobalProjeto = createContext()

export const useContextoGlobalProjeto = () => useContext(ContextoGlobalProjeto);

export const ProviderGlobalProjeto = ({ children }) => {

    const [dadosProjeto, setDadosProjeto] = useState(null)

    return (
        <ContextoGlobalProjeto.Provider
            value={{ 
                dadosProjeto, setDadosProjeto
            }}
        >
            { children }
        </ContextoGlobalProjeto.Provider>
    )
}