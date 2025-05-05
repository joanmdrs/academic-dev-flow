import React, { useState } from "react";
import "./ResetPassword.css";
import { Form, Button, Input, notification } from "antd";
import imgResetPassword from "../../../../assets/reset-password.svg";
import { Link } from "react-router-dom";
import api from "../../../../api/api";
import { useForm } from "antd/es/form/Form";

const ResetPassword = () => {
    const [notifier, contextHolder] = notification.useNotification();
    const [form] = useForm();
    const [loading, setLoading] = useState(false); // ← estado de loading

    const openNotificationWithIcon = (type, description) => {
        notifier[type]({
        message: "Atenção",
        description: description,
        });
    };

    const handleSolicitarRedefinicaoSenha = async (values) => {
        setLoading(true); // ← inicia o loading
        try {
            await api.post("/api/password_reset/", {
                email: values.email_reset,
            });
            openNotificationWithIcon(
                "success",
                "Foi enviado um link de redefinição de senha para o e-mail informado."
            );
        } catch (error) {
            if (error.response?.status === 400) {
                openNotificationWithIcon(
                    "info",
                    "Não conseguimos encontrar uma conta associada a esse e-mail. Tente um endereço de e-mail diferente."
                );
            } else {
                openNotificationWithIcon(
                    "error",
                    "Falha ao tentar enviar o e-mail de redefinição de senha. Contate o suporte"
                );
            }
        } finally {
            setLoading(false); // ← finaliza o loading
        }
    };

    return (
        <div className="reset-password-layout">
            {contextHolder}
            <div className="form-container">
                <Form
                    form={form}
                    layout="vertical"
                    style={{ gap: "10px" }}
                    onFinish={handleSolicitarRedefinicaoSenha}
                >
                    <h2>Redefinir senha</h2>
                    <p>
                        Informe seu e-mail de cadastro para receber um link de redefinição
                        de senha.
                    </p>
                    <Form.Item
                        label="Email"
                        name="email_reset"
                        rules={[{ required: true, message: "Por favor, insira um e-mail." }]}
                    >
                        <Input placeholder="informe seu e-mail de cadastro" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            style={{ width: "100%" }}
                            htmlType="submit"
                            loading={loading} // ← adiciona o loading no botão
                        >
                            Enviar Link
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <span>
                            Lembrou sua senha? <Link to="/">Login</Link>
                        </span>
                    </Form.Item>
                </Form>
            </div>

            <div className="image-container">
                <img src={imgResetPassword} alt="Imagem de Apresentação" />
            </div>
        </div>
);
};

export default ResetPassword;
