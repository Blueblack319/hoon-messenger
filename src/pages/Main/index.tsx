import React from 'react';
import { Typography } from 'antd';

import CustomLayout from '@hoc/CustomLayout';
import './Main.scss';

const { Title } = Typography;

const Main = () => {
  return (
    <CustomLayout>
      <div className='main'>
        <Title level={4}>Select a thread or start a new conversation</Title>
      </div>
    </CustomLayout>
  );
};

export default Main;
