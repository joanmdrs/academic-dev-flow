import { useForm } from "antd/es/form/Form";
import React, { createContext, useContext, useState }  from "react";

const ContextoProjeto = createContext();

export const useContextoProjeto = () => useContext(ContextoProjeto);

export const ProviderProjeto = ({ children }) => {

    const [dadosProjeto, setDadosProjeto] = useState(null);
    const [membros, setMembros] = useState([]);
    const [membrosSelecionados, setMembrosSelecionados] = useState([]);

    return (
        <ContextoProjeto.Provider 
            value={{ 
                dadosProjeto, 
                setDadosProjeto,
                membros,
                setMembros,
                membrosSelecionados, 
                setMembrosSelecionados,
            }}
        >
          {children}
        </ContextoProjeto.Provider>
    )

}