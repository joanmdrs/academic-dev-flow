import React, { createContext, useContext, useState } from "react";
const ContextoComentario = createContext();

export const useContextoComentario = () => useContext(ContextoComentario);

export const ProviderComentario = ({ children }) => {

    const [comentarios, setComentarios] = useState([])
    const [dadosComentario, setDadosComentario] = useState(null)

    return (
        <ContextoComentario.Provider
            value={{
                comentarios, setComentarios,
                dadosComentario, setDadosComentario
            }}
        >
            {children}
        </ContextoComentario.Provider>
    );
};
