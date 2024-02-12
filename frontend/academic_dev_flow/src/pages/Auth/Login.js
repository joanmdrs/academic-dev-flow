import React from 'react';
import "./Login.css";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { isExpired, decodeToken } from "react-jwt";
import AuthService from '../../services/authService';

const LoginForm = () => {

  const handleLogin = async (values) => {   
    const username = values.username
    const password = values.password
    const result = await AuthService.login(username, password);

    const token = localStorage.getItem('token');
    const token_decoded = decodeToken(token);

    if (result.success) {
      console.log('Login successful:', result.data);
      console.log(token_decoded)
    } else {
      console.error('Login failed:', result.error);
    }
  };

  return (
    <div className='page-login'> 

        <div className='page-login-layout'> 

          
          <div className='page-login-form-header'> 
            <h2> LOGIN </h2>
          </div>

          <div className='page-login-form-content'>
            <Form
              name="login-form"
              layout='vertical'
              onFinish={handleLogin}
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
        
);
};

export default LoginForm;
