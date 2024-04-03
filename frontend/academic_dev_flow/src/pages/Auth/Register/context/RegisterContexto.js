import React, { createContext, useContext, useState } from "react";
const RegisterContexto = createContext();

export const useRegisterContexto = () => useContext(RegisterContexto);

export const RegisterProvider = ({ children }) => {

    const [grupoUsuario, setGrupoUsuario] = useState(null)

    return (
        <RegisterContexto.Provider
            value={{
                grupoUsuario, setGrupoUsuario
            }}
        >
            {children}
        </RegisterContexto.Provider>
    );
};
