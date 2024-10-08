import React, { createContext, useContext, useState } from "react";
const RegisterContexto = createContext();

export const useRegisterContexto = () => useContext(RegisterContexto);

export const RegisterProvider = ({ children }) => {

    const [grupoUsuario, setGrupoUsuario] = useState(null)
    const [infoGithub, setInfoGithub] = useState(null)
    const [step, setStep] = useState('1')

    return (
        <RegisterContexto.Provider
            value={{
                grupoUsuario, setGrupoUsuario,
                infoGithub, setInfoGithub,
                step, setStep
            }}
        >
            {children}
        </RegisterContexto.Provider>
    );
};
