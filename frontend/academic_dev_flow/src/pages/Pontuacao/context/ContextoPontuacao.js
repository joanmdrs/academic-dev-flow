import React, { createContext, useContext, useState } from "react";
const ContextoPontuacao = createContext();

export const useContextoPontuacao = () => useContext(ContextoPontuacao);

export const ProviderPontuacao = ({ children }) => {

    const [dadosPontuacao, setDadosPontuacao] = useState(null)

    return (
        <ContextoPontuacao.Provider
            value={{
                dadosPontuacao, setDadosPontuacao
            }}
        >
            {children}
        </ContextoPontuacao.Provider>
    );
};
