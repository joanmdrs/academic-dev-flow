import React, { useEffect, useState } from "react";
import FormPontuacao from "./FormPontuacao/FormPontuacao";
import { useProjetoContext } from "../../context/ContextoGlobalProjeto";
import {
  atualizarDocumento,
  buscarDocumentoPeloId,
} from "../../services/documentoService";
import ExibirPontuacao from "./ExibirPontuacao/ExibirPontuacao";
import {
  atualizarPontuacao,
  buscarPontuacaoPeloId,
  excluirPontuacao,
  registrarPontuacao,
} from "../../services/pontuacaoService";
import Loading from "../../components/Loading/Loading";
import { Empty, Modal } from "antd";

const GerenciarPontuacao = () => {
  const {
    dadosDocumento,
    setDadosDocumento,
    dadosPontuacao,
    setDadosPontuacao,
    autor,
    userGroup,
  } = useProjetoContext();
  const [loading, setLoading] = useState(true);
  const [actionForm, setActionForm] = useState("create");

  const handleHasScore = async () => {
    const response = await buscarDocumentoPeloId(dadosDocumento.id);
    const idScore = response.data.pontuacao;
    if (idScore) {
      const response1 = await buscarPontuacaoPeloId(idScore);
      setDadosPontuacao(response1.data);
    }
  };

  const handleRefreshDocument = async () => {
    const response = await buscarDocumentoPeloId(dadosDocumento.id)
    setDadosDocumento(response.data)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (dadosDocumento) {
        await handleHasScore();
        setLoading(false);
      }
    };
    fetchData();
  }, [dadosDocumento, loading]);

  const handleReload = async () => {
    setLoading(true)
    await handleRefreshDocument()
    await handleHasScore()
  }

  const handleEdit = () => {
    setActionForm("update");
  };

  const handleCreateScore = async (dados) => {
    dados["autor"] = autor;
    const response = await registrarPontuacao(dados);
    const newData = { pontuacao: response.data.id };
    await atualizarDocumento(dadosDocumento.id, newData);
  }

  const handleUpdateScore = async (dados) => {
    await atualizarPontuacao(dadosPontuacao.id, dados);
    setActionForm("create");
  }

  const handleSaveScore = async (dados) => {
    if (actionForm === "create") {
        await handleCreateScore(dados)
    } else if (actionForm === "update") {
        await handleUpdateScore(dados)
    }
    await handleReload()
  };

  const handleDeleteScore = async () => {
    await excluirPontuacao(dadosPontuacao.id)
    setDadosPontuacao(null)
    await handleReload()
  }

const handleDelete = () => {
    Modal.confirm({
        title: 'Confirmar exclusão',
        content: 'Tem certeza que deseja excluir a pontuação ?',
        okText: 'Sim',
        cancelText: 'Não',
        onOk: async () =>  await handleDeleteScore()
    });
};

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {userGroup === "Alunos" ? (
        <div>
          {dadosDocumento.pontuacao !== undefined &&
          dadosDocumento.pontuacao !== null ? (
            <ExibirPontuacao />
          ) : (
            <Empty
              description="O professor ainda não registrou notas."
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      ) : (
        <div>
          {dadosDocumento.pontuacao !== undefined &&
          dadosDocumento.pontuacao !== null &&
          actionForm !== "update" ? (
            <ExibirPontuacao onEdit={handleEdit} onDelete={handleDelete} />
          ) : (
            <FormPontuacao onSubmit={handleSaveScore} />
          )}
        </div>
      )}
    </div>
  );
};

export default GerenciarPontuacao;
