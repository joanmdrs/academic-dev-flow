import { Form, Input, Select, DatePicker, Button } from 'antd';
import React, { useState } from "react";

const FormMembro = () => {

    const initialValues = {
        nome: '',
        descricao: '',
        status: '',
        data_inicio: '',
        data_fim: '',
    };
    
    const [formValues, setFormValues] = useState(initialValues);
    const [form] = Form.useForm();

      
    return (
        <Form
          form={form}
          className='form-projeto'
          initialValues={initialValues}
          
        >
            <Form.Item label="Nome" name="nome">
                <Input
                    id="input-nome"
                    name="nome"
                    value={formValues.nome}
                    
                />
            </Form.Item>
        </Form>
    );
}