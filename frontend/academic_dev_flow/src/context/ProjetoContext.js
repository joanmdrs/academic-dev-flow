import React, { createContext, useContext, useEffect, useState } from "react";
import { buscarMembroPeloUser } from "../services/membroService";
import { decodeToken } from "react-jwt";
import { handleError } from "../services/utils";

const ProjetoContext = createContext();

export const useProjetoContext = () => useContext(ProjetoContext);

export const ProjetoProvider = ({ children }) => {
  
  const [token] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
      const fetchData = async () => {
          if (token !== null){
              try {
                  const decodedToken = await decodeToken(token);
                  const response = await buscarMembroPeloUser(decodedToken.user_id);

                  if (!response.error) {
                    setAutor(response.data)
                    setUserGroup(decodedToken.groups[0])
                  }
        
                  
              } catch (error) {
                  return handleError(error, "Falha ao decodificar o token")
              }
          }
          
      };
      fetchData();
      
  }, [token]);

  const [autor, setAutor] = useState(null);
  const [userGroup, setUserGroup] = useState(null)
  const [dadosProjeto, setDadosProjeto] = useState(null);
  const [dadosIteracao, setDadosIteracao] = useState(null);
  const [dadosTarefa, setDadosTarefa] = useState(null);
  const [dadosDocumento, setDadosDocumento] = useState(null);
  const [dadosComentario, setDadosComentario] = useState(null);
  const [dadosPontuacao, setDadosPontuacao] = useState(null)
  const [tarefasSelecionadas, setTarefasSelecionadas] = useState([]);
  const [iteracoesSelecionadas, setIteracoesSelecionadas] = useState([]);
  const [documentosSelecionados, setDocumentosSelecionados] = useState([]);

  return (
    <ProjetoContext.Provider
      value={{
        autor, setAutor,
        userGroup, setUserGroup,
        dadosProjeto, setDadosProjeto,
        dadosIteracao, setDadosIteracao,
        dadosTarefa, setDadosTarefa,
        dadosDocumento, setDadosDocumento,
        dadosComentario, setDadosComentario,
        dadosPontuacao, setDadosPontuacao,
        tarefasSelecionadas, setTarefasSelecionadas,
        iteracoesSelecionadas, setIteracoesSelecionadas,
        documentosSelecionados, setDocumentosSelecionados
      }}
    >
      {children}
    </ProjetoContext.Provider>
  );
};
