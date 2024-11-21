import React, { createContext, useContext, useState } from "react";
const ContextoTarefa = createContext();

export const useContextoTarefa = () => useContext(ContextoTarefa);

export const ProviderTarefa = ({ children }) => {

    const [step, setStep] = useState('0');
    const [tarefas, setTarefas] = useState([]);
    const [dadosTarefa, setDadosTarefa] = useState(null);
    const [tarefasSelecionadas, setTarefasSelecionadas] = useState([]);
    const [acaoForm, setAcaoForm] = useState('criar')


    return (
        <ContextoTarefa.Provider
            value={{
                acaoForm, setAcaoForm,
                step, setStep,
                tarefas, setTarefas,
                dadosTarefa, setDadosTarefa,
                tarefasSelecionadas, setTarefasSelecionadas,
            }}
        >
            {children}
        </ContextoTarefa.Provider>
    );
};
