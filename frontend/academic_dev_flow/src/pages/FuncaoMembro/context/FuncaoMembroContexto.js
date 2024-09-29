import React, { createContext, useContext, useState } from "react";
const FuncaoMembroContexto = createContext();

export const useFuncaoMembroContexto = () => useContext(FuncaoMembroContexto);

export const FuncaoMembroProvider = ({ children }) => {

    const [dadosFuncaoMembro, setDadosFuncaoMembro] = useState(null)
    const [dadosCategoriaFuncaoMembro, setDadosCategoriaFuncaoMembro] = useState(null)
    const [itemsCategoriaFuncaoMembro, setItemsCategoriaFuncaoMembro] = useState([])


    return (
        <FuncaoMembroContexto.Provider
            value={{
                dadosFuncaoMembro, setDadosFuncaoMembro,
                dadosCategoriaFuncaoMembro, setDadosCategoriaFuncaoMembro,
                itemsCategoriaFuncaoMembro, setItemsCategoriaFuncaoMembro
            }}
        >
            {children}
        </FuncaoMembroContexto.Provider>
    );
};
