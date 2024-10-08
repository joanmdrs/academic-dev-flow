import React, { createContext, useContext, useState } from "react";
const MembroContexto = createContext();

export const useMembroContexto = () => useContext(MembroContexto);

export const MembroProvider = ({ children }) => {

    const [dadosMembro, setDadosMembro] = useState(null)
    const [dadosFuncao, setDadosFuncao] = useState(null) 
    const [dadosMembroProjeto, setDadosMembroProjeto] = useState(null)
    const [objsMembroProjeto, setObjsMembroProjeto] = useState([])
    const [objsMembroProjetoSelecionados, setObjsMembroProjetoSelecionados] = useState([])

    return (
        <MembroContexto.Provider
            value={{
                dadosMembro, setDadosMembro,
                dadosFuncao, setDadosFuncao,
                dadosMembroProjeto, setDadosMembroProjeto,
                objsMembroProjeto, setObjsMembroProjeto,
                objsMembroProjetoSelecionados, setObjsMembroProjetoSelecionados
            }}
        >
            {children}
        </MembroContexto.Provider>
    );
};
