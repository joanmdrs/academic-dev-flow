import React from "react";
import {Form, Input} from 'antd'

const InputsAdmin = () => {

    return (
        <>
            <Form.Item label="Repositório" name="repository">
                <Input name="repository" placeholder="(nome do proprietário)/(nome do repositório)" />
            </Form.Item>

            <Form.Item 
                label="Nome do autor" 
                name="author_name" 
                rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
            > 
                <Input name="author_name" placeholder="nome do autor"/>
            </Form.Item>

            <Form.Item 
                label="Email do autor" 
                name="author_email"
                rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
            > 
                <Input name="author_email" placeholder="email do autor" />
            </Form.Item>

            <Form.Item 
                label="Mensagem de commit" 
                name="commit_message"
                rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
            >
                <Input name="commit_message" placeholder="mensagem de commit"/>
            </Form.Item>
        </>
    )
}

export default InputsAdmin