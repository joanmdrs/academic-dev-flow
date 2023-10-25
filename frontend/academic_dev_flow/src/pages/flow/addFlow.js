import React, { useState } from "react";
import "./addFlow.css";
import { Form, Input, Button, Modal, List } from 'antd';
import { ArrowLeftOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { AiFillEdit } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";

const AddFlow = () => {

    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [etapas, setEtapas] = useState([]);
    const [etapaNome, setEtapaNome] = useState("");
    
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            setEtapaNome(values.nome);
            setEtapas([...etapas, values]);
            form.resetFields();
            setIsModalVisible(false);
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = () => {
        
        console.log("Dados do formulário:", { nome, descricao, etapas });
    };

    const { nome, descricao } = form.getFieldsValue();

    return (

        <div className="form-flow">
            <div className="buttons-arrow-and-close">
                <Button icon={<ArrowLeftOutlined />} onClick={() => console.log('Botão de voltar clicado')} />
                <Button icon={<CloseOutlined />} onClick={() => console.log('Botão de fechar clicado')} />
            </div>

            <div className="box-forms">
                <div className="form-add-flow">
                    <h3>Novo Fluxo de desenvolvimento</h3>
                    <Form
                        name="myForm"
                        className="myform"
                        onFinish={onFinish}
                        layout="vertical"
                        
                    >
                        <Form.Item name="nome" label="Nome">
                            <Input />
                        </Form.Item>

                        <Form.Item name="descricao" label="Descrição">
                            <Input.TextArea />
                        </Form.Item>
                        
                    </Form>
                </div>

                <div className="button-add-etapa">
                    <Button onClick={showModal} id="button-add-etapa">
                        <PlusOutlined />
                        Adicionar etapa
                    </Button>

                    {etapas.length > 0 && (
                        <div>
                            <List
                                size="small"
                                bordered
                                dataSource={etapas}
                                renderItem={(item, index) => (
                                    <List.Item 
                                        actions={
                                            [ 
                                                <Button> 
                                                    <AiFillEdit />
                                                </Button>, 
                                                <Button>
                                                    <IoMdTrash />
                                                </Button>
                                            ]
                                        }
                                    >
                                        {item.nome}

                                    </List.Item>
                                )}
                            />
                            
                        </div>
                    )}
                </div>
            </div>

        
            

            <Modal
                title="Adicionar Etapa"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form}>
                    <Form.Item name="nome" label="Nome">
                        <Input />
                    </Form.Item>

                    <Form.Item name="descricao" label="Descrição">
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item name="data_inicio" label="Data Início">
                        <Input type="date" />
                    </Form.Item>

                    <Form.Item name="data_fim" label="Data Fim">
                        <Input type="date" />
                    </Form.Item>

                    <Form.Item name="status" label="Status">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>


            


        
        </div>
    )
}

export default AddFlow