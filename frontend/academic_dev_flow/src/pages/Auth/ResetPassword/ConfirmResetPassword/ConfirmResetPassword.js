import "./ConfirmResetPassword.css"
import { Button, Form, Input, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import imgConfirmResetPassword from "../../../../assets/confirm-reset-password.svg";
import { Link, useParams } from "react-router-dom";
import api from "../../../../api/api";

const ConfirmResetPassword = () => {
    const { token } = useParams();
    const [notifier, contextHolder] = notification.useNotification();
    const [form] = useForm();
    const [loading, setLoading] = useState(false); // ← estado de loading

    const openNotificationWithIcon = (type, description) => {
        notifier[type]({
        message: "Atenção",
        description: description,
        });
    };

    const handleVerificarSenhas = (rule, value) => {
        const senha = form.getFieldValue('nova_senha');
        if (value && senha && value !== senha) {
            return Promise.reject('As senhas não correspondem!');
        } else {
            return Promise.resolve();
        }
    }

    const handleConfirmarNovaSenha = async (values) => {
        setLoading(true)
        try {
            const response = await api.post('/api/password_reset/confirm/', {
                token: token,
                password: values.nova_senha
            });
    
            openNotificationWithIcon(
                'success', 
                'Sua senha foi redefinida com sucesso. Você já pode fazer login com a nova senha.'
            )
                
    
        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 400) {
                openNotificationWithIcon(
                    'warning', 
                    error.response.data.password['0']
                )
            } else {
                openNotificationWithIcon(
                    'error', 
                    'Ocorreu um erro ao tentar redefinir a senha. Tente novamente mais tarde.'
                )
            }
        } finally {
            setLoading(false)
        }
    };
    

    return (
        <div className="confirm-reset-password-layout">
            {contextHolder}
            <div className="form-container">
                <Form
                    form={form}
                    layout="vertical"
                    style={{ gap: "10px" }}
                    onFinish={handleConfirmarNovaSenha}
                >
                    <h2>Definir nova senha</h2>
                    <p>
                        Crie uma nova senha para acessar sua conta com segurança.
                    </p>
                    <Form.Item
                        name="nova_senha"
                        label="Nova senha"
                        rules={[{ required: true, message: 'Por favor, cadastre uma senha para acessar a plataforma'}]}
                    >
                        <Input.Password name="senha"/>
                    </Form.Item>

                    <Form.Item
                        name="confirme_senha"
                        label="Confirme a senha"
                        dependencies={['senha']}
                        rules={[
                            { required: true, message: 'Por favor, confirme a senha de acesso à plataforma'},
                            { validator: handleVerificarSenhas }
                        ]}
                    >
                        <Input.Password name="confime-senha"/>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            style={{ width: "100%" }}
                            htmlType="submit"
                            loading={loading} 
                        >
                            Redefinir senha
                        </Button>
                    </Form.Item>

                     <Form.Item>
                        <span>
                            Voltar para o Login ? <Link to="/">Login</Link>
                        </span>
                    </Form.Item>

                    
                </Form>
            </div>

            <div className="image-container">
                <img src={imgConfirmResetPassword} alt="Imagem de Apresentação" />
            </div>
        </div>
    )
}

export default ConfirmResetPassword