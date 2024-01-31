import { Button, Form, Input, Modal, Table } from "antd";
import React, { useState } from "react";

const ModalSelecionarMembros = ({status, onCancel, onOk, colunas}) => {

    const [form] = Form.useForm();
    const [parametro, setParametro] = useState('');
    const [dados, setDados] = useState([])
    const [hasResposta, setHasResposta] = useState(false)

    const handleAlterarParametro = (event) => {
        setParametro(event.target.value);
    };

    const handleResetar = () => {
        form.resetFields()
        setHasResposta(false)
        setDados([])
        setParametro('')
    }

    const handleSelecionar = () => {

    }


    return (
        <Modal 
            open={true}
            onCancel={onCancel}
            footer={
                <div> 
                    <Button type="primary" onClick={handleSelecionar}> SELECIONAR </Button>
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
                    rowSelection={{
                        type: "checkbox"
                        
                    }}
                />
            }
           
        </Modal>
    )
}

export default ModalSelecionarMembros;