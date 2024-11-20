import React, { createContext, useContext, useState }  from "react";

const ContextoVisualizarProjeto = createContext();

export const useContextoVisualizarProjeto = () => useContext(ContextoVisualizarProjeto);

export const ProviderVisualizarProjeto = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false)

    return (
        <ContextoVisualizarProjeto.Provider 
            value={{ 
                isLoading,
                setIsLoading
            }}
        >
          {children}
        </ContextoVisualizarProjeto.Provider>
    )

}