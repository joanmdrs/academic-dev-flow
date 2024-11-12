import { Button, Form, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useContextoRelease } from "../../context/ContextoRelease";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { listarEtapasPorFluxo } from "../../../../services/fluxoEtapaService";
import { NotificationManager } from "react-notifications";
import { buscarEtapaPeloId } from "../../../../services/etapaService";
import { formatDateIso, handleError } from "../../../../services/utils";
import { buscarMembrosPorProjeto } from "../../../../services/membroProjetoService";
import { optionsStatusReleases } from "../../../../services/optionsStatus";
import { buscarReleasesAdjacentes, buscarUltimaReleaseDoProjeto } from "../../../../services/releaseService";

const FormRelease = ({ onSubmit, onCancel, selectProject }) => {
    const { releaseData } = useContextoRelease();
    const { dadosProjeto } = useContextoGlobalProjeto();
    const [form] = useForm();
    const [optionsEtapas, setOptionsEtapas] = useState([]);
    const [optionsMembros, setOptionsMembros] = useState([]);
    const [titulo, setTitulo] = useState("CADASTRAR RELEASE");
    const [lastRelease, setLastRelease] = useState(null);
    const [releaseAdjacentes, setReleasesAdjacentes] = useState(null);

  const handleGetEtapas = async () => {
    try {
      if (dadosProjeto.fluxo) {
        const response = await listarEtapasPorFluxo(dadosProjeto.fluxo);

        if (!response.error) {
          const promises = await response.data.map(async (item) => {
            const response2 = await buscarEtapaPeloId(item.etapa);

            return {
              value: item.id,
              label: response2.data.nome,
            };
          });

          const results = await Promise.all(promises);
          setOptionsEtapas(results);
        }
      } else {
        NotificationManager.info(
          "O projeto selecionado não possui um fluxo associado. Vincule o fluxo ao projeto !"
        );
      }
    } catch (error) {
      return handleError(error, "Falha ao tentar buscar as etapas do fluxo do projeto !");
    }
  };

  const handleGetMembros = async () => {
    try {
      const response = await buscarMembrosPorProjeto(dadosProjeto.id);

      const resultados = response.data.map((item) => ({
        value: item.id,
        label: `${item.nome_membro} (${item.nome_grupo})`,
      }));
      setOptionsMembros(resultados);
    } catch (error) {
      return handleError(error, "Falha ao tentar buscar os membros do projeto !");
    }
  };

  const handleGetUltimaRelease = async () => {
    const response = await buscarUltimaReleaseDoProjeto(dadosProjeto.id);

    if (!response.error && response.data.code !== "PROJETO_SEM_RELEASES") {
      setLastRelease(response.data);
    }
  };

  const handleGetReleasesAdjacentes = async () => {
    try {
      const response = await buscarReleasesAdjacentes(dadosProjeto.id, releaseData.id);
      if (!response.error) {
        const { release_anterior, release_posterior } = response.data;
        setReleasesAdjacentes({ release_anterior, release_posterior });
      }
    } catch (error) {
      handleError(error, "Falha ao buscar releases adjacentes.");
    }
  };

  const validateDataLancamento = (_, value) => {
    if (!value) {
      return Promise.reject("Por favor, preencha este campo!");
    }

    const dataLancamento = new Date(value);
    const dataInicioProjeto = new Date(dadosProjeto.data_inicio);
    const dataTerminoProjeto = new Date(dadosProjeto.data_termino);

    // Verifica se a data de lançamento está dentro do intervalo do projeto
    if (dataLancamento < dataInicioProjeto || dataLancamento > dataTerminoProjeto) {
      return Promise.reject(`A data de lançamento deve estar entre 
        ${formatDateIso(dadosProjeto.data_inicio)} e ${formatDateIso(dadosProjeto.data_termino)}`);
    }

    if (releaseData) {
      // Caso de atualização: verifica se a data de lançamento é válida em relação às releases adjacentes
      if (releaseAdjacentes) {
        const { release_anterior, release_posterior } = releaseAdjacentes;

        const dataReleaseAnterior = release_anterior ? new Date(release_anterior.data_lancamento) : null;
        const dataReleasePosterior = release_posterior ? new Date(release_posterior.data_lancamento) : null;

        if (dataReleaseAnterior && dataLancamento < dataReleaseAnterior) {
          return Promise.reject(
            `A data de lançamento não pode ser anterior à release anterior (${formatDateIso(release_anterior.data_lancamento)})`
          );
        }

        if (dataReleasePosterior && dataLancamento > dataReleasePosterior) {
          return Promise.reject(
            `A data de lançamento não pode ser posterior à release posterior (${formatDateIso(release_posterior.data_lancamento)})`
          );
        }
      }
    } else if (lastRelease) {
      // Caso de cadastro: verifica se a data de lançamento é válida em relação à última release
      const dataUltimaRelease = new Date(lastRelease.data_lancamento);

      if (dataLancamento < dataUltimaRelease) {
        return Promise.reject(
          `A data de lançamento não pode ser anterior à última release (${formatDateIso(lastRelease.data_lancamento)})`
        );
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (dadosProjeto !== null) {
        await handleGetEtapas();
        await handleGetMembros();

        if (releaseData !== null) {
          form.setFieldsValue(releaseData);
          setTitulo("ATUALIZAR RELEASE");
          await handleGetReleasesAdjacentes();
        } else {
          await handleGetUltimaRelease();
          form.resetFields();
          setTitulo("CADASTRAR RELEASE");
        }
      } else {
        form.resetFields();
        setOptionsEtapas([]);
        setOptionsMembros([]);
      }
    };

    fetchData();
  }, [dadosProjeto, releaseData]);

  return (
    <Form layout="vertical" className="global-form" form={form} onFinish={onSubmit}>
      <Form.Item>
        <h4> {titulo} </h4>
      </Form.Item>

      {selectProject}

      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: "2" }}>
          <Form.Item
            label="Nome"
            name="nome"
            rules={[{ required: true, message: "Por favor, preencha este campo!" }]}
          >
            <Input type="text" name="nome" placeholder="nome" />
          </Form.Item>

          <Form.Item label="Descrição" name="descricao">
            <Input.TextArea rows={5} name="descricao" placeholder="descrição ..." />
          </Form.Item>

          <Form.Item
            label="Data de Lançamento"
            name="data_lancamento"
            rules={[{ validator: validateDataLancamento }]}
          >
            <Input type="date" name="data_lancamento" style={{ width: "fit-content" }} />
          </Form.Item>
        </div>

        <div style={{ flex: "1" }}>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Por favor, selecione uma opção!" }]}
          >
            <Select allowClear options={optionsStatusReleases} defaultValue="Selecione" />
          </Form.Item>

          <Form.Item
            label="Etapa"
            name="etapa"
            rules={[{ required: true, message: "Por favor, selecione uma opção!" }]}
          >
            <Select allowClear options={optionsEtapas} defaultValue="Selecione" />
          </Form.Item>

          <Form.Item
            label="Responsável"
            name="responsavel"
            rules={[{ required: true, message: "Por favor, selecione uma opção!" }]}
          >
            <Select allowClear options={optionsMembros} defaultValue="Selecione" />
          </Form.Item>
        </div>
      </div>

      <Space style={{ display: "flex", gap: "10px" }}>
        <Button type="primary" htmlType="submit">
          Salvar
        </Button>
        <Button onClick={onCancel} type="primary" danger>
          Cancelar
        </Button>
      </Space>
    </Form>
  );
};

export default FormRelease;
