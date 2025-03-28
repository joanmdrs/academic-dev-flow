import React, { createContext, useContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { buscarMembroPeloUser } from "../../services/membroService";
import { useAuth } from "../../hooks/AuthProvider";

const ContextoGlobalUser = createContext();

export const useContextoGlobalUser = () => useContext(ContextoGlobalUser);

export const ProviderGlobalUser = ({ children }) => {

    const [usuario, setUsuario] = useState(null);
    const [grupo, setGrupo] = useState(null);
    const { logOut } = useAuth();
    const [token] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        const fetchData = async () => {
            if (token !== null){
                try {
                    const decodedToken = await decodeToken(token)
                    const response = await buscarMembroPeloUser(decodedToken.user_id)

                    if (!response.error){
                        setUsuario(response.data)
                        setGrupo(decodedToken.groups[0])
                    } else {
                        logOut()
                    }

                } catch (error) {
                    logOut()
                }
            }
        }
        fetchData()
    }, [token])

    return (
        <>
            <ContextoGlobalUser.Provider
                value={{
                    usuario, setUsuario,
                    grupo, setGrupo
                }}
            >
                {children}
            </ContextoGlobalUser.Provider>
        </>
        
    )
}