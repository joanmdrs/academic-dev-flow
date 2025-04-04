import { Button, Form, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useContextoRelease } from "../../context/ContextoRelease";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { NotificationManager } from "react-notifications";
import { formatDateIso, handleError } from "../../../../services/utils";
import { buscarMembrosPorProjeto } from "../../../../services/membroProjetoService";
import { optionsStatusReleases } from "../../../../services/optionsStatus";
import { buscarReleasesAdjacentes, buscarUltimaReleaseDoProjeto } from "../../../../services/releaseService";

const FormRelease = ({ onSubmit, onCancel, selectProject }) => {
    const { releaseData } = useContextoRelease();
    const { dadosProjeto } = useContextoGlobalProjeto();
    const [form] = useForm();
    const [optionsMembros, setOptionsMembros] = useState([]);
    const [lastRelease, setLastRelease] = useState(null);
    const [releaseAdjacentes, setReleasesAdjacentes] = useState(null);


  const handleGetMembros = async () => {
    try {
      const response = await buscarMembrosPorProjeto(dadosProjeto.id);

      if (!response.error && response.data.length !== 0){
        const resultados = response.data.map((item) => ({
          value: item.id,
          label: `${item.nome_membro} (${item.nome_grupo})`,
        }));
        setOptionsMembros(resultados);
      } else {
        NotificationManager.info("O projeto selecionado não possui membros vinculados !")
      }

     
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
      handleError(error, "Falha ao buscar lançamentos adjacentes.");
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
            `A data de lançamento não pode ser anterior ao lançamento anterior (${formatDateIso(release_anterior.data_lancamento)})`
          );
        }

        if (dataReleasePosterior && dataLancamento > dataReleasePosterior) {
          return Promise.reject(
            `A data de lançamento não pode ser posterior ao lançamento posterior (${formatDateIso(release_posterior.data_lancamento)})`
          );
        }
      }
    } else if (lastRelease) {
      // Caso de cadastro: verifica se a data de lançamento é válida em relação à última release
      const dataUltimaRelease = new Date(lastRelease.data_lancamento);

      if (dataLancamento < dataUltimaRelease) {
        return Promise.reject(
          `A data de lançamento não pode ser anterior ao último lançamento (${formatDateIso(lastRelease.data_lancamento)})`
        );
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (dadosProjeto !== null) {
        await handleGetMembros();

        if (releaseData !== null) {
          form.setFieldsValue(releaseData);
          await handleGetReleasesAdjacentes();
        } else {
          await handleGetUltimaRelease();
          form.resetFields();
        }
      } else {
        form.resetFields();
        setOptionsMembros([]);
      }
    };

    fetchData();
  }, [dadosProjeto, releaseData]);

  return (
    <Form layout="vertical" className="global-form" form={form} onFinish={onSubmit}>
      {selectProject}
      <Form.Item
        label="Nome"
        name="nome"
        rules={[{ required: true, message: "Por favor, preencha este campo!" }]}
      >
        <Input type="text" name="nome" placeholder="Nome do lançamento" />
      </Form.Item>

      <Form.Item label="Descrição" name="descricao">
        <Input.TextArea rows={8} name="descricao" placeholder="Descrição do lançamento (opcional)" />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        style={{width: '50%'}}
        rules={[{ required: true, message: "Por favor, selecione uma opção!" }]}
      >
        <Select allowClear options={optionsStatusReleases} placeholder="Selecione" />
      </Form.Item>

      <Form.Item
        label="Responsável"
        name="responsavel"
        style={{width: '50%'}}
      >
        <Select allowClear options={optionsMembros} placeholder="Selecione"/>
      </Form.Item>
      <Form.Item
        label="Data de Lançamento"
        name="data_lancamento"
        style={{width: '50%'}}
        rules={[{ validator: validateDataLancamento, required: true, message: 'Por favor, preencha este campo!'}]}
      >
        <Input type="date" name="data_lancamento" allowClear/>
      </Form.Item>
        

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
