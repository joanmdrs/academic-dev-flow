import React, { useState } from "react";
import "./PaginaMembro.css";
import Title from "../../components/Title/Title";
import Search from "../../components/Search/Search";
import ModalSearch from "../../components/Modal/Modal";
import Add from "../../components/Buttons/Add/Add";
import Delete from "../../components/Buttons/Delete/Delete";
import { buscarMembroPeloNome, criarMembro } from "../../services/membro_service";
import { Button, DatePicker, Form, Input, Radio, Select, Tabs } from "antd";
import { buscarUsuarioPeloIdMembro, criarUsuario } from "../../services/usuario_service";
import { NotificationManager } from "react-notifications";
import moment from 'moment'
import 'moment/locale/pt-br';
moment.locale('pt-br');

const { Option } = Select;
const { TabPane } = Tabs;

const PaginaMembro = () => {

    // Constantes 

    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [formVisible, setFormVisible] = useState(true);
    const [valoresIniciais, setValoresIniciais] = useState({
        nome: "",
        cpf: "",
        data_nascimento: "",
        sexo: "",
        telefone: "",
        email: "",
        usuario: "",
        senha: "",
        grupo: "",
      });

    const columns = [
        {
            title: 'Código',
            key: 'codigo',
            dataIndex: 'id', 
        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (text, record) => (

                <span
                    style={{ color: 'blue', cursor: 'pointer'}}
                    onClick={() => {handleRowClick(record)}}
                >
                    {text}
                </span>
            ),
        },
        {
            title: 'CPF',
            dataIndex: 'cpf',
            key: 'cpf',
        },
    ];


    // Funções handle

    const showModal = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleOk = async (dado) => {
        const resposta = await buscarMembroPeloNome(dado)
        return resposta
    }

    const handleRowClick = async (dados) => {

        const resposta = await buscarUsuarioPeloIdMembro(dados.id)
        const dados_usuario = resposta.data
        console.log(dados_usuario)
        

        form.setFields([
            { name: 'nome', value: dados.nome },
            { name: 'cpf', value: dados.cpf },
            { name: 'data_nascimento', value: moment(dados.data_nascimento)},
            { name: 'sexo', value: dados.sexo },
            { name: 'telefone', value: dados.telefone },
            { name: 'email', value: dados.email },
            { name: 'usuario', value: dados_usuario.usuario },
            { name: 'senha', value: dados_usuario.senha },
            { name: 'grupo', value: dados_usuario.grupo}
        ])
    }



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
            <Title 
                title='Membros'
                paragraph='Membros > Gerenciar membros'
            />

            <div className='add-and-delete'>
                <Add onClick={ () => {setFormVisible(true)}} />
                <Delete />
            </div>

            <Search name="BUSCAR MEMBRO" onClick={showModal} />

            <ModalSearch 
                title="Buscar membro" 
                label="Nome do membro"
                name="name-membro"
                onCancel={handleCancel}
                onOk={handleOk}
                open={modalVisible}
                columns={columns}
            />

            {formVisible &&  (
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
                        initialValues={valoresIniciais}
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
                        initialValues={valoresIniciais}    
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
                        initialValues={valoresIniciais}
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
        )}
        </div>
    )
}

export default PaginaMembro;