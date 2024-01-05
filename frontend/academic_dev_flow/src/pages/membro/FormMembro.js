import { Form, Input, Select, DatePicker, Button, Radio, Tabs } from 'antd';
import React from "react";
import "./FormMembro.css";
import { criarMembro } from '../../services/membro_service';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { criarUsuario } from '../../services/usuario_service';

const { Option } = Select;
const { TabPane } = Tabs;

const FormMembro = ({valores_iniciais}) => {

    // Constantes
    
    const [form] = Form.useForm();

    // Funções de chamada

    const handleSubmit = async () => {
        const dados_form = form.getFieldsValue();
        const resposta_membro = await criarMembro(dados_form)

        if(resposta_membro.status === 200) {

            const resposta_usuario = await criarUsuario(dados_form, resposta_membro.data.id)

            if(resposta_usuario.status === 200){
                NotificationManager.success('Membro criado com sucesso!');
            } else {
                NotificationManager.error('Ocorreu um problema, contate o suporte!')
                // chamar a função de excluir membro
            }
        } else {
            NotificationManager.error('Ocorreu um problema, contate o suporte !')
        }
    }

    return (

        <div>

            <NotificationContainer />
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
                        initialValues={valores_iniciais}
                    >
                        <Form.Item 
                            label="Nome" 
                            name="nome"
                            rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item 
                            label="CPF" 
                            name="cpf"
                            rules={[{ required: true, message: 'Por favor, insira o CPF!' }]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item 
                            label="Data de Nascimento" 
                            name="data_nascimento"
                            rules={[{ required: true, message: 'Por favor, selecione a data de nascimento!' }]}
                        >
                            <DatePicker 
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>

                        <Form.Item 
                            label="Sexo" 
                            name="sexo"
                            rules={[{ required: true, message: 'Por favor, selecione o sexo!' }]}
                        >
                            <Select placeholder="Selecione o sexo">
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
                        initialValues={valores_iniciais}    
                    >
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
                    </Form>
                </TabPane>

                <TabPane tab="Informações de Acesso" key="3">
                    <Form 
                        form={form}
                        className='form-membro'
                        initialValues={valores_iniciais}
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
                        <Form.Item name="usuario" label="Usuário">
                            <Input />
                        </Form.Item>

                        <Form.Item name="senha" label="Senha">
                            <Input />
                        </Form.Item>

                        <Form.Item 
                            name="grupo"
                            label="Grupo"
                            rules={[{ required: true, message: 'Por favor, informe o grupo do membro!'}]}
                        >

                            <Radio.Group>
                                <Radio value="aluno"> Aluno </Radio>
                                <Radio value="professor"> Professor </Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                onClick={ async () => await handleSubmit()}>
                                Salvar
                            </Button>
                        </Form.Item> 
                    </Form>
                </TabPane>
            
            </Tabs>
        </div>
            
       
    );
}

export default FormMembro;