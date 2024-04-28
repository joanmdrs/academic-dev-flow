import React, { createContext, useContext, useState } from "react";
const ContextoIteracao = createContext();

export const useContextoIteracao = () => useContext(ContextoIteracao);

export const ProviderIteracao = ({ children }) => {

    const [iteracoes, setIteracoes] = useState([])
    const [dadosIteracao, setDadosIteracao] = useState(null)
    const [dadosProjeto, setDadosProjeto] = useState(null)

    return (
        <ContextoIteracao.Provider
            value={{
                iteracoes, setIteracoes,
                dadosIteracao, setDadosIteracao,
                dadosProjeto, setDadosProjeto
            }}
        >
            {children}
        </ContextoIteracao.Provider>
    );
};
