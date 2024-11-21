import React, { createContext, useContext, useState } from "react";
import { listarArtefatosPorProjeto } from "../../../services/artefatoService";
const ContextoArtefato = createContext();

export const useContextoArtefato = () => useContext(ContextoArtefato);

export const ProviderArtefato = ({ children }) => {

    const [step, setStep] = useState('0')
    const [artefatos, setArtefatos] = useState([])
    const [dadosArtefato, setDadosArtefato] = useState(null)
    const [artefatosSelecionados, setArtefatosSelecionados] = useState([])
    const [actionForm, setActionForm] = useState('create')

    const handleListarArtefatos = async (idProjeto) => {
        const response = await listarArtefatosPorProjeto(idProjeto);
    
        if (!response.error) { 
            setArtefatos(response.data)
        }
    }

    return (
        <ContextoArtefato.Provider
            value={{
                step, setStep,
                artefatos, setArtefatos,
                dadosArtefato, setDadosArtefato,
                artefatosSelecionados, setArtefatosSelecionados,
                handleListarArtefatos,
                actionForm, setActionForm
            }}
        >
            {children}
        </ContextoArtefato.Provider>
    );
};
