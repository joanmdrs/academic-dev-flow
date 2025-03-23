import React, { createContext, useContext, useEffect, useState } from "react";
const MembroContexto = createContext();

export const useMembroContexto = () => useContext(MembroContexto);

export const MembroProvider = ({ children }) => {

    const [dadosMembro, setDadosMembro] = useState(null)
    const [membros, setMembros] = useState([])
    const [membrosSelecionados, setMembrosSelecionados] = useState([])
    const [dadosFuncaoMembro, setDadosFuncaoMembro] = useState(null)
    const [dadosMembroProjeto, setDadosMembroProjeto] = useState(null)
    const [objsMembroProjeto, setObjsMembroProjeto] = useState([])
    const [objsMembroProjetoSelecionados, setObjsMembroProjetoSelecionados] = useState([])

    return (
        <MembroContexto.Provider
            value={{
                dadosMembro, setDadosMembro,
                membros, setMembros,
                membrosSelecionados, setMembrosSelecionados,
                dadosFuncaoMembro, setDadosFuncaoMembro,
                dadosMembroProjeto, setDadosMembroProjeto,
                objsMembroProjeto, setObjsMembroProjeto,
                objsMembroProjetoSelecionados, setObjsMembroProjetoSelecionados
            }}
        >
            {children}
        </MembroContexto.Provider>
    );
};
