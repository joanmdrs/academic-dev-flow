import React from 'react';
import "./Login.css";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import img from "../../assets/banner-login.png"

const LoginForm = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <div className='page-login'> 

        <div className='page-login-layout'> 

          <div className='page-login-banner'> 
            <img 
              src='https://img.freepik.com/vetores-gratis/tecnologia-de-rede-futurista-azul_53876-100679.jpg?w=996&t=st=1707685507~exp=1707686107~hmac=d0c55903b0d96f9c2409d01edaaeaa013961167ef2864922eff7a97cc28adde3'
            />
            <h1>Bem vindo !</h1>
          </div>

          <div className='page-login-form'> 

            <div className='page-login-form-layout'> 
                <div className='page-login-form-header'> 
                  <h2> LOGIN </h2>
                </div>
                <div className='page-login-form-content'>
                  <Form
                    name="login-form"
                    layout='vertical'
                    onFinish={onFinish}
                    initialValues={{ remember: true }}
                    >
                      <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                      >
                        <Input 
                          style={{padding: "10px"}}
                          prefix={<UserOutlined 
                          className="site-form-item-icon" />} 
                          placeholder='username'/>

                      </Form.Item>

                      <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                      >
                        <Input.Password 
                          style={{padding: "10px"}}
                          prefix={<LockOutlined 
                          className="site-form-item-icon" />} 
                          placeholder='password'/>
                      </Form.Item>

                      <Form.Item>
                        <Button type="primary" htmlType="submit" size='large'>
                          Log in
                        </Button>
                      </Form.Item>
                    </Form>
                </div>
            </div>
            
          </div>
        </div>
        

    </div>
      );
};

export default LoginForm;
