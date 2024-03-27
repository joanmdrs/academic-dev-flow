import { Button, Form, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import "./Login.css"
import imgPageLogin from "../../../src/assets/img-page-login.svg"
import { useAuth } from '../../hooks/AuthProvider';

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

                </div>

                <div> 
                    <h3> Logo </h3>
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
                            label="Nome de usuário"
                            rules={[
                                {
                                message: 'Please input your username!',
                                required: true
                                },
                
                            ]}
                            >
                                <Input placeholder='Informe o nome de usuário'/>
                            </Form.Item>

                        <Form.Item
                            className='form-item'
                            label="Senha"
                            name="password"
                            rules={[
                                {
                                message: 'Please input your password!',
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
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
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