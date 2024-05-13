import React, { useState } from "react";
import "./ModalDeBusca.css"
import { Modal, Form, Input, Divider, Table } from 'antd';

const { Item } = Form;

const ModalDeBusca = ({status, titulo, name, onCancel, onOk, colunas}) => {


    const [form] = Form.useForm();
    const [parametro, setParametro] = useState('');
    const [dados, setDados] = useState([])
    const [hasResposta, setHasResposta] = useState(false)

    const handleAlterarParametro = (event) => {
        setParametro(event.target.value);
    };

    return (
        <Modal
            title={titulo}
            open={status}
            cancelText="Cancelar"
            okText="Buscar"
            onCancel={() => {
                onCancel()
                setHasResposta(false)
                setDados([])

            }}
            onOk={async () => {
                const response = await onOk(parametro)
                setHasResposta(true)
                if(!response.error) {
                    setDados(response.data.results)
                } else {
                    setDados([])
                }
            }}
        >
            <Form form={form} layout="vertical">
                <Item name={name} >
                    <Input
                        name={name}
                        value={parametro}
                        onChange={handleAlterarParametro}
                    />
                </Item>
            </Form>

            {hasResposta ? (
                <>
                    {hasResposta && dados.length > 0 ? (
                        <>
                            <Divider orientation="left">Resultados</Divider>
                            <Table className="component-tabela-modal" dataSource={dados} columns={colunas} rowKey="id" />
                        </>
                    ) : 
                        <div> Nenhum resultado encontrado </div>
                    }
                    
                </>
            ) : null
            }

            

        </Modal>
    )
}

export default ModalDeBusca;