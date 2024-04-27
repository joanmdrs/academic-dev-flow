import React, { createContext, useContext, useState } from "react";
const ContextoIteracao = createContext();

export const useContextoIteracao = () => useContext(ContextoIteracao);

export const ProviderIteracao = ({ children }) => {

    const [iteracoes, setIteracoes] = useState([])
    const [dadosProjeto, setDadosProjeto] = useState(null)

    return (
        <ContextoIteracao.Provider
            value={{
                iteracoes, setIteracoes,
                dadosProjeto, setDadosProjeto
            }}
        >
            {children}
        </ContextoIteracao.Provider>
    );
};
