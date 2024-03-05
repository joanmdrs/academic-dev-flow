import React, { createContext, useContext, useState }  from "react";

const IteracaoContext = createContext();

export const useFormContext = () => useContext(IteracaoContext);

export const IteracaoProvider = ({children}) => {

    const [hasProjectData, setHasProjectData] = useState(null);

    return (
        <IteracaoContext.Provider 
            value={{ 
                hasProjectData,
                setHasProjectData 
            }}
        >
          {children}
        </IteracaoContext.Provider>
    )

}