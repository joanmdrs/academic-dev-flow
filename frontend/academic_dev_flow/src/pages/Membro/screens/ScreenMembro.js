import React, { useState } from "react";
import "./ScreenMembro.css";
import Titulo from "../../../components/Titulo/Titulo";
import BotaoBuscar from "../../../components/Botoes/BotaoBuscar/BotaoBuscar";
import BotaoAdicionar from "../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import ModalDeBusca from "../../../components/Modals/ModalDeBusca/ModalDeBusca";
import {
  atualizarMembro,
  buscarMembroPeloNome,
  criarMembro,
  excluirMembro,
} from "../../../services/membroService";
import {
  atualizarUsuario,
  buscarUsuarioPeloId,
  buscarUsuarioPeloIdMembro,
} from "../../../services/usuarioService";
import { recarregarPagina } from "../../../services/utils";
import {
  Button,
  Form,
  Input,
  Select,
  Tabs,
} from "antd";
import { NotificationContainer, NotificationManager } from "react-notifications";
import InputMask from 'react-input-mask';


const ScreenMembro = () => {

    const VALORES_INICIAIS = {
        nome: "",
        cpf: "",
        data_nascimento: "",
        sexo: "",
        telefone: "",
        email: "",
        usuario: "",
        senha: "",
        grupo: ""
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
                onClick={() => handlePreencherForm(record)}
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

    const handlePreencherForm = async (dadosMembro) => {
        const response = await buscarUsuarioPeloId(dadosMembro.usuario)
        const dadosUsuario = response.data;

        form.setFieldsValue({
            grupo: dadosMembro.grupo,
            nome: dadosMembro.nome,
            cpf: dadosMembro.cpf,
            data_nascimento: dadosMembro.data_nascimento,
            sexo: dadosMembro.sexo,
            telefone: dadosMembro.telefone,
            email: dadosMembro.email,
            usuario: dadosUsuario.username,
            senha: dadosUsuario.password,
        });
        handleFecharModal();
        setIdMembro(dadosMembro.id);
        setAcaoForm("atualizar");
        setIsFormVisivel(true);
        setIsBotaoExcluirVisivel(false);
    };

    const handleCriarMembro = async () => {
        const dadosForm = form.getFieldsValue()
        try {   
            const response = await criarMembro(dadosForm)

            if (response.status === 201) {
                NotificationManager.success("Membro criado com sucesso!");
                recarregarPagina()
            } else {
                NotificationManager.error("Ocorreu um problema, contate o suporte!");
            }
            
        } catch (error) {
            NotificationManager.error("Ocorreu um problema, contate o suporte!");
        }
    };

    const handleAtualizarMembro = async () => {
        const dadosForm = form.getFieldsValue();

        try {
            const response = await atualizarMembro(dadosForm, idMembro);

            if (response.status === 200) {
                NotificationManager.success("Membro atualizado com sucesso!");
                recarregarPagina()
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

            <div className='two-buttons'>
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
                            <Input placeholder="Ex.: João "/>
                        </Form.Item>

                        <Form.Item 
                            label="CPF" 
                            name="cpf"
                            rules={[{ required: true, message: 'Por favor, insira o CPF!' }]}
                        >
                            <InputMask mask="999.999.999-99" maskChar={null}>
                            {() => <Input placeholder="Ex.: 999.999.999-99"/>}
                            </InputMask>
                        </Form.Item>

                        <Form.Item 
                            label="Data de Nascimento" 
                            name="data_nascimento"
                            rules={[{ required: true, message: 'Por favor, selecione a data de nascimento!' }]}
                        >
                            <Input type="date"/>
                           
                        </Form.Item>

                        <Form.Item 
                            label="Sexo" 
                            name="sexo"
                            placeholder="Selecione o sexo"
                            rules={[{ required: true, message: 'Por favor, selecione o sexo!' }]}
                        >
                            <Select>
                            
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
                            <InputMask mask="(99) 99999-9999" maskChar={null}>
                            {() => <Input placeholder="Ex.: (84) 99999-9999"/>}
                            </InputMask>
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                            { required: true, message: 'Por favor, insira o email!' },
                            { type: 'email', message: 'Por favor, insira um email válido!' },
                            ]}
                        >
                            <Input placeholder="Ex.: nome@gmail.com"/>
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
                            <Input placeholder="Ex.: usuario"/>
                        </Form.Item>

                        <Form.Item
                            name="senha"
                            label="Senha"
                        >
                            
                            <Input.Password placeholder="" />
                        </Form.Item>

                        <Form.Item 
                            name="grupo"
                            label="Grupo"
                            rules={[{ required: true, message: 'Por favor, informe o grupo do membro!'}]}
                        >

                           <Select>
                                <Option value="Administradores"> Administradores </Option>
                                <Option value="Alunos">Alunos</Option>
                                <Option value="Professores">Professores</Option>
                           </Select>
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

export default ScreenMembro;