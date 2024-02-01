import { Button, Form, Input, Modal, Table } from "antd";
import React, { useState } from "react";

const ModalSelecionarMembros = ({status, onCancel, onOk, colunas, onSelect}) => {

    const [form] = Form.useForm();
    const [parametro, setParametro] = useState('');
    const [dados, setDados] = useState([])
    const [hasResposta, setHasResposta] = useState(false)
    const [membros, setMembros] = useState([])

    const handleAlterarParametro = (event) => {
        setParametro(event.target.value);
    };

    const handleResetar = () => {
        form.resetFields()
        setHasResposta(false)
        setDados([])
        setParametro('')
    }

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
          setMembros(selectedRows)
        },
      };


    return (
        <Modal 
            open={status}
            onCancel={onCancel}
            footer={
                <div> 
                    <Button type="primary" onClick={() =>  onSelect(membros)}> SELECIONAR </Button>
                    <Button onClick={onCancel}> FECHAR </Button>
                </div>
            }

        >
            <h4> Buscar Membro </h4>
            <Form form={form}> 
                <Form.Item>
                    <Input  type="text" placeholder="Ex.: Joan "/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={ async () => {
                        const resposta = await onOk(parametro)
                        setHasResposta(true)
                        if(resposta.status === 200) {
                            setDados(resposta.data.results)
                        } else {
                            setDados([])
                    }
                    }}> FILTRAR </Button>
                    <Button onClick={handleResetar}> LIMPAR </Button>
                </Form.Item>
            </Form>

            { hasResposta &&  
                <Table
                    columns={colunas}
                    dataSource={dados}
                    rowKey="id"
                    rowSelection={rowSelection}
                />
            }
           
        </Modal>
    )
}


export default ModalSelecionarMembros;