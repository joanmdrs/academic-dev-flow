import React, { useState } from "react";
import "./ModalDeSelecao.css";
import { Modal, Form, Input, Table, Button } from "antd";

const { Item } = Form;

const ModalDeSelecao = ({ status, titulo, label, name, onCancel, onOk, colunas }) => {
  const [form] = Form.useForm();
  const [parametro, setParametro] = useState('');
  const [dados, setDados] = useState([]);
  const [hasResposta, setHasResposta] = useState(false);

  const handleAlterarParametro = (event) => {
    setParametro(event.target.value);
  };

  const handleCliqueBotaoFechar = () => {
    onCancel();
    setHasResposta(false);
    setDados([]);
  };

  const handleCliqueBotaoFiltrar = async () => {
    const resposta = await onOk(parametro);
    setHasResposta(true);
    if (resposta.status === 200) {
      setDados(resposta.data.results);
    } else {
      setDados([]);
    }
  };

  const handleCliqueBotaoLimpar = () => {
    form.resetFields();
  };



  return (
    <Modal
      title={titulo}
      open={status} 
      footer={[
        <div key="customFooter" className="modal-footer">
          <Button key="selecionar" style={{ backgroundColor: "#43A047", color: "#FFFFFF" }}>
            SELECIONAR
          </Button>
          <Button key="fechar" onClick={handleCliqueBotaoFechar}>
            FECHAR
          </Button>
        </div>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Item name={name}>
          <Input
            name={name}
            placeholder={label}
            value={parametro}
            onChange={handleAlterarParametro}
          />
        </Item>
        <Item className="modal-botoes-filtrar-limpar">
          <Button type="primary" onClick={handleCliqueBotaoFiltrar}>
            FILTRAR
          </Button>
          <Button type="default" onClick={handleCliqueBotaoLimpar}>
            LIMPAR
          </Button>
        </Item>
      </Form>

      {hasResposta ? (
        <>
          {hasResposta && dados.length > 0 ? (
            <>
              <Table
                className="modal-selecao-tabela"
                dataSource={dados}
                columns={colunas}
                rowKey="id"
              />
            </>
          ) : (
            <div>Nenhum resultado encontrado</div>
          )}
        </>
      ) : null}
    </Modal>
  );
};

export default ModalDeSelecao;
