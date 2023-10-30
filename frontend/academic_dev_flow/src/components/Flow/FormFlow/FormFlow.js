import React from "react";
import "./FormFlow.css";
import {Form, Input, } from "antd";
import { useForm } from "antd/es/form/Form";


const FormFlow = ({onFinish}) => {

    const [form] = useForm()

    return (
        <div className="form-add-flow">
            <Form
                name="myForm"
                className="myform"
                onFinish={onFinish}
                layout="vertical"
                form = {form}
            >
                <Form.Item name="nome" label="Nome">
                    <Input />
                </Form.Item>

                <Form.Item name="descricao" label="Descrição">
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </div>
    )
    
}

export default FormFlow;