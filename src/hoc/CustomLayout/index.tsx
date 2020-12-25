import React from 'react';
import { Row, Col } from 'antd';

import Sidebar from '@components/Sidebar';
import './CustomLayout.scss';

// mobile layout
// TODO:
// TODO:

interface CustomLayoutProps {}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  return (
    <Row className='customLayout'>
      <Col className='customLayout__sidebar' flex='360px'>
        <Sidebar />
      </Col>
      <Col className='customLayout__main' flex='auto'>
        {children}
      </Col>
    </Row>
  );
};

export default CustomLayout;
