import React, { createContext, useContext, useState } from "react";
const ContextoArtefato = createContext();

export const useContextoArtefato = () => useContext(ContextoArtefato);

export const ProviderArtefato = ({ children }) => {

    const [step, setStep] = useState('0')
    const [artefatos, setArtefatos] = useState([])
    const [dadosArtefato, setDadosArtefato] = useState(null)
    const [dadosProjeto, setDadosProjeto] = useState(null)

    return (
        <ContextoArtefato.Provider
            value={{
                step, setStep,
                artefatos, setArtefatos,
                dadosArtefato, setDadosArtefato,
                dadosProjeto, setDadosProjeto
            }}
        >
            {children}
        </ContextoArtefato.Provider>
    );
};
