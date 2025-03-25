import React, { createContext, useContext, useState } from "react";
const ContextoFeedback = createContext();

export const useContextoFeedback = () => useContext(ContextoFeedback);

export const ProviderFeedback = ({ children }) => {

    const [dadosFeedback, setDadosFeedback] = useState(null)
    const [feedbacksSelecionados, setFeedbacksSelecionados] = useState([])

    return (
        <ContextoFeedback.Provider
            value={{
                dadosFeedback, setDadosFeedback,
                feedbacksSelecionados, setFeedbacksSelecionados
            }}
        >
            {children}
        </ContextoFeedback.Provider>
    );
};
