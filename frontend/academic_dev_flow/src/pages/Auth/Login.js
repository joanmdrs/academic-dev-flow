import React from 'react';
import { Form, Input, Button } from 'antd';

const LoginForm = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <Form
      name="login-form"
      onFinish={onFinish}
      initialValues={{ remember: true }}
      style={{ width: '300px', margin: 'auto', marginTop: '50px' }}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
