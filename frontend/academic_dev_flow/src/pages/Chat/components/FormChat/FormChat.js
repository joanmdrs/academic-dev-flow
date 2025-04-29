import { Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useContextoChat } from "../../context/ContextoChat";

const FormChatModal = ({ selectProject, visible, onCancel, onOk, action }) => {
    const [form] = Form.useForm();
    const {dadosChat} = useContextoChat()

    useEffect(() => {
        const fetchData = async () => {
            if (dadosChat !== null){
                form.setFieldsValue(dadosChat)
            } else {
                form.resetFields()
            }
        }
        fetchData()
    }, [dadosChat])

    return (
        <Modal
            title="Criar Chat"
            open={visible}
            onCancel={onCancel}
            onOk={() => {
                form
                .validateFields()
                .then((values) => {
                    onOk(values);
                    form.resetFields();
                })
                .catch((info) => {
                    console.log('Validation Failed:', info);
                });
            }}
            okText={action === 'create' ? "Criar" : "Atualizar"}
            cancelText="Cancelar"
        >
            <Form form={form} layout="vertical">
                <Form.Item label="Nome" name="nome" rules={[{ required: true, message: 'Por favor, insira o nome do chat!' }]}>
                    <Input placeholder="Nome do chat" />
                </Form.Item>

                {selectProject}
            </Form>
        </Modal>
    );
};

export default FormChatModal;
