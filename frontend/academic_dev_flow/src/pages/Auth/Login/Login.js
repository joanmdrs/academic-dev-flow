import { Button, Form, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import "./Login.css"
import imgPageLogin from "../../../../src/assets/img-page-login.svg"
import { useAuth } from '../../../hooks/AuthProvider';
import imgLogo from '../../../assets/logo.jpg'

const Login = () => {
    const {loginAction} = useAuth();

    const handleLogin = async (values) => {  

        const username = values.username
        const password = values.password

        try {
            await loginAction(username, password);
        } catch (error) {
            console.error('Erro durante o login:', error);
        }
    };
    

  return (  

    <div className='login-layout'> 
        <div className='container-form-login'> 

            <div className='form-login-header'> 
                <div className='demo-logo'> 
                    <img src={imgLogo} alt='Logo do sistema'/>
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
                            <Link> Esqueceu sua senha ? </Link>
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