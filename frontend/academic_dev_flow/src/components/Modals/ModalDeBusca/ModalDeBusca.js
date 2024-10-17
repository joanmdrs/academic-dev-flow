import React, { useState } from "react";
import "./ModalDeBusca.css";
import { Modal, Form, Input, Table } from 'antd';

const { Item } = Form;

const ModalDeBusca = ({ status, titulo, name, onCancel, onOk, colunas }) => {

    const [form] = Form.useForm();
    const [parametro, setParametro] = useState('');
    const [dados, setDados] = useState([]);
    const [hasResposta, setHasResposta] = useState(false);

    const handleAlterarParametro = (event) => {
        setParametro(event.target.value);
    };

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            // Previne o comportamento padrão de envio de formulário ao pressionar "Enter"
            event.preventDefault();
            
            const response = await onOk(parametro);
            setHasResposta(true);
            if (!response.error) {
                setDados(response.data.results);
            } else {
                setDados([]);
            }
        }
    };

    return (
        <Modal
            width={1000}
            title={titulo}
            open={status}
            cancelText="Cancelar"
            okText="Buscar"
            onCancel={() => {
                onCancel();
                setHasResposta(false);
                setDados([]);
            }}
            onOk={async () => {
                const response = await onOk(parametro);
                setHasResposta(true);
                if (!response.error) {
                    setDados(response.data.results);
                } else {
                    setDados([]);
                }
            }}
        >
            <Form form={form} layout="vertical">
                <Item>
                    <Input
                        
                        style={{border: 'none', borderBottom: '1px solid var(--primary-color)', borderRadius: '0'}}
                        placeholder='Digite aqui'
                        
                        value={parametro}
                        onChange={handleAlterarParametro}
                        onKeyDown={handleKeyDown}
                    />
                </Item>
            </Form>

            {hasResposta ? (
                <>
                    {hasResposta && dados.length > 0 ? (
                        <>
                            <Table dataSource={dados} columns={colunas} rowKey="id" />
                        </>
                    ) : (
                        <div>Nenhum resultado encontrado</div>
                    )}
                </>
            ) : null}
        </Modal>
    );
};

export default ModalDeBusca;
