import React, { createContext, useContext, useState } from "react";
const ContextoCommits = createContext();

export const useContextoCommits = () => useContext(ContextoCommits);

export const ProviderCommits = ({ children }) => {

    const [commits, setCommits] = useState([])
    const [assignee, setAssignee] = useState(null)
    const [loading, setLoading] = useState(false)

    return (
        <ContextoCommits.Provider
            value={{
                commits, setCommits,
                assignee, setAssignee,
                loading, setLoading
            }}
        >
            {children}
        </ContextoCommits.Provider>
    );
};
