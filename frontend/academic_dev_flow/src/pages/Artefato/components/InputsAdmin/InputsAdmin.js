import React from "react";
import {Form, Input} from 'antd'

const InputsAdmin = () => {

    return (
        <>
            <Form.Item label="Repositório" name="repository">
                <Input name="repository" placeholder="(nome do proprietário)/(nome do repositório)" />
            </Form.Item>

            <Form.Item label="Nome do autor" name="author_name"> 
                <Input name="author_name" placeholder="nome do autor"/>
            </Form.Item>

            <Form.Item label="Email do autor" name="author_email"> 
                <Input name="author_email" placeholder="email do autor" />
            </Form.Item>
        </>
    )
}

export default InputsAdmin