import React, { createContext, useContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { handleError } from "../services/utils";
import { buscarMembroPeloUser } from "../services/membroService";

const ContextoGlobalProjeto = createContext();

export const useContextoGlobalProjeto = () => useContext(ContextoGlobalProjeto);

export const ProviderGlobalProjeto = ({ children }) => {
  
  const [token] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
      const fetchData = async () => {
          if (token !== null){
              try {
                  const decodedToken = await decodeToken(token);

                  if (decodedToken.groups[0] !== 'Administradores'){
                    const response = await buscarMembroPeloUser(decodedToken.user_id);

                    if (!response.error) {
                      setAutor(response.data)

                    }
                  }

                  setGrupo(decodedToken.groups[0])
                 
        
                  
              } catch (error) {
                  return handleError(error, "Falha ao decodificar o token")
              }
          }
          
      };
      fetchData();
      console.log(grupo)
      console.log(autor)

      
  }, [token]);

  const [autor, setAutor] = useState(null);
  const [grupo, setGrupo] = useState(null);
  const [dadosProjeto, setDadosProjeto] = useState(null);

  return (
    <ContextoGlobalProjeto.Provider
      value={{
        autor, setAutor,
        grupo, setGrupo, 
        dadosProjeto, setDadosProjeto,
      }}
    >
      {children}
    </ContextoGlobalProjeto.Provider>
  );
};
