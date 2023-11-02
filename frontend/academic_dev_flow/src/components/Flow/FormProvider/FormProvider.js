import React, { createContext, useContext, useState }  from "react";

const FormContext = createContext();
export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({children}) => {

    const [flowDetails, setFlowDetails] = useState({
        nome: "",
        descricao: "",
    });

    const [etapaDetails, setEtapaDetails] = useState([]);

    

    return (
        <FormContext.Provider 
            value={{ 
                flowDetails, 
                etapaDetails, 
                setFlowDetails, 
                setEtapaDetails
            }}
        >
          {children}
        </FormContext.Provider>
    )

}