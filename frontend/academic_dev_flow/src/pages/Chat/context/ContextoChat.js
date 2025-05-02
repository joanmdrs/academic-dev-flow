import React, { createContext, useContext, useState } from "react";
const ContextoChat = createContext();

export const useContextoChat = () => useContext(ContextoChat);

export const ProviderChat = ({ children }) => {

    const [dadosChat, setDadosChat] = useState(null)
    const [chatSelecionado, setChatSelecionado] = useState(null)
    const [mensagemToUpdate, setMensagemToUpdate] = useState(null)

    return (
        <ContextoChat.Provider
            value={{
                dadosChat, setDadosChat,
                chatSelecionado, setChatSelecionado,
                mensagemToUpdate, setMensagemToUpdate
            }}
        >
            {children}
        </ContextoChat.Provider>
    );
};
