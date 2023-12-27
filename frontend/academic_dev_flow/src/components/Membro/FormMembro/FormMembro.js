import { Form, Input, Select, DatePicker, Button, Radio, Tabs } from 'antd';
import React, { useState } from "react";
import "./FormMembro.css";

const { Option } = Select;
const { TabPane } = Tabs;

const FormMembro = () => {

    const initialValues = {
        nome: '',
        cpf: '',
        data_nascimento: '',
        sexo: '',
        telefone: '',
        email: '',
        usuario: '',
        senha: '',
        grupo: ''
    };
    
    const [formValues, setFormValues] = useState(initialValues);
    const [form] = Form.useForm();

      
    return (
        <Tabs defaultActiveKey="1" tabPosition={'left'}>
            <TabPane tab="Dados Pessoais" key="1">
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
                    <Form.Item 
                        label="Nome" 
                        name="nome"
                        value={formValues.nome}
                        rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item 
                        label="CPF" 
                        name="cpf"
                        value={formValues.cpf}
                        rules={[{ required: true, message: 'Por favor, insira o CPF!' }]}
                    >
                        <Input/>
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
                        label="Sexo" 
                        name="sexo"
                        rules={[{ required: true, message: 'Por favor, selecione o sexo!' }]}
                    >
                        <Select placeholder="Selecione o sexo" value={formValues.sexo}>
                            <Option value="masculino">Masculino</Option>
                            <Option value="feminino">Feminino</Option>
                            <Option value="nao_informardo">Não informar</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </TabPane>

            <TabPane  tab="Contato" key="2">
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
                    <Form.Item
                        name="telefone"
                        label="Telefone"
                        value={formValues.telefone}
                        rules={[{ required: true, message: 'Por favor, insira o telefone!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        value={formValues.email}
                        rules={[
                        { required: true, message: 'Por favor, insira o email!' },
                        { type: 'email', message: 'Por favor, insira um email válido!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </TabPane>

            <TabPane tab="Informações de Acesso" key="3">
                <Form 
                    form={form}
                    className='form-membro'
                    initialValues={initialValues}
                    labelCol={{
                        span: 10,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    
                >
                    <Form.Item name="usuario" label="Usuário" value={formValues.usuario}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="senha" label="Senha" value={formValues.senha}>
                        <Input />
                    </Form.Item>

                    <Form.Item 
                        name="grupo"
                        label="Grupo"
                        value={formValues.grupo}
                        rules={[{ required: true, message: 'Por favor, informe o grupo do membro!'}]}
                    >

                        <Radio.Group>
                            <Radio value="aluno"> Aluno </Radio>
                            <Radio value="professor"> Professor </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Salvar
                        </Button>
                    </Form.Item> 
                </Form>
                 
            </TabPane>
        </Tabs>
            
       
    );
}

export default FormMembro;