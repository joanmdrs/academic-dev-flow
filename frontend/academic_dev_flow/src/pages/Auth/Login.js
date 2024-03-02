import { Button, Form, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import "./Login.css"
import ImagePresentation from "../../../src/assets/img-presentation-page-login.jpg"
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
                Academic Dev Flow
            </div>

            <div className='form-login-content'>

                <div className='form-login-title'> 
                    <h3> Bem-vindo ! </h3>
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
                            rules={[
                                {
                                message: 'Please input your username!',
                                },
                            ]}
                            >
                                <Input placeholder='Username'/>
                            </Form.Item>

                        <Form.Item
                            className='form-item'
                            name="password"
                            rules={[
                                {
                                message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password placeholder='Password'/>
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
            <img src={ImagePresentation} alt='Imagem de Apresentação' />
        </div>

    </div>
    
  );
};

export default Login;