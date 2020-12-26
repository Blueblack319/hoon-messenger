import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';

import './Signin.scss';
import SignLayout from '@hoc/SignLayout';

interface SigninProps {}

const Signin: React.FC<SigninProps> = ({}) => {
  return (
    <SignLayout text='Sign in with email to get started.'>
      <Form name='signin' initialValues={{ remember: true }} className='signin'>
        <Form.Item
          name='email'
          rules={[
            { required: true, message: 'Please input your E-mail address!' },
          ]}>
          <Input placeholder='E-mail address' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input password!' }]}>
          <Input.Password placeholder='Password' />
        </Form.Item>
        <Form.Item name='remember' valuePropName='checked'>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
            Continue with Facebook
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            style={{
              width: '100%',
              background: 'linear-gradient(to right, #1e90ff, #fd79a8)',
            }}>
            Sign in
          </Button>
          Or <a href='/signup'>register now!</a>
        </Form.Item>
      </Form>
    </SignLayout>
  );
};

export default Signin;
