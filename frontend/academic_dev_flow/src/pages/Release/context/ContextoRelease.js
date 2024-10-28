import React, { createContext, useContext, useState }  from "react";

const ContextoRelease = createContext();

export const useContextoRelease = () => useContext(ContextoRelease);

export const ProviderRelease = ({ children }) => {

    const [releaseData, setReleaseData] = useState(null)
    const [releases, setReleases] = useState([])
    const [actionForm, setActionForm] = useState('create')

    return (
        <ContextoRelease.Provider 
            value={{ 
                releaseData,
                setReleaseData,
                releases,
                setReleases,
                actionForm, 
                setActionForm
            }}
        >
          {children}
        </ContextoRelease.Provider>
    )

}