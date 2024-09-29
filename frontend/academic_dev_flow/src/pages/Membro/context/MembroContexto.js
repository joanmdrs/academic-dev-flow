import React, { createContext, useContext, useState } from "react";
const MembroContexto = createContext();

export const useMembroContexto = () => useContext(MembroContexto);

export const MembroProvider = ({ children }) => {

    const [dadosMembro, setDadosMembro] = useState(null)
    const [dadosFuncao, setDadosFuncao] = useState(null) 

    return (
        <MembroContexto.Provider
            value={{
                dadosMembro, setDadosMembro,
                dadosFuncao, setDadosFuncao,
            }}
        >
            {children}
        </MembroContexto.Provider>
    );
};
