import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { listarEtapas } from "../../../../services/etapaService";
import { NotificationManager } from "react-notifications";
import { useFormContext } from "../../context/Provider/FormProvider";

const { Option } = Select;

const ModalVincularEtapa = ({ open, onCancel, onSave }) => {
  const [etapas, setEtapas] = useState([]);
  const [form] = Form.useForm();

  const {hasDadosFluxo, hasDadosEtapas, setHasDadosEtapas} = useFormContext()
  const handleListarEtapas = async () => {
    try {
      const resposta = await listarEtapas();

      if (resposta.status === 200) {
        setEtapas(resposta.data);
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

  const handleReset = () => {
    onCancel()
    form.resetFields()
  }

  const handleSave = async (values) => {

    const etapa = JSON.parse(values.etapa)
    const fluxo = hasDadosFluxo
    const fluxoEtapa = {
      fluxo: fluxo.id,
      etapa: etapa.id, 
      status: values.situacao,
      data_inicio: values.dataInicio, 
      data_fim: values.dataTermino
    }

    console.log(fluxoEtapa)
    try {
     await onSave(fluxoEtapa)
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
  };

  useEffect(() => {
    handleListarEtapas();
  }, []);

  return (
    <Modal
      title="Incluir Etapa"
      open={open}
      onCancel={handleReset}
      footer={[
        <div key="customFooter" className="modal-footer">
          <Button
            key="salvar"
            style={{ backgroundColor: "#43A047", color: "#FFFFFF" }}
            onClick={() => form.submit()}
          >
            SALVAR
          </Button>
          <Button key="cancelar" onClick={handleReset}>
            CANCELAR
          </Button>
        </div>,
      ]}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSave}
      >
        <Form.Item name="etapa">
          <Select>
            {etapas.map((etapa) => (
              <Option key={etapa.id} value={JSON.stringify(etapa)}>
                {etapa.nome}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="situacao" label="Situação">
          <Select>
            <Option value="Em andamento">Em andamento</Option>
            <Option value="Concluída">Concluída</Option>
            <Option value="Cancelada">Cancelada</Option>
          </Select>
        </Form.Item>

        <Form.Item name="dataInicio" label="Data de início">
          <Input type="date" />
        </Form.Item>

        <Form.Item name="dataTermino" label="Data de término">
          <Input type="date" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalVincularEtapa;
