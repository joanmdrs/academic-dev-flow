import React, { useEffect, useState } from "react";
import "./TabVincularEtapas.css";
import { NotificationManager } from "react-notifications";
import { Button, Input, Table, Form, Select } from "antd";
import { useFormContext } from "../../../context/Provider/FormProvider";
import { listarFluxos } from "../../../../../services/fluxo_service";
import { buscarEtapaPeloId, buscarEtapasPorFluxo } from "../../../../../services/etapa_service";
import BotaoAdicionar from "../../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import ModalVincularEtapa from "../../ModalVincularEtapa/ModalVincularEtapa";
import { atualizarEtapaFluxo, atualizarEtapasFluxo, listarEtapasPorFluxo, removerEtapaFluxo, vincularEtapaFluxo } from "../../../../../services/fluxo_etapa_service";
import ListaDados from "../../../../../components/Listas/ListaDados/ListaDados";

const { Option } = Select;

const TabVincularEtapas = () => {

  const [etapasVinculadas, setEtapasVinculadas] = useState([])
  const [fluxos, setFluxos] = useState([]);
  const [fluxoSelecionado, setFluxoSelecionado] = useState(null);
  const {hasDadosFluxo, setHasDadosFluxo} = useFormContext()
  const [isModalVisivel, setIsModalVisivel] = useState(false)
  const [isBotaoExcluirVisivel, setIsBotaoExcluirVisivel] = useState(true)
  const [hasEtapaExcluir, setHasEtapaExcluir] = useState(null)

  const COLUNAS_TABELA = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nome", dataIndex: "nome", key: "nome" },
    {
      title: "Situação",
      dataIndex: "status",
      key: "situacao",
      editable: true,
      render: (text, record) => (
        <Select
          value={text} // Use the state value initially, then update
          onChange={(value) => handleChange(value, record, "status")}
        >
          <Option value="Em andamento">Em andamento</Option>
          <Option value="Concluída">Concluída</Option>
          <Option value="Cancelada">Cancelada</Option>
        </Select>
      ),
    },
    {
      title: "Data de início",
      dataIndex: "data_inicio",
      key: "data_inicio",
      editable: true,
      render: (text, record) => (
        <Input
          type="date"
          value={text} 
          onChange={(e) =>
            handleChange(e.target.value, record, "data_inicio")
          }
        />
      ),
    },
    {
      title: "Data de término",
      dataIndex: "data_fim",
      key: "data_fim",
      editable: true,
      render: (text, record) => (
        <Input
          type="date"
          value={text} 
          onChange={(e) => handleChange(e.target.value, record, "data_fim")}
        />
      ),
    },
  ];

  const handleExibirModal = () => setIsModalVisivel(true)
  const handleFecharModal = () =>  setIsModalVisivel(false)

  

  const handleChange = async (value, record, dataIndex) => {
    const dados = {
      fluxo: record.fluxo,
      etapa: record.etapa, 
      [dataIndex]: value,
    };

    try {
      await atualizarEtapaFluxo(dados, record.id);
      const updatedEtapas = etapasVinculadas.map((etapa) =>
        etapa.id === record.id ? { ...etapa, [dataIndex]: value } : etapa
      );
      setEtapasVinculadas(updatedEtapas);

    } catch (error) {
      console.error("Erro ao atualizar etapa de fluxo:", error);
    }
  };

  const handleListarFluxos = async () => {
    try {
      const resposta = await listarFluxos();

      if (resposta.status === 200) {
        setFluxos(resposta.data);
      } else {
        NotificationManager.error(
          "Ocorreu um problema durante a busca dos dados, contate o suporte!"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Ocorreu um problema durante a busca dos dados, contate o suporte!"
      );
    }
  };

  const handleListarEtapasPorFluxo = async (idFluxo) => {
    try {
      const resposta = await listarEtapasPorFluxo(idFluxo);

      if (resposta.status === 200) {
        const etapasVinculadas = resposta.data 

        if (etapasVinculadas.length === 0) {
          setEtapasVinculadas([])

        } else {

          const promisesEtapas = etapasVinculadas.map(async (fluxoEtapa) => {
            const respostaEtapa = await buscarEtapaPeloId(fluxoEtapa.etapa);
            return {
              id: fluxoEtapa.id,
              fluxo: fluxoEtapa.fluxo,
              etapa: fluxoEtapa.etapa,
              nome: respostaEtapa.data.nome,
              descricao: respostaEtapa.data.descricao,
              status: fluxoEtapa.status,
              data_inicio: fluxoEtapa.data_inicio,
              data_fim: fluxoEtapa.data_fim,
            };
          });
  
          const etapasResolvidas = await Promise.all(promisesEtapas);
          
          setEtapasVinculadas(etapasResolvidas);
        }

      } else {
        NotificationManager.error(
          "Ocorreu um problema durante a busca dos dados, contate o suporte!"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Ocorreu um problema durante a busca dos dados, contate o suporte!"
      );
    }
  };
  
  const handleFluxoChange = async (value) => {
    setFluxoSelecionado(value);
    const fluxo = JSON.parse(value)
    setHasDadosFluxo(fluxo)
    await handleListarEtapasPorFluxo(fluxo.id)
  };

  const handleVincularEtapa = async (dados) => {
    try {
      const resposta = await vincularEtapaFluxo(dados)

      if (resposta.status === 200) {
        NotificationManager.success("Etapa vinculada com sucesso ! ")
        await handleListarEtapasPorFluxo(resposta.data.fluxo)
      } else {
        NotificationManager.error("Falha ao vincular etapa ao fluxo, contate o suporte !")
      }
    } catch (error) {
      NotificationManager.error('Ocorreu um erro durante a operação, contate o suporte!')
    }
  }

  const handleExcluirEtapa = async () => {

    try {
      const idEtapa = hasEtapaExcluir
      const resposta = await removerEtapaFluxo(idEtapa)

      if (resposta.status === 204) {
        const etapasAtualizadas = etapasVinculadas.filter((etapa) => etapa.id !== idEtapa);
        setEtapasVinculadas(etapasAtualizadas);

        NotificationManager.success("Etapa desvinculada do fluxo com sucesso!");
      } else {
        NotificationManager.error("Falha ao desvincular a etapa do fluxo, contate o suporte!")
      }
    } catch (error) {
      NotificationManager.error('Ocorreu um erro durante a operação, contate o suporte!')
    }
  }




  const handleAtivarBotaoExcluir = (dados) => {

    const idEtapaExcluir = dados.id
    setHasEtapaExcluir(idEtapaExcluir)
    setIsBotaoExcluirVisivel(false);

  }


  useEffect(() => {
    handleListarFluxos();
  }, []);

  return (
    <div className="tab-vincular-etapas form-box">
      <div className="form-selecionar-fluxo">
        <Form layout="vertical">
          <Form.Item label="Fluxo">
            <Select
              style={{ width: "50%" }}
              onChange={handleFluxoChange}
              value={fluxoSelecionado}
            >
              {fluxos.map((fluxo) => (
                <Option key={fluxo.id} value={JSON.stringify(fluxo)}>
                  {fluxo.nome}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </div>

      

      <div className="tabela-etapas-vinculadas">

        {
          fluxoSelecionado !== null ? 
          (
            <React.Fragment>
              <div className="div-botoes-acao-vincular-etapas"> 
                <BotaoAdicionar funcao={handleExibirModal} />
                <BotaoExcluir funcao={handleExcluirEtapa} status={isBotaoExcluirVisivel} />
              </div>

              <ModalVincularEtapa 
                open={isModalVisivel} 
                onCancel={handleFecharModal}
                onSave={handleVincularEtapa}
                
                />

              <ListaDados 
                colunas={COLUNAS_TABELA}
                dados={etapasVinculadas}
                onClickRow={handleAtivarBotaoExcluir}
              />
            </React.Fragment>
          
          )

          : null
        }
        
      </div>

      <div></div>
    </div>
  );
};

export default TabVincularEtapas;
