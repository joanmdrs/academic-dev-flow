import React, { useEffect, useState } from "react";
import "./TabVincularEtapas.css";
import { NotificationManager } from "react-notifications";
import { Button, Input, Table, Form, Select } from "antd";
import { useFormContext } from "../../../context/Provider/FormProvider";
import { listarFluxos } from "../../../../../services/fluxoService"; 
import { buscarEtapaPeloId, buscarEtapaPeloNome, buscarEtapasPorFluxo } from "../../../../../services/etapaService";
import BotaoAdicionar from "../../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import ModalVincularEtapa from "../../ModalVincularEtapa/ModalVincularEtapa";
import { atualizarEtapaFluxo, atualizarEtapasFluxo, excluirFluxoEtapaMany, excluirFluxoEtapaOne, listarEtapasPorFluxo, removerEtapaFluxo, vincularEtapaFluxo } from "../../../../../services/fluxo_etapa_service";
import ModalSelecionarObjetos from "../../../../../components/Modals/ModalSelecionarObjetos/ModalSelecionarObjetos";

const { Option } = Select;

const TabVincularEtapas = () => {

  const [etapasVinculadas, setEtapasVinculadas] = useState([])
  const [fluxos, setFluxos] = useState([]);
  const [fluxoSelecionado, setFluxoSelecionado] = useState(null);
  const {hasDadosFluxo, setHasDadosFluxo} = useFormContext()
  const [isModalVisivel, setIsModalVisivel] = useState(false)
  const [isBotaoExcluirVisivel, setIsBotaoExcluirVisivel] = useState(true)
  const [etapasExcluir, setEtapasExcluir] = useState([])
 
  const COLUNAS_TABELA = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nome", dataIndex: "nome", key: "nome" },
    { title: "Descrição", dataIndex: "descricao", key: "descricao"}
  ];

  const handleExibirModal = () => setIsModalVisivel(true)
  const handleFecharModal = () =>  setIsModalVisivel(false)

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

  const handleBuscarEtapas = async (parametro) => {
    try {
      const resposta = await buscarEtapaPeloNome(parametro)

      if(resposta.status !== 200){
        NotificationManager.success("Falha ao buscar os dados, contate o suporte!")
      } else {
        return resposta
      }
    } catch (error) {
      console.log(error)
      NotificationManager.error("Ocorreu um problema durante a operação, contate o suporte!")
    }
  }

  const handleSelecionarEtapas = async (dados) => {
    try {
      const dadosEnviar = dados.map((item) => {
        return {
          fluxo: hasDadosFluxo.id,
          etapa: item.id,
        };
      });
      const resposta = await vincularEtapaFluxo(dadosEnviar);

      if (resposta.status === 200) {
        NotificationManager.success("Etapa(s) vinculada(s) ao fluxo com sucesso !");
        await handleListarEtapasPorFluxo(hasDadosFluxo.id);
      } else {
        NotificationManager.error("Falha ao vincular a(s) etapa(s) ao fluxo, contate o suporte!");
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("Ocorreu um problema durante a operação, contate o suporte!");
    }
  };

  const handleExcluirEtapas = async () => {
    console.log(etapasExcluir)
    try {
      const resposta = etapasExcluir.length === 1
        ? await excluirFluxoEtapaOne(etapasExcluir[0].id)
        : await excluirFluxoEtapaMany(hasDadosFluxo.id, etapasExcluir);
  
      if (resposta.status === 204) {
        await handleListarEtapasPorFluxo(hasDadosFluxo.id)
        NotificationManager.success(`Etapa${etapasExcluir.length > 1 ? 's' : ''} desvinculado${etapasExcluir.length > 1 ? 's' : ''} do fluxo com sucesso!`);
      } else {
        NotificationManager.error(`Falha ao desvincular a${etapasExcluir.length > 1 ? 's' : ''} etapa${etapasExcluir.length > 1 ? 's' : ''} do fluxo, contate o suporte!`);
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("Ocorreu um problema durante a operação, contate o suporte!");
    }
  };

  useEffect(() => {
    handleListarFluxos();
  }, []);


  const rowSelection = {
    onChange: (selectedRowsKeys, selectedRows) => {
      setEtapasExcluir(selectedRows)
      console.log(selectedRows)
    },
  };


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
                <BotaoExcluir  status={false} funcao={handleExcluirEtapas} />
              </div>

              <ModalSelecionarObjetos
                title="Buscar etapas" 
                onOk={handleBuscarEtapas}
                onCancel={handleFecharModal}
                onSelect={handleSelecionarEtapas}
                colunas={COLUNAS_TABELA}
                status={isModalVisivel}
              />

              <Table 
                columns={COLUNAS_TABELA}
                dataSource={etapasVinculadas}
                rowSelection={rowSelection}
                rowKey="id"

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
