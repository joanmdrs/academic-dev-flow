import React, { createContext, useContext, useState } from "react";
const FuncaoMembroContexto = createContext();

export const useFuncaoMembroContexto = () => useContext(FuncaoMembroContexto);

export const FuncaoMembroProvider = ({ children }) => {

    const [dadosFuncaoMembro, setDadosFuncaoMembro] = useState(null)
    const [itemsFuncaoMembro, setItemsFuncaoMembro] = useState([])
    const [dadosCategoriaFuncaoMembro, setDadosCategoriaFuncaoMembro] = useState(null)
    const [itemsCategoriaFuncaoMembro, setItemsCategoriaFuncaoMembro] = useState([])

    return (
        <FuncaoMembroContexto.Provider
            value={{
                dadosFuncaoMembro, setDadosFuncaoMembro,
                itemsFuncaoMembro, setItemsFuncaoMembro,
                dadosCategoriaFuncaoMembro, setDadosCategoriaFuncaoMembro,
                itemsCategoriaFuncaoMembro, setItemsCategoriaFuncaoMembro
            }}
        >
            {children}
        </FuncaoMembroContexto.Provider>
    );
};
