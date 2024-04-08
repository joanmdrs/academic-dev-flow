import React from "react";
import {Form, Input} from 'antd'

const InputsAdmin = () => {

    return (
        <>
            <Form.Item label="Repositório (repo/owner)" name="repository">
                <Input name="repository" />
            </Form.Item>

            <Form.Item label="Nome do autor" name="author_name"> 
                <Input name="author_name" />
            </Form.Item>

            <Form.Item label="Email do autor" name="author_email"> 
                <Input name="author_email" />
            </Form.Item>
        </>
    )
}

export default InputsAdmin