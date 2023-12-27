import { Form, Input, Select, DatePicker, Button } from 'antd';
import React, { useState } from "react";
import "./FormMembro.css";

const { Option } = Select;

const FormMembro = () => {

    const initialValues = {
        nome: '',
        cpf: '',
        data_nascimento: '',
        sexo: '',
        telefone: '',
        email: '',
    };
    
    const [formValues, setFormValues] = useState(initialValues);
    const [form] = Form.useForm();

      
    return (
        <Form
          form={form}
          className='form-membro'
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 14,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={initialValues}
          
        >
            <Form.Item label="Nome" name="nome">
                <Input
                    id="input-nome"
                    name="nome"
                    value={formValues.nome}
                    rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
                />
            </Form.Item>

            <Form.Item label="CPF" name="cpf">
                <Input 
                    id='input-cpf'
                    name="cpf"
                    value={formValues.cpf}
                    rules={[{ required: true, message: 'Por favor, insira o CPF!' }]}
                />
            </Form.Item>

            <Form.Item 
                label="Data de Nascimento" 
                name="data-nascimento"
                rules={[{ required: true, message: 'Por favor, selecione a data de nascimento!' }]}
            >
                <DatePicker 
                    format="DD/MM/YYYY" 
                    value={formValues.data_nascimento}
                />
            </Form.Item>

            <Form.Item 
                label="sexo" 
                name="sexo" 
                rules={[{ required: true, message: 'Por favor, selecione o sexo!' }]}
            >
                <Select placeholder="Selecione o sexo">
                    <Option value="masculino">Masculino</Option>
                    <Option value="feminino">Feminino</Option>
                    <Option value="nao_informardo">Não informar</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="telefone"
                label="Telefone"
                rules={[{ required: true, message: 'Por favor, insira o telefone!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[
                { required: true, message: 'Por favor, insira o email!' },
                { type: 'email', message: 'Por favor, insira um email válido!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                Salvar
                </Button>
            </Form.Item>  
        </Form>
    );
}

export default FormMembro;