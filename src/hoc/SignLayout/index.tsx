import React from 'react';
import { Space, Typography } from 'antd';

import './SignLayout.scss';

const { Title, Text } = Typography;

interface SignLayoutProps {
  text: string;
}

const SignLayout: React.FC<SignLayoutProps> = ({ text, children }) => {
  return (
    <div className='signLayout'>
      <Space direction='vertical' className='signLayout__intro'>
        <img src='/images/logo.jpg' alt='logo' className='signLayout__logo' />
        <Title level={2}>Messenger</Title>
        <Text>{text}</Text>
      </Space>
      <div className='signLayout__form'>{children}</div>
      <div className='signLayout__footer'>Created by Crazybirdz @2021</div>
    </div>
  );
};

export default SignLayout;
