import { Form, Input, Modal } from "antd";
import React, { useState } from "react";

const FormChatModal = ({ selectProject, visible, onCancel, onOk, action }) => {
    const [form] = Form.useForm();

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
