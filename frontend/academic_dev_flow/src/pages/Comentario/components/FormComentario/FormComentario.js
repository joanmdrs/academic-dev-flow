import React from "react";
import './FormComentario.css';
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";

const FormComentario = ({ onSubmit, titulo}) => {
    const [form] = useForm();

    const handleSubmitForm = (values) => {
        onSubmit(values);
        form.resetFields();
    };

    return (
    
        <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
            <h4>{titulo}</h4>
            <Form.Item
                name="mensagem"
                rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
            >
                <Input.TextArea rows={4} placeholder="Comentário ..." />
            </Form.Item>

            <Button type="primary" htmlType="submit">
                Comentar
            </Button>
        </Form>

    );
};

export default FormComentario;
