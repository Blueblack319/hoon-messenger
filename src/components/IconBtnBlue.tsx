import React from 'react';
import { Button } from 'antd';

interface IconBtnBlueProps {
  icon: React.ReactNode;
}

const IconBtnBlue: React.FC<IconBtnBlueProps> = ({ icon }) => (
  <Button
    shape='circle'
    icon={icon}
    style={{ border: 'none', color: '#1890ff' }}
  />
);

export default IconBtnBlue;
