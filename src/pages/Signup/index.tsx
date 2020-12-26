import React from 'react';
import { Form, Input, Tooltip, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import './Signup.scss';
import SignLayout from '@hoc/SignLayout';
import AvatarUpload from '@components/AvatarUpload';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 18,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 18,
      offset: 6,
    },
  },
};

interface SignupProps {}

const Signup: React.FC<SignupProps> = ({}) => {
  const onFinish = () => {
    console.log(1);
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
          name='nickname'
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
        <Form.Item name='avatar' label='Avatar'>
          <AvatarUpload />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Form.Item>
      </Form>
    </SignLayout>
  );
};

export default Signup;
