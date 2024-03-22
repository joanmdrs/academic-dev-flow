// src/context/ProjetoContext.js
import React, { createContext, useContext, useState } from "react";

const ProjetoContext = createContext();

export const useProjetoContext = () => useContext(ProjetoContext);

export const ProjetoProvider = ({ children }) => {
  const [dadosProjeto, setDadosProjeto] = useState(null);
  const [dadosIteracao, setDadosIteracao] = useState(null);
  const [dadosTarefa, setDadosTarefa] = useState(null);
  const [dadosDocumento, setDadosDocumento] = useState(null);
  const [dadosComentario, setDadosComentario] = useState(null);
  const [autor, setAutor] = useState(null);
  const [tarefasSelecionadas, setTarefasSelecionadas] = useState([]);
  const [iteracoesSelecionadas, setIteracoesSelecionadas] = useState([])
  const [documentosSelecionados, setDocumentosSelecionados] = useState([])

  return (
    <ProjetoContext.Provider
      value={{
        dadosProjeto, setDadosProjeto,
        dadosIteracao, setDadosIteracao,
        dadosTarefa, setDadosTarefa,
        dadosDocumento, setDadosDocumento,
        dadosComentario, setDadosComentario,
        autor, setAutor,
        tarefasSelecionadas, setTarefasSelecionadas,
        iteracoesSelecionadas, setIteracoesSelecionadas,
        documentosSelecionados, setDocumentosSelecionados
      }}
    >
      {children}
    </ProjetoContext.Provider>
  );
};
