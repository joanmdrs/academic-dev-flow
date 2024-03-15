// src/context/ProjetoContext.js
import React, { createContext, useContext, useState } from "react";

const ProjetoContext = createContext();

export const useProjetoContext = () => useContext(ProjetoContext);

export const ProjetoProvider = ({ children }) => {
  const [dadosProjeto, setDadosProjeto] = useState(null);
  const [dadosIteracao, setDadosIteracao] = useState(null);
  const [dadosTarefa, setDadosTarefa] = useState(null);
  const [tarefasSelecionadas, setTarefasSelecionadas] = useState([]);
  const [iteracoesSelecionadas, setIteracoesSelecionadas] = useState([])

  return (
    <ProjetoContext.Provider
      value={{
        dadosProjeto, setDadosProjeto,
        dadosIteracao, setDadosIteracao,
        dadosTarefa, setDadosTarefa,
        tarefasSelecionadas, setTarefasSelecionadas,
        iteracoesSelecionadas, setIteracoesSelecionadas
      }}
    >
      {children}
    </ProjetoContext.Provider>
  );
};
