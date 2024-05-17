import React, { createContext, useContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { buscarMembroPeloUser } from "../../services/membroService";
import { handleError } from "../../services/utils";

const ContextoGlobalUser = createContext();

export const useContextoGlobalUser = () => useContext(ContextoGlobalUser);

export const ProviderGlobalUser = ({ children }) => {
  
    const [token] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        const fetchData = async () => {
            if (token !== null){
                try {
                    const decodedToken = await decodeToken(token);
                    const response = await buscarMembroPeloUser(decodedToken.user_id);
                    console.log(response.data)

                    if (!response.error) {
                        setUsuario(response.data)
                        setGrupo(decodedToken.groups[0])
                    }
            
                    
                } catch (error) {
                    return handleError(error, "Falha ao decodificar o token")
                }
            }
            
        };
        fetchData();
        console.log(usuario)

        
    }, [token]);

  const [usuario, setUsuario] = useState(null);
  const [grupo, setGrupo] = useState(null);

  return (
    <ContextoGlobalUser.Provider
      value={{
        usuario, setUsuario,
        grupo, setGrupo, 
      }}
    >
      {children}
    </ContextoGlobalUser.Provider>
  );
};
