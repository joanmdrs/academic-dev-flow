import React, { createContext, useContext, useState } from "react";
const ContextoIteracao = createContext();

export const useContextoIteracao = () => useContext(ContextoIteracao);

export const ProviderIteracao = ({ children }) => {

    const [iteracoes, setIteracoes] = useState([])
    const [dadosIteracao, setDadosIteracao] = useState(null)
    const [actionForm, setActionForm] = useState('create')
    const [iteracoesSelecionadas, setIteracoesSelecionadas] = useState([])

    return (
        <ContextoIteracao.Provider
            value={{
                iteracoes, setIteracoes,
                dadosIteracao, setDadosIteracao,
                iteracoesSelecionadas, setIteracoesSelecionadas,
                actionForm, setActionForm
            }}
        >
            {children}
        </ContextoIteracao.Provider>
    );
};
