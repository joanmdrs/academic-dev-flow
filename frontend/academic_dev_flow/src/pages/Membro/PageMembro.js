import React, { useState, useEffect } from "react";
import "./PageMembro.css";
import Titulo from "../../components/Titulo/Titulo";
import BotaoBuscar from "../../components/Botoes/BotaoBuscar/BotaoBuscar";
import BotaoAdicionar from "../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../components/Botoes/BotaoExcluir/BotaoExcluir";
import ModalDeBusca from "../../components/Modal/ModalDeBusca";
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
import { recarregarPagina } from "../../services/utils";
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
moment.locale("pt-br");


const PageMembro = () => {

    const VALORES_INICIAIS = {
        nome: "",
        cpf: "",
        data_nascimento: "",
        sexo: "",
        telefone: "",
        email: "",
        usuario: "",
        senha: "",
        grupo: "",
    }

    const COLUNAS_MODAL = [
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
                onClick={() => handleCliqueLinha(record)}
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

    const { Option } = Select;
    const { TabPane } = Tabs;

    const [acaoForm, setAcaoForm] = useState("criar");
    const [idMembro, setIdMembro] = useState("");
    const [form] = Form.useForm();

    const [isModalVisivel, setIsModalVisivel] = useState(false);
    const [isFormVisivel, setIsFormVisivel] = useState(false);
    const [isBotaoExcluirVisivel, setIsBotaoExcluirVisivel] = useState(true);
    const [isBotaoAdicionarVisivel, setIsBotaoAdicionarVisivel] = useState(false);
    const [isBotaoBuscarVisivel, setIsBotaoBuscarVisivel] = useState(false);
    

    

    useEffect(() => {
        form.setFieldsValue(VALORES_INICIAIS);
    }, [form, VALORES_INICIAIS]);


    // Funções de chamada 

    const handleExibirModal = () => setIsModalVisivel(true);
    const handleFecharModal = () => setIsModalVisivel(false);

    const handleBuscarMembro = async (parametro) => {
        try {
            const resposta = await buscarMembroPeloNome(parametro);
            if(resposta.status !== 200){
                NotificationManager.error("Ocorreu um problema ao buscar os dados, contate o suporte!")
            } else {
            return resposta
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema ao buscar os dados, contate o suporte!")
        } 
    }

    const handleCliqueBotaoAdicionar = () => {
        form.resetFields();
        setAcaoForm("criar");
        setIsFormVisivel(true);
        setIsBotaoBuscarVisivel(true);
        setIsBotaoExcluirVisivel(true);
        setIsBotaoAdicionarVisivel(true);
    };

    const handleCliqueLinha = async (dados) => {
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
        handleFecharModal();
        setIdMembro(dados.id);
        setAcaoForm("atualizar");
        setIsFormVisivel(true);
        setIsBotaoExcluirVisivel(false);
    };

    const handleCriarMembro = async () => {

        const dados_form = form.getFieldValue();
        try {
            const resposta_membro = await criarMembro(dados_form);

            if(resposta_membro.status === 200){
                const resposta_usuario = await criarUsuario(dados_form, resposta_membro.data.id)

                if(resposta_usuario.status === 200){
                    NotificationManager.success("Membro criado com sucesso!");
                    recarregarPagina()
                } else {
                    NotificationManager.error("Ocorreu um problema, contate o suporte!");
                }
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema, contate o suporte!");
        }
    };

    const handleAtualizarMembro = async () => {
        const dados_form = form.getFieldsValue();

        try {
            const resposta_membro = await atualizarMembro(dados_form, idMembro);

            if (resposta_membro.status === 200) {
                const resposta_usuario = await atualizarUsuario(dados_form, idMembro);

                if (resposta_usuario.status === 200) {
                    NotificationManager.success("Membro atualizado com sucesso!");
                    recarregarPagina()
                } else {
                    NotificationManager.error("Ocorreu um problema durante a operação, contate o suporte!");
                }
            } else {
                NotificationManager.error("Ocorreu um problema durante a operação, contate o suporte!");
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema durante a operação, contate o suporte!");
        }
    };

    const handleSubmeterForm = async () => {
        if(acaoForm === "criar"){
            await handleCriarMembro()
        } else if(acaoForm === "atualizar"){
            await handleAtualizarMembro()
        }
    };

    const handleExcluirMembro = async () => {
        try {
            const resposta_membro = await excluirMembro(idMembro);

            if (resposta_membro.status === 204) {
                NotificationManager.success("Membro excluído com sucesso!");
                recarregarPagina()
            } else {
                NotificationManager.error("Falha na operação, contate o suporte!");
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema durante a operação, contate o suporte!");
        }
    };

    return (
        <div>
           <NotificationContainer /> 
            <Titulo 
                titulo='Membros'
                paragrafo='Membros > Gerenciar membros'
            />

            <div className='add-and-delete'>
                <BotaoAdicionar funcao={handleCliqueBotaoAdicionar} status={isBotaoAdicionarVisivel}/>
                <BotaoExcluir funcao={handleExcluirMembro} status={isBotaoExcluirVisivel}/>
            </div>

            <BotaoBuscar nome="BUSCAR MEMBRO" funcao={handleExibirModal} status={isBotaoBuscarVisivel}/>

            <ModalDeBusca 
                titulo="Buscar membro" 
                label="Nome do membro"
                name="name-membro"
                onCancel={handleFecharModal}
                onOk={handleBuscarMembro}
                status={isModalVisivel}
                colunas={COLUNAS_MODAL}
            />
            
            {isFormVisivel &&  (
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
                        initialValues={VALORES_INICIAIS}
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
                        initialValues={VALORES_INICIAIS}    
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
                        initialValues={VALORES_INICIAIS}
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
                                onClick={handleSubmeterForm}>
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

export default PageMembro;