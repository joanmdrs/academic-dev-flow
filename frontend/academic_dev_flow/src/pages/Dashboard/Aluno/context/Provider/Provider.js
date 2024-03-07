import React, { createContext, useContext, useState }  from "react";

const ContextoProjeto = createContext();

export const useFormContext = () => useContext(ContextoProjeto);

export const ProviderProjeto = ({children}) => {

    const [dadosProjeto, setDadosProjeto] = useState(null);
    const [dadosIteracao, setDadosIteracao] = useState(null)
    const [dadosTarefa, setDadosTarefa] = useState(null)
    const [reload, setReload] = useState(true)

    return (
        <ContextoProjeto.Provider 
            value={{ 
                dadosProjeto,
                setDadosProjeto,
                dadosIteracao,
                setDadosIteracao,
                dadosTarefa,
                setDadosTarefa,
                reload, 
                setReload
            }}
        >
          {children}
        </ContextoProjeto.Provider>
    )

}