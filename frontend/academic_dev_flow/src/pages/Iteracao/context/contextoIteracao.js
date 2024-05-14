import React, { createContext, useContext, useState } from "react";
import { listarIteracoesPorProjeto } from "../../../services/iteracaoService";
import { useContextoGlobalProjeto } from "../../../context/ContextoGlobalProjeto";
const ContextoIteracao = createContext();

export const useContextoIteracao = () => useContext(ContextoIteracao);

export const ProviderIteracao = ({ children }) => {

    const [iteracoes, setIteracoes] = useState([])
    const [dadosIteracao, setDadosIteracao] = useState(null)
    const [iteracoesSelecionadas, setIteracoesSelecionadas] = useState([])
    const {dadosProjeto} = useContextoGlobalProjeto()

    const handleGetIteracoes = async () => {
        const response = await listarIteracoesPorProjeto(dadosProjeto.id)

        if (!response.error && response.data.length > 0){
            const iteracoesOrdenadas = response.data.sort((a, b) => a.numero - b.numero);
            setIteracoes(iteracoesOrdenadas)
        }
    }
    

    return (
        <ContextoIteracao.Provider
            value={{
                iteracoes, setIteracoes,
                dadosIteracao, setDadosIteracao,
                iteracoesSelecionadas, setIteracoesSelecionadas,
                handleGetIteracoes
            }}
        >
            {children}
        </ContextoIteracao.Provider>
    );
};
