import React, { createContext, useContext, useState } from "react";
const ContextoChat = createContext();

export const useContextoChat = () => useContext(ContextoChat);

export const ProviderChat = ({ children }) => {

    const [dadosChat, setDadosChat] = useState(null)
    return (
        <ContextoChat.Provider
            value={{
                dadosChat, setDadosChat
            }}
        >
            {children}
        </ContextoChat.Provider>
    );
};
