import React, { createContext, useContext, useState }  from "react";

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({children}) => {

    const [hasDadosFluxo, setHasDadosFluxo] = useState({
        nome: "",
        descricao: "",
    });

    const [hasDadosEtapas, setHasDadosEtapas] = useState([]);

    return (
        <FormContext.Provider 
            value={{ 
                hasDadosFluxo, 
                hasDadosEtapas,
                setHasDadosFluxo, 
                setHasDadosEtapas
            }}
        >
          {children}
        </FormContext.Provider>
    )

}