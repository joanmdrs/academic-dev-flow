import React, { useState, useEffect } from "react";
import "./TabEquipe.css";
import BotaoAdicionar from "../../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import { Table } from "antd";
import { buscarMembroPeloId, buscarMembroPorGrupoENome } from "../../../../../services/membroService";
import { NotificationManager } from "react-notifications";
import { criarMembroProjeto, excluirMembroProjetoMany, excluirMembroProjetoOne, listarMembrosPorProjeto } from "../../../../../services/membroProjetoService";
import { useContextoProjeto } from "../../../context/ContextoProjeto";
import ModalSelecionarObjetos from "../../../../../components/Modals/ModalSelecionarObjetos/ModalSelecionarObjetos";

const TabEquipe = () => {

  const COLUNAS_LISTA = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Função",
      dataIndex: "funcao",
      key: "funcao",
    },
  ];

  const COLUNAS_MODAL = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Grupo",
      dataIndex: "grupo",
      key: "grupo",
    },
  ];

  const { hasProjeto } = useContextoProjeto();
  const [isBotaoAdicionarVisivel, setIsBotaoAdicionarVisivel] = useState(true) 
  const [isBotaoExcluirVisivel, setIsBotaoExcluirVisivel] = useState(true);
  const [isModalVisivel, setIsModalVisivel] = useState(false);
  const [grupoMembro, setGrupoMembro] = useState(null)
  const [alunos, setAlunos] = useState([]);
  const [professores, setProfessores] = useState([])
  const [alunosVisiveis, setAlunosVisiveis] = useState(false);
  const [professoresVisiveis, setProfessoresVisiveis] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (hasProjeto !== null) {
        setIsBotaoAdicionarVisivel(false)
        setIsBotaoExcluirVisivel(false)
        await handleListarMembrosPorProjeto();
      }
    };

    fetchData();
  
    
  }, [hasProjeto]);

  const [membrosExcluir, setMembrosExcluir] = useState([])

  const handleExibirModal = () => setIsModalVisivel(true);
  const handleFecharModal = () => setIsModalVisivel(false);

  const handleBotaoAdicionarAluno = () => {
    handleExibirModal()
    setGrupoMembro('Discentes')
  }

  const handleBotaoAdicionarProfessor = () => {
    handleExibirModal()
    setGrupoMembro('Docentes')
  }

  const handleBuscarMembro = async (parametro) => {
    try {
      const resposta = await buscarMembroPorGrupoENome(parametro, grupoMembro);
      if (resposta.status !== 200) {
        NotificationManager.error("Ocorreu um problema ao buscar os dados, contate o suporte!");
      } else {
        return resposta;
      }
    } catch (error) {
      NotificationManager.error("Ocorreu um problema ao buscar os dados, contate o suporte!");
    }
  };

  const handleProcessarMembros = async (membrosVinculados) => {
    const promises = membrosVinculados.map(async (membroProjeto) => {
      try {
        const respostaMembro = await buscarMembroPeloId(membroProjeto.membro);
        const grupo = respostaMembro.data.grupo;
  
        if (grupo === 'Discentes' || grupo === 'Docentes') {
          return {
            id: membroProjeto.id,
            projeto: hasProjeto.id,
            membro: respostaMembro.data.id,
            nome: respostaMembro.data.nome,
            funcao: membroProjeto.funcao,
            grupo: grupo,
          };
        } else {
          return null;
        }
      } catch (error) {
        console.error("Erro ao processar membros:", error);
        return null;
      }
    });
  
    const resultados = (await Promise.all(promises)).filter(Boolean);
  
    const alunos = resultados.filter((membro) => membro.grupo === 'Discentes');
    const professores = resultados.filter((membro) => membro.grupo === 'Docentes');
  
    return { alunos, professores };
  };
  
  const handleListarMembrosPorProjeto = async () => {
    try {
      const resposta = await listarMembrosPorProjeto(hasProjeto.id);

      if (resposta.status === 200) {
        const membrosVinculados = resposta.data;

        if (membrosVinculados.length === 0) {
          setAlunos([]);
          setProfessores([])
        } else {
          const { alunos, professores } = await handleProcessarMembros(membrosVinculados);
          setAlunos(alunos);
          setProfessores(professores);
        }
      } else {
        NotificationManager.error("Falha ao buscar os dados, contate o suporte!")
      }
    } catch (error) {
      console.log(error)
      NotificationManager.error("Ocorreu um problema ao buscar os dados, contate o suporte!");
    }
  };


  const handleSelecionarMembros = async (dados) => {
    try {
      const dadosEnviar = dados.map((item) => {
        return {
          projeto: hasProjeto.id,
          membro: item.id,
        };
      });
      const resposta = await criarMembroProjeto(dadosEnviar);

      if (resposta.status === 200) {
        NotificationManager.success("Membro(s) vinculado(s) ao projeto com sucesso !");
        await handleListarMembrosPorProjeto();
      } else {
        NotificationManager.error("Falha ao vincular o(s) membro(s) ao projeto, contate o suporte!");
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("Ocorreu um problema durante a operação, contate o suporte!");
    }
  };

  const rowSelection = {
    onChange: (selectedRowsKeys, selectedRows) => {
      setMembrosExcluir(selectedRows)
    },
  };

  const handleExcluirMembros = async (grupo) => {
    try {
      const resposta = membrosExcluir.length === 1
        ? await excluirMembroProjetoOne(membrosExcluir[0].id)
        : await excluirMembroProjetoMany(hasProjeto.id, membrosExcluir, grupo);
  
      if (resposta.status === 204) {
        await handleListarMembrosPorProjeto()
        NotificationManager.success(`Membro${membrosExcluir.length > 1 ? 's' : ''} desvinculado${membrosExcluir.length > 1 ? 's' : ''} do projeto com sucesso!`);
      } else {
        NotificationManager.error(`Falha ao desvincular o${membrosExcluir.length > 1 ? 's' : ''} membro${membrosExcluir.length > 1 ? 's' : ''} do projeto, contate o suporte!`);
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("Ocorreu um problema durante a operação, contate o suporte!");
    }
  };

  const renderSection = (title, data, isVisible, onToggleVisibility, onAddButtonClick, onDeleteButtonClick, grupo) => (
    <div>
      <div
        style={{
          cursor: "pointer",
          padding: "20px",
          border: "1px solid #d9d9d9",
        }}
        onClick={() => onToggleVisibility(!isVisible)}
      >
        <h4> {title} </h4>
      </div>

      {isVisible && (
        <div>
          <div className="grouped-buttons" 
            style={{ 
              width: "100%", 
              display: "flex", 
              justifyContent: "flex-end", 
              padding:'20px'
            }}>
            <BotaoAdicionar status={isBotaoAdicionarVisivel} funcao={onAddButtonClick} />
            <BotaoExcluir status={isBotaoExcluirVisivel} funcao={() => onDeleteButtonClick(grupo)} />
          </div>

          { data.length > 0 && <Table
            className="global-table"
            columns={COLUNAS_LISTA}
            dataSource={data}
            rowKey="id"
            rowSelection={rowSelection}
          />

          }
          
        </div>
      )}
    </div>
  );

  return (
    <div>
      {isModalVisivel && (
        <ModalSelecionarObjetos
          title="BUSCAR MEMBRO"
          onCancel={handleFecharModal}
          colunas={COLUNAS_MODAL}
          status={isModalVisivel}
          onOk={handleBuscarMembro}
          onSelect={handleSelecionarMembros}
        />
      )}

      {renderSection(
        'VINCULAR ALUNO(S)',
        alunos,
        alunosVisiveis,
        setAlunosVisiveis,
        handleBotaoAdicionarAluno,
        handleExcluirMembros,
        'Discentes'
      )}

      {renderSection(
        'VINCULAR PROFESSOR(ES)',
        professores,
        professoresVisiveis,
        setProfessoresVisiveis,
        handleBotaoAdicionarProfessor,
        handleExcluirMembros,
        'Docentes'
      )}
    </div>
  );
};

export default TabEquipe;


