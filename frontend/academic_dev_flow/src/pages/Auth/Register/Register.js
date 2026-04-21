import { Button, Col, Form, Input, Radio, Row, message } from "antd";
import "./Register.css";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/AuthProvider";
import { criarMembro, listarGrupos } from "../../../services/membroService";

const FormRegister = () => {
    const [form] = useForm();
    const navigate = useNavigate();
    const {loginAction} = useAuth();
    
    const [loadingGithub, setLoadingGithub] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [groupOptions, setGroupOptions] = useState([]);

    useEffect(() => {
        const carregarGrupos = async () => {
            try {
                const response = await listarGrupos();

                
                const grupos = response.data.map(item => ({
                    value: item.id, 
                    label: item.name, 
                }));
                setGroupOptions(grupos); 
                
            } catch (error) {
                console.error("Erro ao buscar grupos:", error);
            }
        };

        carregarGrupos();
    }, []);
    const buscarGithub = async (username) => {
        if (!username) return;

        try {
            setLoadingGithub(true);

            const response = await fetch(`https://api.github.com/users/${username}`);
            const data = await response.json();

            console.log("Resposta do GitHub:", data);

            if (!response.ok) {
                message.error("Usuário do GitHub não encontrado");
                return;
            }

            form.setFieldsValue({
                nome: data.name || "",
                nome_github: data.name || "",
                
            });


            setAvatar(data.avatar_url);
        } catch (error) {
            message.error("Erro ao buscar dados do GitHub");
        } finally {
            setLoadingGithub(false);
        }
    };

    const handleVerificarSenhas = (_, value) => {
        const senha = form.getFieldValue("senha");

        if (value && senha && value !== senha) {
            return Promise.reject("As senhas não correspondem!");
        }
        return Promise.resolve();
    };

    const handleCriarConta = async (dadosForm) => {

        console.log("Dados do formulário:", dadosForm);
        const payload = {
            ...dadosForm,
            username: dadosForm.email,
            password: dadosForm.senha,
        };

        const response = await criarMembro(payload);

        if (!response.error) {
            message.success("Conta criada com sucesso!");
            await loginAction(payload.username, payload.password);
        } else {
            message.error("Erro ao criar conta");
        }
    };

    return (
        <div id="screen-create-account">

            <Button
                className="floating-back-button"
                onClick={() => navigate(-1)}
                icon={<MdOutlineArrowBackIosNew />}
                size="large"
            >
                Voltar
            </Button>
            
            <div id="screen-create-account-content">

                <h2> Crie sua conta </h2>
                <Form layout="vertical" form={form} onFinish={handleCriarConta}>
                
                    <Row gutter={24} justify="center">
                        
                        {/* 🧩 COLUNA ESQUERDA */}
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Nome"
                                name="nome"
                                rules={[{ required: true, message: "Informe seu nome" }]}
                            >
                                <Input placeholder="Ex.: João" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: "Informe seu email" },
                                    { type: "email", message: "Email inválido" },
                                ]}
                            >
                                <Input placeholder="seuemail@email.com" />
                            </Form.Item>

                            <Form.Item
                                label="Tipo de usuário"
                                name="grupo"
                                rules={[{ required: true }]}
                            >
                                <Radio.Group
                                    options={groupOptions}
                                    optionType="button"
                                    buttonStyle="solid"
                                    style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="senha"
                                label="Senha"
                                rules={[{ required: true }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="confirmarSenha"
                                label="Confirmar senha"
                                dependencies={["senha"]}
                                rules={[
                                    { required: true },
                                    { validator: handleVerificarSenhas },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>

                        {/* 🧩 COLUNA DIREITA */}
                        <Col xs={24} md={12}>
                            
                            <Form.Item
                                name="area_software"
                                label="Você é da área de software?"
                                rules={[{ required: true }]}
                            >
                                <Radio.Group style={{ marginBottom: 10 }}>
                                    <Radio value={true}>Sim</Radio>
                                    <Radio value={false}>Não</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item shouldUpdate>
                                {({ getFieldValue }) =>
                                    getFieldValue("area_software") ? (
                                        <div className="github-box">
                                            
                                            <Form.Item label="GitHub" name="usuario_github">
                                                <Input
                                                    placeholder="username do GitHub"
                                                    onBlur={(e) =>
                                                        buscarGithub(e.target.value)
                                                    }
                                                />
                                            </Form.Item>

                                            {loadingGithub && <p>Buscando dados...</p>}

                                            {avatar && (
                                                <div className="avatar-box">
                                                    <img src={avatar} alt="avatar" />
                                                </div>
                                            )}

                                            <Form.Item
                                                name="nome_github"
                                                label="Nome no GitHub"
                                                rules={[{ required: true }]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                name="email_github"
                                                label="Email do GitHub"
                                                rules={[{ required: true }]}
                                            >
                                                <Input />
                                            </Form.Item>

                                        </div>
                                    ) : null
                                }
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Criar conta
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default FormRegister;