import React, { createContext, useContext, useState }  from "react";

const ProjetoContext = createContext();

export const useFormContext = () => useContext(ProjetoContext);

export const ProjetoProvider = ({children}) => {

    const [hasProjeto, setHasProjeto] = useState({});

    return (
        <ProjetoContext.Provider 
            value={{ 
                hasProjeto,
                setHasProjeto 
            }}
        >
          {children}
        </ProjetoContext.Provider>
    )

}