import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';

import './Signin.scss';
import SignLayout from '@hoc/SignLayout';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, signinWithEmail } from '@lib/auth';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { signinType } from '@utils/types';

const Signin: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector(authSelector.user);
  const onFinish = async (values: signinType) => {
    try {
      await dispatch(signinWithEmail(values));
      history.push('/');
    } catch (err) {
      throw new Error(err.message);
    }
  };

  if (user !== null) {
    return <Redirect to='/' />;
  }
  return (
    <SignLayout text='Sign in with email to get started.'>
      <Form
        name='signin'
        initialValues={{ remember: true }}
        className='signin'
        onFinish={onFinish}>
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

        <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
          Continue with Facebook
        </Button>

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
