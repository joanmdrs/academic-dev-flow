import React, { useState, useEffect } from "react";
import "./TabEquipe.css";
import ListaDados from "../../../../../components/Listas/ListaDados/ListaDados";
import BotaoAdicionar from "../../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import { Table } from "antd";
import ModalSelecionarMembros from "../../../components/ModalSelecionarMembros/ModalSelecionarMembros";
import { buscarMembroPeloId, buscarMembroPorGrupoENome } from "../../../../../services/membro_service";
import { NotificationManager } from "react-notifications";
import { criarMembroProjeto, listarMembrosPorProjeto } from "../../../../../services/membro_projeto_service";
import { useFormContext } from "../../../context/Provider/Provider";

const TabEquipe = () => {
  const { hasProjeto } = useFormContext();
  const [isBotaoAdicionarVisivel, setIsBotaoAdicionarVisivel] = useState(false) 
  const [isBotaoExcluirVisivel, setIsBotaoExcluirVisivel] = useState(true);
  const [isModalVisivel, setIsModalVisivel] = useState(false);
  const [grupoMembro, setGrupoMembro] = useState(null)
  const [alunos, setAlunos] = useState([]);
  const [professores, setProfessores] = useState([])
  const [alunosVisiveis, setAlunosVisiveis] = useState(false);
  const [professoresVisiveis, setProfessoresVisiveis] = useState(false);

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

  const handleExibirModal = () => setIsModalVisivel(true);
  const handleFecharModal = () => setIsModalVisivel(false);

  const handleBotaoAdicionarAluno = () => {
    handleExibirModal()
    setGrupoMembro('aluno')
  }

  const handleBotaoAdicionarProfessor = () => {
    handleExibirModal()
    setGrupoMembro('professor')
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
  
        if (grupo === 'aluno' || grupo === 'professor') {
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
  
    const alunos = resultados.filter((membro) => membro.grupo === 'aluno');
    const professores = resultados.filter((membro) => membro.grupo === 'professor');
  
    return { alunos, professores };
  };
  
  const handleListarMembrosPorProjeto = async (parametro) => {
    try {
      const resposta = await listarMembrosPorProjeto(parametro);

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

  useEffect(() => {
    if (hasProjeto) {
      handleListarMembrosPorProjeto(hasProjeto.id);
    }
  }, [hasProjeto]);

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
        NotificationManager.success("Alunos vinculados ao projeto com sucesso !");
        await handleListarMembrosPorProjeto(hasProjeto.id);
      } else {
        NotificationManager.error("Falha ao vincular os alunos ao projeto, contate o suporte!");
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("Ocorreu um problema durante a operação, contate o suporte!");
    }
  };

  return (
    <div className="box">
      {isModalVisivel && (
        <ModalSelecionarMembros
          onCancel={handleFecharModal}
          colunas={COLUNAS_MODAL}
          status={isModalVisivel}
          onOk={handleBuscarMembro}
          onSelect={handleSelecionarMembros}
        />
      )}

      <div>
        <div style={{ 
            cursor: "pointer",
            padding: "20px",
            border: "1px solid #d9d9d9",
          }}
          onClick={() => setAlunosVisiveis(!alunosVisiveis)}>
          <h4> VINCULAR ALUNO(S) </h4>
        </div>

        { alunosVisiveis &&

            <div>
              <div
                className="group-buttons"
                style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
              >
                <BotaoAdicionar status={isBotaoAdicionarVisivel} funcao={handleBotaoAdicionarAluno} />
                <BotaoExcluir status={isBotaoExcluirVisivel} />
              </div>

              <Table
                className="tab-equipe"
                columns={COLUNAS_LISTA}
                dataSource={alunos}
                rowKey="id"
                rowSelection={{
                  type: "checkbox",
                }}
              />
            </div>
        }

        
      </div>


      <div>
        <div 
          style={{ 
            cursor: "pointer",
            padding: "20px",
            border: "1px solid #d9d9d9",
          }} 
          onClick={() => setProfessoresVisiveis(!professoresVisiveis)}>
          <h4> VINCULAR PROFESSOR(ES)</h4>
        </div>

        { professoresVisiveis && 
          <div>
            <div
              className="group-buttons"
              style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
            >
              <BotaoAdicionar funcao={handleBotaoAdicionarProfessor}/>
              <BotaoExcluir />
            </div>

            <Table
              className="tab-equipe"
              columns={COLUNAS_LISTA}
              dataSource={professores}
              rowKey="id"
              rowSelection={{
                type: "checkbox",
              }}
            />
        </div>
        }

      </div>
    </div>
  );
};

export default TabEquipe;
