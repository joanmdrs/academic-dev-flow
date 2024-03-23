import React, { createContext, useContext, useEffect, useState } from "react";
import { buscarMembroPeloUser } from "../services/membroService";
import { decodeToken } from "react-jwt";

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
                  const idAutor = response.data.id_membro_projeto;
                  setAutor(idAutor);
              } catch (error) {
                  console.error("Erro ao buscar membro pelo usuário:", error);
              }
          }
          
      };
      fetchData();
      
  }, [token]);

  const [autor, setAutor] = useState(null);
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
