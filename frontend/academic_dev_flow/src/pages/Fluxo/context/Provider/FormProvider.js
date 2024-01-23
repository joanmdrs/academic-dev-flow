import React, { createContext, useContext, useState }  from "react";

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({children}) => {

    const [hasDadosFluxo, setHasDadosFluxo] = useState({});
    const [hasDadosEtapas, setHasDadosEtapas] = useState([]);
    const [acaoFormFluxo, setAcaoFormFluxo] = useState('criar')
    const [acaoFormEtapa, setAcaoFormEtapa] = useState('criar')

    return (
        <FormContext.Provider 
            value={{ 
                hasDadosFluxo, 
                hasDadosEtapas,
                setHasDadosFluxo, 
                setHasDadosEtapas,
                acaoFormFluxo, 
                acaoFormEtapa, 
                setAcaoFormFluxo,
                setAcaoFormEtapa
            }}
        >
          {children}
        </FormContext.Provider>
    )

}