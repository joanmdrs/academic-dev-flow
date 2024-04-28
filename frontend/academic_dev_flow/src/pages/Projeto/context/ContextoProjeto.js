import React, { createContext, useContext, useState }  from "react";

const ContextoProjeto = createContext();

export const useContextoProjeto = () => useContext(ContextoProjeto);

export const ProviderProjeto = ({ children }) => {

    const [hasProjeto, setHasProjeto] = useState(null);

    return (
        <ContextoProjeto.Provider 
            value={{ 
                hasProjeto,
                setHasProjeto 
            }}
        >
          {children}
        </ContextoProjeto.Provider>
    )

}