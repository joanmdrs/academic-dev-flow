import React, { useState, useEffect } from "react";
import "./PaginaMembro.css";
import Title from "../../components/Title/Title";
import Search from "../../components/Search/Search";
import ModalSearch from "../../components/Modal/Modal";
import Add from "../../components/Buttons/Add/Add";
import Delete from "../../components/Buttons/Delete/Delete";
import {
  atualizarMembro,
  buscarMembroPeloNome,
  criarMembro,
  excluirMembro,
} from "../../services/membro_service";
import {
  atualizarUsuario,
  buscarUsuarioPeloIdMembro,
  criarUsuario,
} from "../../services/usuario_service";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Tabs,
} from "antd";
import { NotificationContainer, NotificationManager } from "react-notifications";
import moment from "moment";
import "moment/locale/pt-br";
import { recarregarPagina } from "../../services/utils";
import HelpModal from "../../components/HelpModal/HelpModal";
moment.locale("pt-br");

const { Option } = Select;
const { TabPane } = Tabs;

const PaginaMembro = () => {


    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [btnDelActive, setBtnDelActive] = useState(true);
    const [btnAddActive, setBtnAddActive] = useState(false);
    const [btnSearchActive, setBtnSearchActive] = useState(false);
    const [actionForm, setActionForm] = useState("create");
    const [id, setId] = useState("");
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
        title: "Código",
        key: "codigo",
        dataIndex: "id",
        },
        {
        title: "Nome",
        dataIndex: "nome",
        key: "nome",
        render: (text, record) => (
            <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => handleRowClick(record)}
            >
            {text}
            </span>
        ),
        },
        {
        title: "CPF",
        dataIndex: "cpf",
        key: "cpf",
        },
    ];

    useEffect(() => {
        form.setFieldsValue(valoresIniciais);
    }, [form, valoresIniciais]);


    // Funções de chamada 

    const showModal = () => setModalVisible(true);
    const handleCancel = () => setModalVisible(false);
    const handleOk = async (dado) => await buscarMembroPeloNome(dado);

    const handleClickBtnAdd = () => {
        form.resetFields();
        setActionForm("create");
        setFormVisible(true);
        setBtnSearchActive(true);
        setBtnDelActive(true);
        setBtnAddActive(true);
    };

    const handleRowClick = async (dados) => {
        const resposta_usuario = await buscarUsuarioPeloIdMembro(dados.id);
        const dados_usuario = resposta_usuario.data;

        form.setFieldsValue({
        nome: dados.nome,
        cpf: dados.cpf,
        data_nascimento: moment(dados.data_nascimento),
        sexo: dados.sexo,
        telefone: dados.telefone,
        email: dados.email,
        usuario: dados_usuario.usuario,
        senha: dados_usuario.senha,
        grupo: dados_usuario.grupo,
        });

        setId(dados.id);
        setActionForm("update");
        handleCancel();
        setFormVisible(true);
        setBtnDelActive(false);
    };

    const handleCreateMember = async () => {
        const dados_form = form.getFieldsValue();

        try {
        const resposta_membro = await criarMembro(dados_form);
        const resposta_usuario = await criarUsuario(
            dados_form,
            resposta_membro.data.id
        );

        if (resposta_usuario.status === 200) {
            NotificationManager.success("Membro criado com sucesso!");
        } else {
            NotificationManager.error(
            "Ocorreu um problema, contate o suporte!"
            );
            // chamar a função de excluir membro
        }
        } catch (error) {
        NotificationManager.error("Ocorreu um problema, contate o suporte!");
        }
    };

    const handleUpdateMember = async () => {
        const dados_form = form.getFieldsValue();

        try {
        const resposta_membro = await atualizarMembro(dados_form, id);

        if (resposta_membro.status === 200) {
            const resposta_usuario = await atualizarUsuario(dados_form, id);

            if (resposta_usuario.status === 200) {
            NotificationManager.success("Informações atualizadas");
            } else {
            NotificationManager.error(
                "Ocorreu um problema durante a operação, contate o suporte!"
            );
            // Lógica para reverter a atualização do membro se necessário
            }
        } else {
            NotificationManager.error(
            "Ocorreu um problema durante a operação, contate o suporte!"
            );
        }
        } catch (error) {
        NotificationManager.error(
            "Ocorreu um problema durante a operação, contate o suporte!"
        );
        }
    };

    const handleSubmit = async () => {
        try {
        if (actionForm === "create") {
            await handleCreateMember();
        } else if (actionForm === "update") {
            await handleUpdateMember();
        }

        recarregarPagina();
        } catch (error) {
        console.error("Erro ao processar o formulário", error);
        }
    };

    const handleDelete = async () => {
        try {
        const resposta_membro = await excluirMembro(id);

        if (resposta_membro.status === 204) {
            NotificationManager.success("Membro excluído com sucesso!");
        } else {
            NotificationManager.error(
            "Falha na operação, contate o suporte!"
            );
        }
        } catch (error) {
        console.error("Erro ao excluir o membro", error);
        NotificationManager.error(
            "Ocorreu um problema durante a operação, contate o suporte!"
        );
        }
    };

    return (
        <div>
           <NotificationContainer /> 
            <Title 
                title='Membros'
                paragraph='Membros > Gerenciar membros'
            />

            <div className='add-and-delete'>
                <Add onClick={ () => {handleClickBtnAdd()}} disabled={btnAddActive}/>
                <Delete handleDelete={handleDelete} disabled={btnDelActive}/>
            </div>

            <Search name="BUSCAR MEMBRO" onClick={showModal} disabled={btnSearchActive}/>

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

export default PaginaMembro