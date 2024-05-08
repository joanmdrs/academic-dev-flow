import React, { createContext, useContext, useState } from "react";
const ContextoComentario = createContext();

export const useContextoComentario = () => useContext(ContextoComentario);

export const ProviderComentario = ({ children }) => {

    const [comentarios, setComentarios] = useState([])
    const [comentarioEditado, setComentarioEditado] = useState(null)
    const [dadosComentario, setDadosComentario] = useState(null)
    const [editorVisivel, setEditorVisivel] = useState(false);
    const [comentarioPai, setComentarioPai] = useState(null)

    return (
        <ContextoComentario.Provider
            value={{
                comentarios, setComentarios,
                dadosComentario, setDadosComentario,
                comentarioEditado, setComentarioEditado,
                editorVisivel, setEditorVisivel,
                comentarioPai, setComentarioPai
            }}
        >
            {children}
        </ContextoComentario.Provider>
    );
};
