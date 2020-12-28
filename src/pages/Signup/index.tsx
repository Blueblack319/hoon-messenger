import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Form, Input, Tooltip, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import './Signup.scss';
import SignLayout from '@hoc/SignLayout';
import {
  formItemLayout,
  tailFormItemLayout,
} from '@utils/customFormItemLayout';
import { signupWithEmail } from '@lib/auth';
import { useDispatch } from 'react-redux';
import { userType } from '@utils/types';

const toBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

const Signup: React.FC<RouteComponentProps> = ({ history }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();

  const handleFileOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const base64 = await toBase64(file);
    setAvatarUrl(base64 as string);
  };

  const onFinish = async (values: userType) => {
    try {
      dispatch(signupWithEmail({ ...values, avatarUrl }));
      history.push('/');
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <SignLayout text='Create an Account!'>
      <Form
        {...formItemLayout}
        className='signup'
        name='signup'
        onFinish={onFinish}
        scrollToFirstError>
        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: 6,
              message: 'Password should be at least 6 characters',
            },
            {
              max: 20,
              message: 'Password should be less than 20 characters',
            },
          ]}
          hasFeedback>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  'The two passwords that you entered do not match!',
                );
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='displayName'
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title='What do you want others to call you?'>
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='firstName'
          label='First Name'
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
              whitespace: true,
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='lastName'
          label='Last Name'
          rules={[
            {
              required: true,
              message: 'Please input your last name!',
              whitespace: true,
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item name='avatarUrl' label='Avatar'>
          <Input type='file' onChange={handleFileOnChange} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </SignLayout>
  );
};

export default Signup;
