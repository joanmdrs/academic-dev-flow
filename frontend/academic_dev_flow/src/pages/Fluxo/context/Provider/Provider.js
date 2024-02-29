import React, { createContext, useContext, useState }  from "react";

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FluxoProvider = ({children}) => {

    const [hasDadosFluxo, setHasDadosFluxo] = useState({});
    const [hasDadosEtapas, setHasDadosEtapas] = useState([]);
    const [acaoFormFluxo, setAcaoFormFluxo] = useState('criar')
    const [current, setCurrent] = useState("1");

    return (
        <FormContext.Provider 
            value={{ 
                hasDadosFluxo, 
                hasDadosEtapas,
                setHasDadosFluxo, 
                setHasDadosEtapas,
                acaoFormFluxo,
                setAcaoFormFluxo, 
                current, 
                setCurrent
            }}
        >
          {children}
        </FormContext.Provider>
    )

}