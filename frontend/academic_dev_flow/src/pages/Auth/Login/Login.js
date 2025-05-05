import { Button, Form, Input, notification } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css"
import imgPageLogin from "../../../../src/assets/img-page-login.svg"
import { useAuth } from '../../../hooks/AuthProvider';
import { FaCoffee } from "react-icons/fa";

const Login = () => {
    const {loginAction} = useAuth();
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()


    const handleLogin = async (values) => {  

        const username = values.username
        const password = values.password

        try {
            await loginAction(username, password);
        } catch (error) {
            console.error('Erro durante o login:', error);
        }
    };

    const openNotificationWithIcon = (type) => {
        api[type]({
          message: 'Aviso',
          description:
            'No momento, esta funcionalidade ainda não está disponível.',
        });
    };

    const handleRedefinirSenha = () => {
        navigate('/redefinir-senha')
    }

    

    return (  

        <div className='login-layout'> 
            {contextHolder}
            <div className='container-form-login'> 

                <div className='form-login-header'> 
                    <div className='demo-logo'> 
                        <FaCoffee color="var(--primary-color)" size={25}/>
                    </div>

                    <div className='title-system'> 
                        <h4> ACADEMIC DEV FLOW </h4>
                    </div>


                </div>

                <div className='form-login-content'>

                    <div className='form-login-title'> 
                        <h2> Bem-vindo ! </h2>
                        <p> Preencha as informações abaixo </p>
                    </div>

                    <div className='form-login'> 
                        <Form 
                            onFinish={handleLogin}
                            layout='vertical'
                            name="basic"
                            initialValues={{ remember: true }}
                        > 
                            <Form.Item
                                className='form-item'
                                name="username"
                                label="Email"
                                rules={[
                                    {
                                    message: 'Por favor, informe seu e-mail!',
                                    required: true
                                    },
                    
                                ]}
                                >
                                    <Input placeholder='Informe seu email '/>
                                </Form.Item>

                            <Form.Item
                                className='form-item'
                                label="Senha"
                                name="password"
                                rules={[
                                    {
                                    message: 'Por favor, informe seu e-mail!',
                                    required: true
                                    },
                                ]}
                            >
                                <Input.Password placeholder='Informe a senha'/>
                            </Form.Item>

                            <Form.Item className='link-recovery'> 
                                <Link to="/redefinir-senha"> Esqueceu sua senha ? </Link>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Entrar
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                    <div className='form-login-create-account'> 
                        Não possui uma conta ? 
                        <Link to="/cadastre-se"> Registre-se agora </Link>
                    </div>
                </div>
            </div>

            <div className='container-presentation-image'>
                <img src={imgPageLogin} alt='Imagem de Apresentação' />
            </div>

            <div className='trapezoide'></div>

        </div>
        
    );
};

export default Login;