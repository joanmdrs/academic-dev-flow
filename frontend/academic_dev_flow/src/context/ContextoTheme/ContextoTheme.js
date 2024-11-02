import React, { createContext, useContext, useState } from "react";

const ContextoGlobalTheme = createContext()

export const useContextoGlobalTheme = () => useContext(ContextoGlobalTheme);

export const ProviderGlobalTheme = ({ children }) => {

    const [theme, setTheme] = useState('light')
   
    return (
        <ContextoGlobalTheme.Provider
            value={{
                theme, setTheme
            }}
        >
            { children }
        </ContextoGlobalTheme.Provider>
    )
}